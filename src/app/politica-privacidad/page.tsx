import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidad — Pharma Dream",
  description:
    "Cómo Pharma Dream recopila, usa y protege tu información personal, conforme a la Ley 1581 de 2012 de Colombia.",
};

const contact = {
  email: "info@pharma-dream.com",
  whatsapp: "+57 300 997 9933",
  hours: "lunes a viernes, 9:00 a.m. – 6:00 p.m. (GMT-5)",
};

const sections: LegalSection[] = [
  {
    heading: "Información personal que recopilamos o tratamos",
    blocks: [
      {
        type: "p",
        text: '"Información personal" es cualquier dato que lo identifique o pueda vincularse razonablemente con usted. No incluye datos anonimizados o debidamente desidentificados. Según su interacción con los Servicios y la normativa aplicable, podemos recolectar las siguientes categorías (incluyendo inferencias derivadas):',
      },
      {
        type: "list",
        items: [
          "Detalles de contacto: nombre, dirección, dirección de facturación y envío, número de teléfono/WhatsApp y correo electrónico.",
          "Información financiera: números de tarjeta (tokenizados por el proveedor de pagos), forma de pago, confirmación de pago y datos de transacciones.",
          "Información de cuenta: usuario, contraseña, preferencias y configuración.",
          "Información sobre transacciones: artículos vistos, agregados al carrito, comprados, devueltos, cambiados o cancelados; historial de pedidos.",
          "Comunicaciones: información que nos facilite al contactarnos (p. ej., servicio al cliente, garantías, PQR).",
          "Información de dispositivos: datos del dispositivo, navegador, red, dirección IP e identificadores.",
          "Información de uso: interacción con los Servicios, fechas/horas de acceso, navegación y métricas.",
        ],
      },
    ],
  },
  {
    heading: "Datos sensibles (información relacionada con la salud)",
    blocks: [
      {
        type: "p",
        text: "Conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013, los datos relacionados con la salud son datos sensibles y reciben un tratamiento reforzado.",
      },
      {
        type: "p",
        text: "Cuando Pharma Dream recopile este tipo de datos —por ejemplo, al brindar recomendaciones de productos, procesar solicitudes relacionadas con fórmulas médicas o atender consultas sobre condiciones de salud—, solicitaremos su autorización previa, expresa e informada, de forma independiente a la aceptación general de esta Política.",
      },
      {
        type: "p",
        text: "Usted no está obligado a suministrar datos sensibles. Su negativa no afectará su posibilidad de realizar compras de productos que no requieran dicha información.",
      },
    ],
  },
  {
    heading: "Fuentes de información personal",
    blocks: [
      {
        type: "list",
        items: [
          "Directamente de usted: al crear cuenta, comprar o comunicarse con nosotros.",
          "Automáticamente: mediante cookies o tecnologías similares al usar los Servicios.",
          "Proveedores de servicios: cuando los contratamos para operar o mejorar los Servicios (p. ej., pagos, logística, analítica, soporte).",
          "Partners o terceros: cuando la ley lo permite o usted lo autoriza.",
        ],
      },
    ],
  },
  {
    heading: "Cómo utilizamos su información personal",
    blocks: [
      {
        type: "list",
        items: [
          "Prestar, personalizar y mejorar los Servicios: procesar pagos y pedidos, envíos, cambios y devoluciones; gestionar su cuenta; recordar preferencias; habilitar reseñas y recomendaciones; optimizar la experiencia.",
          "Marketing y publicidad: enviar comunicaciones promocionales (cuando haya autorización) y mostrar anuncios dentro y fuera de los Servicios con base en su interacción.",
          "Seguridad y prevención de fraude: autenticar cuentas; detectar, investigar y actuar frente a actividad fraudulenta o maliciosa; proteger a los usuarios y la plataforma.",
          "Comunicaciones: responder a solicitudes, PQR y soporte; mantener la relación comercial.",
          "Motivos legales: cumplir normas aplicables, responder a requerimientos de autoridades y hacer valer términos o políticas.",
        ],
      },
    ],
  },
  {
    heading: "Cómo divulgamos la información personal",
    blocks: [
      {
        type: "p",
        text: "Podemos divulgar información personal a terceros, en función de los fines descritos y la ley aplicable:",
      },
      {
        type: "list",
        items: [
          "Shopify, proveedores y terceros que prestan servicios a nuestro nombre (pagos, logística, almacenamiento, analítica, soporte, TI).",
          "Partners comerciales y de marketing para campañas y publicidad (según autorizaciones vigentes).",
          "Cuando usted lo solicite o consienta (p. ej., integraciones sociales).",
          "Afiliados o grupo empresarial, cuando aplique.",
          "Operaciones societarias (fusión, adquisición) o por exigencias legales (órdenes, citaciones), o para proteger nuestros derechos y los de los usuarios.",
        ],
      },
      {
        type: "p",
        text: "Relación con Shopify: los Servicios están alojados y operados técnicamente en Shopify. Para prestar y mejorar los Servicios, cierta información que usted envía puede ser procesada por Shopify y algunos de sus subencargados, que podrían estar ubicados en otros países. En dichas instancias, Shopify actúa como encargado o responsable (según corresponda) respecto de ciertos tratamientos necesarios para operar la plataforma y prestar funcionalidades avanzadas.",
      },
    ],
  },
  {
    heading: "Sitios web de terceros",
    blocks: [
      {
        type: "p",
        text: "Los Servicios pueden incluir enlaces a sitios o plataformas de terceros. No controlamos sus prácticas de privacidad o seguridad. Le recomendamos revisar sus políticas y términos. La información que comparta en espacios públicos o semipúblicos (incluidas redes sociales) podría ser visible para otros.",
      },
    ],
  },
  {
    heading: "Datos de menores",
    blocks: [
      {
        type: "p",
        text: "Los Servicios no están dirigidos a menores de edad. No recopilamos conscientemente datos personales de menores según la ley aplicable. Si un menor nos ha proporcionado datos, su representante puede contactarnos para solicitar su eliminación.",
      },
    ],
  },
  {
    heading: "Seguridad y conservación",
    blocks: [
      {
        type: "p",
        text: "Aplicamos medidas técnicas, administrativas y físicas razonables para proteger su información. No obstante, ninguna medida es infalible y la transmisión por Internet puede no ser completamente segura. Conserve la confidencialidad de sus credenciales.",
      },
      {
        type: "p",
        text: "Conservamos información por el tiempo necesario para: mantener su cuenta, prestar los Servicios, cumplir obligaciones legales, resolver disputas y hacer valer nuestros términos.",
      },
    ],
  },
  {
    heading: "Sus derechos y opciones",
    blocks: [
      {
        type: "p",
        text: "De acuerdo con la normativa colombiana (Ley 1581 de 2012 y normas concordantes), usted puede ejercer los siguientes derechos sobre sus datos personales:",
      },
      {
        type: "table",
        headers: ["Derecho", "En qué consiste"],
        rows: [
          ["Conocer y acceder", "Solicitar copia de sus datos personales que tratamos."],
          ["Actualizar y rectificar", "Corregir datos inexactos, incompletos o desactualizados."],
          ["Suprimir", "Solicitar la eliminación de sus datos cuando sea procedente."],
          ["Revocar la autorización", "Retirar su consentimiento para el tratamiento en cualquier momento."],
          ["Presentar quejas", "Acudir ante la autoridad competente (SIC) cuando corresponda."],
        ],
      },
      {
        type: "p",
        text: "También puede gestionar sus preferencias de comunicación (p. ej., darse de baja de correos promocionales). Es posible que sigamos enviando comunicaciones no promocionales relacionadas con su cuenta o pedidos.",
      },
      {
        type: "p",
        text: "Para ejercer estos derechos o realizar solicitudes sobre el tratamiento de sus datos, contáctenos mediante los datos indicados al final de esta política. Podremos verificar su identidad y, cuando proceda, la de su representante autorizado.",
      },
    ],
  },
  {
    heading: "Transferencias internacionales",
    blocks: [
      {
        type: "p",
        text: "Podemos transferir, almacenar y tratar información personal fuera de Colombia (p. ej., a países donde Shopify o nuestros proveedores operan). Adoptaremos medidas contractuales y de seguridad razonables para proteger su información conforme a la normativa aplicable.",
      },
    ],
  },
  {
    heading: "Cambios a esta política",
    blocks: [
      {
        type: "p",
        text: 'Podemos actualizar esta Política para reflejar cambios operativos, legales o normativos. Publicaremos la versión vigente con la fecha de "Última actualización" indicada arriba.',
      },
    ],
  },
  {
    heading: "Contacto",
    blocks: [
      {
        type: "p",
        text: `Si tiene preguntas sobre esta Política o desea ejercer sus derechos de privacidad, contáctenos por correo (${contact.email}) o WhatsApp (${contact.whatsapp}). Responsable del tratamiento: Pharma Dream (Colombia). Atendemos de lunes a viernes, 9:00 a.m. a 6:00 p.m. (GMT-5).`,
      },
    ],
  },
];

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Pharma Dream"
      title="Política de Privacidad"
      intro="Pharma Dream gestiona esta tienda y este sitio web, incluidos los datos, el contenido, las funciones, las herramientas, los productos y los servicios, para ofrecerle a usted, cliente, una experiencia de compra segura y de calidad."
      sections={sections}
      contact={contact}
    />
  );
}
