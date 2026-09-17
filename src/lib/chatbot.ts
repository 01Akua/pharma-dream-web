export type ChatFaq = {
  id: string;
  question: string;
  answer: string;
};

export const CHAT_FAQS: ChatFaq[] = [
  {
    id: "envios",
    question: "¿Cuánto tarda el envío?",
    answer:
      "Enviamos a toda Colombia: 2 a 5 días hábiles a ciudades principales y 5 a 8 días hábiles a municipios intermedios o rurales. El envío es gratis desde $175.000 COP. También hacemos envíos internacionales (10 a 20 días hábiles).",
  },
  {
    id: "pagos",
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Por ahora puedes pagar contraentrega. Estamos habilitando pago en línea con tarjeta y otros medios digitales próximamente.",
  },
  {
    id: "devoluciones",
    question: "¿Puedo devolver un producto?",
    answer:
      "Sí. Tienes 5 días hábiles desde la entrega para ejercer tu derecho de retracto (Ley 1480 de 2011), siempre que el producto esté sin usar y en su empaque original. Revisa el detalle completo en nuestra Política de Devoluciones y Reembolsos.",
  },
  {
    id: "ingredientes",
    question: "¿Los productos son naturales?",
    answer:
      "Sí, nuestras fórmulas combinan ingredientes de origen natural (como HEMP, Placenta Vegetal y extractos botánicos) con tecnología cosmética de vanguardia. Puedes ver el detalle de cada ingrediente en la página de cada producto y en la sección Ingredientes.",
  },
  {
    id: "club",
    question: "¿Qué es el Club Pharma Dream?",
    answer:
      "Al unirte con tu correo obtienes 10% de descuento en tu primera compra y acceso a beneficios exclusivos. Puedes registrarte desde el popup del sitio o la sección Club.",
  },
  {
    id: "contacto",
    question: "¿Cómo los contacto?",
    answer:
      "Puedes escribirnos por WhatsApp o al correo info@pharmadream.com.co, de lunes a viernes de 9:00 a.m. a 6:00 p.m. (GMT-5).",
  },
];

export const CHAT_GREETING =
  "¡Hola! Soy el asistente de Pharma Dream 🌿 Puedo ayudarte con envíos, pagos, devoluciones, ingredientes y el Club. Elige una pregunta o escríbenos directo por WhatsApp si necesitas algo más específico.";

export const CHAT_FALLBACK =
  "No tengo una respuesta puntual para eso todavía. Escríbenos por WhatsApp y con gusto te ayudamos personalmente.";
