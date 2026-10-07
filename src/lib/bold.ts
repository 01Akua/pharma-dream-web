"use client";

/* ============================================================
   Integración del Botón de Pagos de Bold.

   La llave de identidad de Bold NO es secreta (Bold la expone a
   propósito en el navegador), así que se configura como variable
   de entorno pública en build time. La llave secreta nunca toca
   el navegador: vive solo en la Cloud Function `boldSignature`.
   ============================================================ */

const BOLD_SCRIPT_SRC = "https://checkout.bold.co/library/boldPaymentButton.js";
const BOLD_IDENTITY_KEY = process.env.NEXT_PUBLIC_BOLD_IDENTITY_KEY || "";

// Reemplazar por la URL real una vez desplegadas las Cloud Functions
// (se imprime al correr `firebase deploy --only functions`).
const SIGNATURE_ENDPOINT =
  process.env.NEXT_PUBLIC_BOLD_SIGNATURE_URL ||
  "https://us-central1-pharma-dream-web.cloudfunctions.net/boldSignature";

declare global {
  interface Window {
    BoldCheckout?: new (config: Record<string, unknown>) => { open: () => void };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadBoldScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.BoldCheckout) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = BOLD_SCRIPT_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("No se pudo cargar el script de Bold"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

async function fetchSignature(orderId: string): Promise<{
  amount: string;
  currency: string;
  signature: string;
}> {
  const res = await fetch(SIGNATURE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId }),
  });
  if (!res.ok) {
    throw new Error(`No se pudo generar la firma de Bold (${res.status})`);
  }
  return res.json();
}

/**
 * Abre el checkout de Bold para un pedido ya creado en Firestore.
 * El monto se calcula del lado del servidor a partir del pedido,
 * nunca se envía desde el navegador.
 */
export async function openBoldCheckout(options: {
  orderId: string;
  description: string;
  redirectionUrl: string;
}): Promise<void> {
  if (!BOLD_IDENTITY_KEY) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_BOLD_IDENTITY_KEY antes de compilar el sitio.",
    );
  }

  const [, { amount, currency, signature }] = await Promise.all([
    loadBoldScript(),
    fetchSignature(options.orderId),
  ]);

  if (!window.BoldCheckout) {
    throw new Error("El checkout de Bold no cargó correctamente.");
  }

  const checkout = new window.BoldCheckout({
    orderId: options.orderId,
    currency,
    amount,
    apiKey: BOLD_IDENTITY_KEY,
    integritySignature: signature,
    description: options.description,
    redirectionUrl: options.redirectionUrl,
    renderMode: "embedded",
  });

  checkout.open();
}
