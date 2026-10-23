import type { Lang } from "./i18n";

export type ChatFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ChatCopy = {
  faqs: ChatFaq[];
  greeting: string;
  fallback: string;
  ui: {
    title: string;
    whatsapp: string;
    close: string;
    openAssistant: string;
    closeAssistant: string;
    tip: string;
  };
};

/* Textos del chatbot en cada idioma. Son redactados a mano (no pasan por la
   traducción automática del sitio): mantener las tres versiones alineadas
   cuando cambien envíos, pagos, devoluciones, etc. */
export const CHAT_COPY: Record<Lang, ChatCopy> = {
  es: {
    faqs: [
      {
        id: "envios",
        question: "¿Cuánto tarda el envío?",
        answer:
          "Enviamos a toda Colombia: 2 a 5 días hábiles a ciudades principales y 5 a 8 días hábiles a municipios intermedios o rurales. El envío es gratis desde $200.000 COP. También hacemos envíos internacionales (10 a 20 días hábiles).",
      },
      {
        id: "pagos",
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Puedes pagar en línea de forma segura con tarjeta de crédito o débito, PSE o Nequi (a través de Bold).",
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
    ],
    greeting:
      "¡Hola! Soy el asistente de Pharma Dream 🌿 Puedo ayudarte con envíos, pagos, devoluciones, ingredientes y el Club. Elige una pregunta o escríbenos directo por WhatsApp si necesitas algo más específico.",
    fallback:
      "No tengo una respuesta puntual para eso todavía. Escríbenos por WhatsApp y con gusto te ayudamos personalmente.",
    ui: {
      title: "Asistente Pharma Dream",
      whatsapp: "Hablar con un asesor por WhatsApp",
      close: "Cerrar chat",
      openAssistant: "Abrir asistente",
      closeAssistant: "Cerrar asistente",
      tip: "¿Necesitas ayuda? Pregúntale a nuestro asistente 💬",
    },
  },
  en: {
    faqs: [
      {
        id: "envios",
        question: "How long does shipping take?",
        answer:
          "We ship all over Colombia: 2 to 5 business days to major cities and 5 to 8 business days to mid-sized towns or rural areas. Shipping is free on orders over COP $200,000. We also ship internationally (10 to 20 business days).",
      },
      {
        id: "pagos",
        question: "Which payment methods do you accept?",
        answer:
          "You can pay securely online with a credit or debit card, PSE or Nequi (through Bold).",
      },
      {
        id: "devoluciones",
        question: "Can I return a product?",
        answer:
          "Yes. You have 5 business days from delivery to exercise your right of withdrawal (Law 1480 of 2011), as long as the product is unused and in its original packaging. See the full details in our Returns and Refunds Policy.",
      },
      {
        id: "ingredientes",
        question: "Are the products natural?",
        answer:
          "Yes, our formulas combine naturally derived ingredients (such as HEMP, Plant Placenta and botanical extracts) with cutting-edge cosmetic technology. You can see the details of each ingredient on every product page and in the Ingredients section.",
      },
      {
        id: "club",
        question: "What is the Pharma Dream Club?",
        answer:
          "When you join with your email you get 10% off your first purchase and access to exclusive benefits. You can sign up from the site popup or the Club section.",
      },
      {
        id: "contacto",
        question: "How can I contact you?",
        answer:
          "You can write to us on WhatsApp or at info@pharmadream.com.co, Monday to Friday from 9:00 a.m. to 6:00 p.m. (GMT-5).",
      },
    ],
    greeting:
      "Hi! I'm the Pharma Dream assistant 🌿 I can help you with shipping, payments, returns, ingredients and the Club. Pick a question or message us directly on WhatsApp if you need something more specific.",
    fallback:
      "I don't have a specific answer for that yet. Message us on WhatsApp and we'll gladly help you personally.",
    ui: {
      title: "Pharma Dream Assistant",
      whatsapp: "Chat with an advisor on WhatsApp",
      close: "Close chat",
      openAssistant: "Open assistant",
      closeAssistant: "Close assistant",
      tip: "Need help? Ask our assistant 💬",
    },
  },
  fr: {
    faqs: [
      {
        id: "envios",
        question: "Quels sont les délais de livraison ?",
        answer:
          "Nous livrons dans toute la Colombie : 2 à 5 jours ouvrables vers les grandes villes et 5 à 8 jours ouvrables vers les villes moyennes ou les zones rurales. La livraison est gratuite à partir de 200 000 COP. Nous expédions aussi à l'international (10 à 20 jours ouvrables).",
      },
      {
        id: "pagos",
        question: "Quels moyens de paiement acceptez-vous ?",
        answer:
          "Vous pouvez payer en ligne en toute sécurité par carte bancaire (crédit ou débit), PSE ou Nequi (via Bold).",
      },
      {
        id: "devoluciones",
        question: "Puis-je retourner un produit ?",
        answer:
          "Oui. Vous disposez de 5 jours ouvrables à compter de la livraison pour exercer votre droit de rétractation (loi 1480 de 2011), à condition que le produit soit inutilisé et dans son emballage d'origine. Consultez tous les détails dans notre Politique de retours et de remboursements.",
      },
      {
        id: "ingredientes",
        question: "Les produits sont-ils naturels ?",
        answer:
          "Oui, nos formules associent des ingrédients d'origine naturelle (comme le HEMP, le Placenta Végétal et des extraits botaniques) à une technologie cosmétique de pointe. Vous trouverez le détail de chaque ingrédient sur la page de chaque produit et dans la section Ingrédients.",
      },
      {
        id: "club",
        question: "Qu'est-ce que le Club Pharma Dream ?",
        answer:
          "En vous inscrivant avec votre e-mail, vous obtenez 10 % de réduction sur votre première commande et l'accès à des avantages exclusifs. Vous pouvez vous inscrire depuis la fenêtre du site ou la section Club.",
      },
      {
        id: "contacto",
        question: "Comment vous contacter ?",
        answer:
          "Vous pouvez nous écrire sur WhatsApp ou à info@pharmadream.com.co, du lundi au vendredi de 9 h à 18 h (GMT-5).",
      },
    ],
    greeting:
      "Bonjour ! Je suis l'assistant de Pharma Dream 🌿 Je peux vous aider pour la livraison, les paiements, les retours, les ingrédients et le Club. Choisissez une question ou écrivez-nous directement sur WhatsApp si vous avez besoin de quelque chose de plus précis.",
    fallback:
      "Je n'ai pas encore de réponse précise à cela. Écrivez-nous sur WhatsApp et nous vous aiderons avec plaisir.",
    ui: {
      title: "Assistant Pharma Dream",
      whatsapp: "Parler à un conseiller sur WhatsApp",
      close: "Fermer le chat",
      openAssistant: "Ouvrir l'assistant",
      closeAssistant: "Fermer l'assistant",
      tip: "Besoin d'aide ? Demandez à notre assistant 💬",
    },
  },
};
