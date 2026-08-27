import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Pharma Dream",
  description:
    "Términos y condiciones de uso del sitio web y la tienda en línea de Pharma Dream, Colombia.",
};

const contact = {
  email: "info@pharma-dream.com",
  whatsapp: "+57 300 997 9933",
  hours: "lunes a viernes, 9:00 a.m. – 6:00 p.m. (GMT-5)",
};

const sections: LegalSection[] = [
  {
    heading: "Información general",
    blocks: [
      {
        type: "p",
        text: 'El presente documento regula los Términos y Condiciones de Uso (en adelante, los "Términos") aplicables al sitio web de Pharma Dream, empresa establecida en Colombia, dedicada a la producción y comercialización de productos cosméticos naturales potenciados con Placenta Vegetal y HEMP.',
      },
      {
        type: "p",
        text: 'Al acceder, navegar o realizar una compra a través de este sitio, el usuario (en adelante, el "Cliente") declara haber leído, comprendido y aceptado estos Términos, los cuales son de carácter vinculante.',
      },
    ],
  },
  {
    heading: "Identificación de la empresa",
    blocks: [
      {
        type: "list",
        items: [
          "Pharma Dream Colombia",
          `Correo: ${contact.email}`,
          `WhatsApp: ${contact.whatsapp}`,
          "Domicilio comercial: Bogotá, Colombia",
        ],
      },
    ],
  },
  {
    heading: "Objeto del sitio web",
    blocks: [
      {
        type: "p",
        text: "El sitio web tiene por objeto ofrecer al público información y venta de productos cosméticos de la marca Pharma Dream, así como facilitar la comunicación, soporte y acceso a servicios complementarios como asesoría, promociones y contenido informativo.",
      },
    ],
  },
  {
    heading: "Productos con Placenta Vegetal y aceite de cáñamo (HEMP)",
    blocks: [
      {
        type: "p",
        text: "Los productos de Pharma Dream están formulados alrededor de dos activos clave: la Placenta Vegetal y el aceite de cáñamo (HEMP), como ingredientes cosméticos. Su comercialización cumple con la normativa sanitaria y cosmética vigente en Colombia.",
      },
    ],
  },
  {
    heading: "Aceptación de los términos",
    blocks: [
      {
        type: "p",
        text: "Al acceder o utilizar el sitio web, usted acepta expresamente sujetarse a los presentes Términos y Condiciones, así como a la Política de Privacidad, la Política de Devoluciones y Reembolsos, la Política de Envíos y cualquier otra política complementaria publicada por Pharma Dream.",
      },
      {
        type: "p",
        text: "Si no está de acuerdo con alguno de los términos aquí establecidos, debe abstenerse de utilizar el sitio o realizar compras a través de él.",
      },
    ],
  },
  {
    heading: "Capacidad para contratar",
    blocks: [
      {
        type: "p",
        text: "Los Servicios están dirigidos a personas mayores de edad, con capacidad legal para celebrar contratos conforme a la legislación colombiana. Al realizar una compra, el Cliente declara cumplir con este requisito.",
      },
    ],
  },
  {
    heading: "Registro y cuenta de usuario",
    blocks: [
      {
        type: "p",
        text: "Para realizar compras, el Cliente podrá crear una cuenta personal en el sitio, proporcionando información veraz, completa y actualizada.",
      },
      {
        type: "p",
        text: "El Cliente es responsable de mantener la confidencialidad de su cuenta, nombre de usuario y contraseña, así como de todas las actividades que se realicen desde la misma.",
      },
      {
        type: "p",
        text: "Pharma Dream se reserva el derecho de suspender o cancelar cuentas que presenten actividad sospechosa, incumplan las políticas o hagan uso indebido del sitio.",
      },
    ],
  },
  {
    heading: "Productos y disponibilidad",
    blocks: [
      {
        type: "p",
        text: "Todos los productos mostrados en el sitio están sujetos a disponibilidad. Pharma Dream se reserva el derecho de modificar o descontinuar productos sin previo aviso.",
      },
      {
        type: "p",
        text: "Las imágenes presentadas son de carácter ilustrativo y pueden variar levemente del producto final, sin que esto afecte su calidad o composición.",
      },
    ],
  },
  {
    heading: "Precios y pagos",
    blocks: [
      {
        type: "p",
        text: "Los precios exhibidos en el sitio están expresados en pesos colombianos (COP) e incluyen los impuestos aplicables conforme a la legislación vigente.",
      },
      {
        type: "p",
        text: "Los pagos podrán realizarse a través de las pasarelas de pago disponibles en el sitio. El procesamiento de pagos es gestionado por terceros bajo sus propios términos y condiciones.",
      },
      {
        type: "p",
        text: "Pharma Dream no almacena información confidencial de tarjetas o cuentas bancarias.",
      },
    ],
  },
  {
    heading: "Envíos y entregas",
    blocks: [
      {
        type: "p",
        text: "Los pedidos serán enviados a la dirección registrada por el Cliente, utilizando los operadores logísticos autorizados. El tiempo de entrega estimado será informado durante el proceso de compra.",
      },
      {
        type: "p",
        text: "En caso de retrasos, el Cliente será notificado oportunamente. El costo del envío se calculará según destino y peso del pedido.",
      },
      {
        type: "p",
        text: "Pharma Dream no se responsabiliza por demoras o daños ocasionados por causas ajenas a su control (caso fortuito, fuerza mayor o negligencia del transportador). Consulte la Política de Envíos para más detalle.",
      },
    ],
  },
  {
    heading: "Devoluciones, retractos y reembolsos",
    blocks: [
      {
        type: "p",
        text: "Las devoluciones, retractos y solicitudes de reembolso se regirán conforme a la Política de Devoluciones y Reembolsos vigente y a la Ley 1480 de 2011 – Estatuto del Consumidor Colombiano.",
      },
      {
        type: "p",
        text: "El Cliente podrá ejercer su derecho de retracto dentro de los plazos legales, siempre que el producto se encuentre en su empaque original, sin uso y con sellos de seguridad intactos.",
      },
      {
        type: "p",
        text: "Por razones sanitarias, los productos cosméticos abiertos o usados no tienen cambio ni devolución, salvo defecto de fabricación.",
      },
    ],
  },
  {
    heading: "Propiedad intelectual",
    blocks: [
      {
        type: "p",
        text: "Todo el contenido del sitio web —textos, imágenes, logotipos, videos, diseño gráfico y software— es propiedad exclusiva de Pharma Dream o de sus respectivos titulares, y está protegido por las leyes nacionales e internacionales de propiedad intelectual y derechos de autor.",
      },
      {
        type: "p",
        text: "Está prohibida su reproducción, distribución, modificación o uso sin autorización expresa y por escrito.",
      },
    ],
  },
  {
    heading: "Conducta del usuario",
    blocks: [
      {
        type: "p",
        text: "El Cliente se compromete a:",
      },
      {
        type: "list",
        items: [
          "No realizar actos fraudulentos, ilegales o contrarios a la moral y buenas costumbres.",
          "No alterar ni manipular los sistemas del sitio.",
          "No usar el sitio para difundir contenido ofensivo, difamatorio o malintencionado.",
        ],
      },
      {
        type: "p",
        text: "El incumplimiento de estas normas podrá implicar la suspensión inmediata del acceso y acciones legales correspondientes.",
      },
    ],
  },
  {
    heading: "Limitación de responsabilidad",
    blocks: [
      {
        type: "p",
        text: "Pharma Dream no garantiza la disponibilidad continua o libre de errores del sitio.",
      },
      {
        type: "p",
        text: "No será responsable por daños indirectos, pérdida de datos, beneficios o interrupción de servicio derivados del uso o imposibilidad de uso del sitio o sus productos.",
      },
      {
        type: "p",
        text: "El uso de los productos ofrecidos debe realizarse conforme a las instrucciones incluidas en cada empaque. Pharma Dream no se hace responsable por efectos adversos derivados del uso inadecuado o contrario a las recomendaciones.",
      },
    ],
  },
  {
    heading: "Privacidad y protección de datos",
    blocks: [
      {
        type: "p",
        text: "El tratamiento de los datos personales del Cliente se realizará conforme a nuestra Política de Privacidad, en cumplimiento con la Ley 1581 de 2012 y demás normas aplicables en Colombia.",
      },
    ],
  },
  {
    heading: "Legislación aplicable y jurisdicción",
    blocks: [
      {
        type: "p",
        text: "Estos Términos se interpretarán y aplicarán conforme a las leyes de la República de Colombia.",
      },
      {
        type: "p",
        text: "Cualquier controversia derivada del uso del sitio o de las relaciones comerciales entre el Cliente y Pharma Dream será resuelta ante los jueces competentes de la República de Colombia, sin perjuicio del derecho del consumidor a acudir ante la autoridad o jurisdicción de su domicilio conforme a la ley aplicable.",
      },
    ],
  },
  {
    heading: "Modificaciones a los términos",
    blocks: [
      {
        type: "p",
        text: 'Pharma Dream podrá actualizar estos Términos y Condiciones para reflejar cambios operativos, legales o normativos. La versión vigente será publicada en el sitio web con la fecha de "Última actualización" correspondiente. El uso continuado del sitio tras dichas modificaciones implica su aceptación.',
      },
    ],
  },
  {
    heading: "Contacto",
    blocks: [
      {
        type: "p",
        text: `Para consultas, reclamaciones o solicitudes relacionadas con estos Términos, puede contactarnos por correo (${contact.email}) o WhatsApp (${contact.whatsapp}). Dirección: Bogotá, Colombia. Horario de atención: lunes a viernes, 9:00 a.m. a 6:00 p.m. (GMT-5).`,
      },
    ],
  },
];

export default function TerminosPage() {
  return (
    <LegalPage
      eyebrow="Pharma Dream"
      title="Términos y Condiciones de Servicio"
      sections={sections}
      contact={contact}
    />
  );
}
