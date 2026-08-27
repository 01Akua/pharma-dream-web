import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de Envíos — Pharma Dream",
  description:
    "Cobertura, tiempos de entrega, costos y condiciones de envío de Pharma Dream en Colombia e internacional.",
};

const contact = {
  email: "info@pharma-dream.com",
  whatsapp: "+57 300 997 9933",
  hours: "lunes a viernes, 9:00 a.m. – 6:00 p.m. (GMT-5)",
};

const sections: LegalSection[] = [
  {
    heading: "Cobertura y disponibilidad",
    blocks: [
      {
        type: "p",
        text: "Pharma Dream realiza envíos a todo el territorio nacional colombiano mediante empresas de mensajería certificadas y aliadas logísticas de confianza.",
      },
      {
        type: "p",
        text: "También ofrecemos envíos internacionales seleccionados, sujetos a condiciones especiales y costos adicionales según el país de destino.",
      },
      {
        type: "p",
        text: "Los productos se despachan desde nuestros centros de distribución en Colombia y/o bodegas autorizadas de aliados logísticos, según disponibilidad de inventario y ubicación del cliente.",
      },
    ],
  },
  {
    heading: "Tiempos de entrega estimados (Colombia)",
    blocks: [
      {
        type: "table",
        headers: ["Destino", "Tiempo estimado", "Costo"],
        rows: [
          [
            "Ciudades principales",
            "2 a 5 días hábiles",
            "Según destino/peso; gratis desde $175.000 COP",
          ],
          [
            "Municipios intermedios o rurales",
            "5 a 8 días hábiles",
            "Según destino/peso; gratis desde $175.000 COP",
          ],
          [
            "Envíos internacionales",
            "10 a 20 días hábiles",
            "Calculado al finalizar la compra + aranceles a cargo del cliente",
          ],
        ],
      },
      {
        type: "p",
        text: "En temporada alta o por factores externos (clima, bloqueos viales, transportadora, fuerza mayor), los tiempos podrían extenderse. Los plazos comienzan a contarse una vez el pago ha sido verificado y el pedido confirmado por correo electrónico o WhatsApp.",
      },
    ],
  },
  {
    heading: "Costos de envío",
    blocks: [
      {
        type: "p",
        text: "El costo de envío se calcula automáticamente durante el proceso de compra, según el destino y el peso total del pedido.",
      },
      {
        type: "p",
        text: "Pharma Dream ofrece envío gratuito en pedidos superiores a $175.000 COP (válido únicamente para Colombia). En compras inferiores a este monto, el cliente asume el valor del envío según la tarifa vigente del operador logístico.",
      },
    ],
  },
  {
    heading: "Confirmación y seguimiento del pedido",
    blocks: [
      {
        type: "p",
        text: "Una vez despachado el pedido, el cliente recibirá una notificación por correo electrónico o WhatsApp con el número de guía y el enlace de seguimiento para rastrear su envío en tiempo real. Pharma Dream monitorea el proceso logístico hasta la entrega final.",
      },
    ],
  },
  {
    heading: "Condiciones de entrega",
    blocks: [
      {
        type: "p",
        text: "El producto será entregado en la dirección registrada por el cliente al momento de la compra. Es responsabilidad del cliente verificar que la dirección, nombre y datos de contacto sean correctos.",
      },
      {
        type: "p",
        text: "Si la entrega no puede realizarse por error en la dirección o ausencia del destinatario, se coordinará una reexpedición cuyo costo adicional será asumido por el cliente.",
      },
      {
        type: "p",
        text: "El transportador realizará hasta dos intentos de entrega. Si no se logra la entrega, el paquete regresará al centro logístico y se notificará al cliente.",
      },
    ],
  },
  {
    heading: "Recepción y revisión del pedido",
    blocks: [
      {
        type: "p",
        text: "Al recibir su pedido, el cliente debe:",
      },
      {
        type: "list",
        items: [
          "Verificar que el empaque esté en buen estado y no presente alteraciones.",
          "Revisar que el contenido corresponda al pedido realizado.",
        ],
      },
      {
        type: "p",
        text: `En caso de encontrar inconsistencias, daños o faltantes, repórtalo dentro de las 48 horas siguientes a la entrega a través del correo ${contact.email} o WhatsApp ${contact.whatsapp}, adjuntando fotografías o video del paquete y los productos.`,
      },
    ],
  },
  {
    heading: "Envíos internacionales",
    blocks: [
      {
        type: "p",
        text: "Para pedidos fuera de Colombia:",
      },
      {
        type: "list",
        items: [
          "Los tiempos de entrega varían según el país y las regulaciones aduaneras locales (estimado: 10 a 20 días hábiles).",
          "Los costos de envío internacional se calculan al finalizar la compra.",
          "Cualquier impuesto, tasa o arancel aduanero será asumido por el cliente.",
          "El servicio de rastreo estará disponible hasta la entrega final en destino.",
          "Por regulaciones sanitarias, no se aceptan devoluciones internacionales salvo en casos de productos defectuosos.",
        ],
      },
    ],
  },
  {
    heading: "Retrasos y casos fortuitos",
    blocks: [
      {
        type: "p",
        text: "Pharma Dream no se hace responsable por demoras o incumplimientos derivados de:",
      },
      {
        type: "list",
        items: [
          "Causas de fuerza mayor o caso fortuito (desastres naturales, huelgas, cierres de vías, pandemia, etc.).",
          "Demoras atribuibles al operador logístico o a terceros.",
        ],
      },
      {
        type: "p",
        text: "En tales casos, el equipo de atención informará al cliente y dará seguimiento hasta la entrega efectiva.",
      },
    ],
  },
  {
    heading: "Modificaciones y cancelaciones de envío",
    blocks: [
      {
        type: "p",
        text: "Los cambios de dirección solo podrán realizarse antes de que el pedido sea despachado. Una vez emitida la guía de transporte, no será posible modificar la dirección ni cancelar el envío.",
      },
      {
        type: "p",
        text: "Si el cliente desea cancelar un pedido, deberá hacerlo dentro de las 2 horas siguientes a la confirmación del pago, contactando al equipo de soporte.",
      },
    ],
  },
  {
    heading: "Atención al cliente",
    blocks: [
      {
        type: "p",
        text: `Para consultas, soporte o seguimiento personalizado de su envío, puede contactarnos por correo (${contact.email}) o WhatsApp (${contact.whatsapp}), de lunes a viernes de 9:00 a.m. a 6:00 p.m.`,
      },
    ],
  },
  {
    heading: "Base legal",
    blocks: [
      {
        type: "p",
        text: "Esta Política de Envíos se emite en cumplimiento de la legislación comercial colombiana y de las disposiciones del Estatuto del Consumidor (Ley 1480 de 2011), garantizando la protección de los derechos de los consumidores y la transparencia en el proceso de despacho y entrega de productos.",
      },
    ],
  },
];

export default function PoliticaDeEnviosPage() {
  return (
    <LegalPage
      eyebrow="Pharma Dream"
      title="Política de Envíos"
      sections={sections}
      contact={contact}
    />
  );
}
