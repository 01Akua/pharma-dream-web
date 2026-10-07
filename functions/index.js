/* ============================================================
   Funciones serverless para la pasarela de pagos Bold.

   Por qué existen: el sitio es 100% estático (sin servidor propio),
   pero Bold exige dos cosas que SOLO deben pasar del lado del
   servidor, nunca en el navegador:
     1) Calcular la "firma de integridad" con la llave secreta
        (si se calculara en el navegador, cualquiera podría leer
        la llave secreta y falsificar pagos).
     2) Recibir el webhook de confirmación de pago (Bold firma esa
        notificación con HMAC-SHA256 para que no la pueda falsificar
        un tercero).

   boldSignature: el checkout del sitio llama esta función con el
   id de un pedido ya creado en Firestore (colección "orders") y
   recibe la firma lista para abrir el botón/checkout de Bold. El
   monto SIEMPRE se lee del pedido en Firestore, nunca del navegador
   — así un cliente no puede manipular el monto a cobrar.

   boldWebhook: Bold llama esta función cuando un pago se aprueba o
   rechaza. Se valida la firma HMAC, y si el pago fue aprobado se
   marca el pedido como "pagado" en Firestore automáticamente.
   ============================================================ */

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();

const BOLD_SECRET_KEY = defineSecret("BOLD_SECRET_KEY");

const ORDERS_COLLECTION = "orders";

function setCors(req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return true;
  }
  return false;
}

/**
 * POST { orderId: string }
 * -> { orderId, amount, currency, signature }
 */
exports.boldSignature = onRequest(
  { secrets: [BOLD_SECRET_KEY], cors: true, region: "us-central1" },
  async (req, res) => {
    if (setCors(req, res)) return;

    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "method-not-allowed" });
        return;
      }

      const { orderId } = req.body || {};
      if (!orderId || typeof orderId !== "string") {
        res.status(400).json({ error: "missing-orderId" });
        return;
      }

      const snap = await db.collection(ORDERS_COLLECTION).doc(orderId).get();
      if (!snap.exists) {
        res.status(404).json({ error: "order-not-found" });
        return;
      }

      const order = snap.data();
      if (order.status !== "nuevo") {
        res.status(409).json({ error: "order-not-payable", status: order.status });
        return;
      }

      const amount = String(Math.round(order.total));
      const currency = "COP";
      const secretKey = BOLD_SECRET_KEY.value();

      const signature = crypto
        .createHash("sha256")
        .update(`${orderId}${amount}${currency}${secretKey}`)
        .digest("hex");

      res.status(200).json({ orderId, amount, currency, signature });
    } catch (err) {
      logger.error("boldSignature error", err);
      res.status(500).json({ error: "internal-error" });
    }
  },
);

/**
 * Webhook de Bold. Verifica la firma HMAC-SHA256 contra el header
 * "x-bold-signature" usando el cuerpo crudo de la petición.
 */
exports.boldWebhook = onRequest(
  { secrets: [BOLD_SECRET_KEY], region: "us-central1" },
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("method-not-allowed");
        return;
      }

      const secretKey = BOLD_SECRET_KEY.value();
      const rawBody = req.rawBody; // Buffer sin parsear, necesario para la firma
      const encoded = Buffer.from(rawBody).toString("base64");
      const expected = crypto
        .createHmac("sha256", secretKey)
        .update(encoded)
        .digest("hex");

      const received = req.get("x-bold-signature") || "";
      const validSignature =
        expected.length === received.length &&
        crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));

      if (!validSignature) {
        logger.warn("boldWebhook: firma inválida");
        res.status(401).send("invalid-signature");
        return;
      }

      // Responder rápido (Bold exige <2s); el procesamiento sigue después.
      res.status(200).send("ok");

      const event = req.body || {};
      const data = event.data || {};
      logger.info("boldWebhook evento recibido", { type: event.type, data });

      // El orderId propio se pasó como data-order-id al abrir el checkout;
      // Bold lo devuelve dentro de "data" — se revisan los nombres de campo
      // más probables por si el formato exacto varía.
      const orderId =
        data.orderId || data.order_id || data.metadata?.reference || data.reference;

      if (!orderId) {
        logger.warn("boldWebhook: no se encontró orderId en el payload", data);
        return;
      }

      const orderRef = db.collection(ORDERS_COLLECTION).doc(orderId);
      const orderSnap = await orderRef.get();
      if (!orderSnap.exists) {
        logger.warn(`boldWebhook: pedido ${orderId} no existe`);
        return;
      }

      if (event.type === "SALE_APPROVED") {
        await orderRef.update({
          status: "pagado",
          boldPaymentId: data.payment_id || event.subject || null,
        });
        logger.info(`Pedido ${orderId} marcado como pagado`);
      } else if (event.type === "SALE_REJECTED") {
        await orderRef.update({
          boldPaymentFailed: true,
          boldPaymentId: data.payment_id || event.subject || null,
        });
        logger.info(`Pedido ${orderId}: pago rechazado por Bold`);
      }
    } catch (err) {
      logger.error("boldWebhook error", err);
      if (!res.headersSent) res.status(500).send("internal-error");
    }
  },
);
