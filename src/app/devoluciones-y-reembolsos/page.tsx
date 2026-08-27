import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Política de Devoluciones y Reembolsos — Pharma Dream",
  description:
    "Condiciones de retracto, garantía, devoluciones y reembolsos de Pharma Dream conforme al Estatuto del Consumidor colombiano.",
};

const contact = {
  email: "info@pharma-dream.com",
  whatsapp: "+57 300 997 9933",
  hours: "lunes a viernes, 9:00 a.m. – 6:00 p.m. (GMT-5)",
};

const sections: LegalSection[] = [
  {
    heading: "Resumen rápido",
    blocks: [
      {
        type: "table",
        headers: [
          "Tipo de solicitud",
          "Plazo para notificar",
          "¿Quién paga el envío?",
          "Reembolso en",
        ],
        rows: [
          [
            "Retracto (compra online)",
            "5 días hábiles desde la entrega",
            "Cliente",
            "30 días calendario",
          ],
          [
            "Garantía / producto defectuoso o error de envío",
            "48 horas desde la entrega",
            "Pharma Dream",
            "30 días calendario desde aprobación",
          ],
          [
            "Pedido internacional (producto dañado)",
            "48 horas desde la entrega",
            "Se evalúa caso a caso",
            "Se evalúa caso a caso",
          ],
        ],
      },
    ],
  },
  {
    heading: "Derecho de retracto (compras en línea en Colombia)",
    blocks: [
      {
        type: "p",
        text: "De acuerdo con el Estatuto del Consumidor de Colombia (Ley 1480 de 2011, artículo 47), el cliente cuenta con cinco (5) días hábiles contados desde la entrega del producto para ejercer el derecho de retracto en compras realizadas por medios no presenciales, como nuestra tienda virtual.",
      },
      {
        type: "p",
        text: "Para que la devolución sea válida, el producto debe:",
      },
      {
        type: "list",
        items: [
          "Encontrarse en las mismas condiciones en que fue recibido, sin uso.",
          "Conservar sellos, etiquetas y empaque original.",
        ],
      },
      {
        type: "p",
        text: "El cliente asume los costos de transporte generados por la devolución, salvo que la normativa aplicable disponga lo contrario para el caso concreto.",
      },
      {
        type: "p",
        text: "Una vez recibido y verificado el estado del producto, Pharma Dream realizará el reembolso dentro de los treinta (30) días calendario siguientes, utilizando el mismo medio de pago empleado en la compra o el que se acuerde con el cliente.",
      },
      {
        type: "p",
        text: "Importante: por motivos de higiene y seguridad sanitaria, no se aceptan devoluciones de productos cosméticos o de cuidado personal que hayan sido abiertos, usados o que no conserven sus sellos de seguridad, conforme a las excepciones contempladas en el Estatuto del Consumidor.",
      },
    ],
  },
  {
    heading: "Consideraciones especiales para productos cosméticos y de cuidado facial",
    blocks: [
      {
        type: "p",
        text: "Pharma Dream comercializa productos cosméticos y de cuidado facial (limpiadores, tratamientos, protectores solares, sueros, cremas y similares), no medicamentos. Por lo tanto, estos productos se rigen por el Estatuto del Consumidor y la normativa cosmética vigente en Colombia, y no por las disposiciones aplicables a la dispensación de medicamentos.",
      },
      {
        type: "p",
        text: "Por motivos de higiene y seguridad sanitaria, según lo indicado en la sección anterior, no se aceptan devoluciones de productos cosméticos o de cuidado facial que hayan sido abiertos, usados o que no conserven sus sellos de seguridad, salvo que se trate de un producto defectuoso, vencido o con daño de fábrica.",
      },
      {
        type: "p",
        text: "Si el cliente presenta una reacción alérgica, irritación u otra molestia cutánea tras usar un producto, debe suspender su uso de inmediato y contactarnos indicando el lote y adjuntando fotografías. Nuestro equipo evaluará el caso; cuando la reacción se deba a un defecto de fabricación o a un ingrediente no declarado en la etiqueta, aplica la garantía descrita más adelante. Las reacciones asociadas a sensibilidad individual del cliente (no imputables al producto) no constituyen defecto de calidad.",
      },
      {
        type: "p",
        text: "Recomendación de buena práctica: sugerimos siempre una prueba de sensibilidad (patch test) en una zona pequeña de piel antes del primer uso completo.",
      },
    ],
  },
  {
    heading: "Devoluciones por garantía (producto defectuoso o error de envío)",
    blocks: [
      {
        type: "p",
        text: "Si recibes un producto defectuoso, incompleto o incorrecto, notifícalo dentro de un plazo máximo de 48 horas posteriores a la entrega, enviando evidencia fotográfica o en video del producto y su empaque.",
      },
      {
        type: "p",
        text: "Si el producto presenta fallas de calidad no atribuibles al mal uso, podrás solicitar reparación, reposición o devolución del dinero, conforme a la garantía legal vigente en Colombia.",
      },
      {
        type: "p",
        text: "Cuando se apruebe la garantía, Pharma Dream asumirá los costos de transporte de ida y regreso.",
      },
      {
        type: "p",
        text: "Cuando el producto sea reemplazado en su totalidad, la garantía se renueva desde la fecha de entrega del nuevo producto.",
      },
    ],
  },
  {
    heading: "Condiciones generales para aceptar una devolución",
    blocks: [
      {
        type: "p",
        text: "Para ejercer el retracto o tramitar una devolución, el producto debe cumplir todas las siguientes condiciones:",
      },
      {
        type: "list",
        items: [
          "Estar cerrado, sin uso y en perfecto estado.",
          "Conservar el empaque y las etiquetas originales.",
          "Incluir la factura o comprobante de compra.",
          "No mostrar signos de manipulación, rotura o derrame.",
          "En kits o combos, incluir todos los productos que los componen.",
        ],
      },
    ],
  },
  {
    heading: "Procedimiento para realizar una devolución",
    blocks: [
      {
        type: "list",
        items: [
          "Contáctanos por correo o WhatsApp indicando número de pedido, motivo y evidencia fotográfica.",
          "Recibirás las instrucciones de devolución, junto con la guía de envío o la dirección física correspondiente.",
          "Empaca el producto en su caja original, protegido, con la factura adjunta.",
          "Una vez recibido, realizamos un control de calidad (1 a 3 días hábiles).",
          "Si el producto cumple las condiciones, procedemos con el reembolso, cambio o nota crédito, según corresponda.",
        ],
      },
    ],
  },
  {
    heading: "Reembolsos",
    blocks: [
      {
        type: "p",
        text: "Los reembolsos se realizan al mismo método de pago utilizado en la compra (o a otro acordado por escrito), dentro de un plazo máximo de treinta (30) días calendario posteriores a la aceptación de la solicitud.",
      },
      {
        type: "p",
        text: "Los costos de envío iniciales no son reembolsables, salvo en casos de error o falla atribuible a Pharma Dream.",
      },
      {
        type: "p",
        text: "Si la compra se realizó con un cupón o descuento, el reembolso corresponderá al valor efectivamente pagado por el cliente.",
      },
    ],
  },
  {
    heading: "Compras realizadas a través de marketplaces",
    blocks: [
      {
        type: "p",
        text: "Si adquiriste productos de Pharma Dream a través de Amazon, Mercado Libre, Falabella u otro marketplace, la devolución debe gestionarse directamente en esa plataforma, siguiendo sus políticas y plazos. Pharma Dream brindará soporte y acompañamiento cuando sea necesario.",
      },
    ],
  },
  {
    heading: "Pedidos internacionales",
    blocks: [
      {
        type: "p",
        text: "Para pedidos fuera de Colombia, y debido a regulaciones sanitarias y logísticas internacionales, no aplica el derecho de retracto. Si recibes un producto dañado o defectuoso, notifícalo dentro de las 48 horas siguientes a la entrega; cada caso será analizado individualmente.",
      },
    ],
  },
  {
    heading: "Productos no sujetos a devolución",
    blocks: [
      {
        type: "list",
        items: [
          "Productos cosméticos o de cuidado personal abiertos, usados o sin sellos de seguridad.",
          "Productos cosméticos o de cuidado facial que presenten reacción por sensibilidad individual del cliente, no imputable a un defecto del producto.",
          'Productos en promoción o liquidados marcados como "sin cambio".',
          "Muestras u obsequios.",
          "Kits incompletos o manipulados.",
        ],
      },
      {
        type: "p",
        text: "En todos los casos anteriores, la garantía legal por calidad o idoneidad del producto se mantiene vigente conforme a la ley colombiana.",
      },
    ],
  },
  {
    heading: "Protección de datos y validación de identidad",
    blocks: [
      {
        type: "p",
        text: "Pharma Dream podrá solicitar verificación de identidad o documentación adicional para validar la compra y proteger al consumidor frente a posibles fraudes. El tratamiento de los datos personales se realiza conforme a nuestra Política de Privacidad, en cumplimiento de la Ley 1581 de 2012 sobre Protección de Datos Personales.",
      },
    ],
  },
  {
    heading: "Vigencia y modificaciones",
    blocks: [
      {
        type: "p",
        text: "Pharma Dream se acoge y da cumplimiento a la Ley 1480 de 2011 – Estatuto del Consumidor de la República de Colombia.",
      },
      {
        type: "p",
        text: "Nos reservamos el derecho de actualizar esta política en cualquier momento, respetando los derechos adquiridos por nuestros clientes.",
      },
    ],
  },
];

export default function DevolucionesPage() {
  return (
    <LegalPage
      eyebrow="Pharma Dream"
      title="Política de Devoluciones y Reembolsos"
      sections={sections}
      contact={contact}
    />
  );
}
