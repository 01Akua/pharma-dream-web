import { withBasePath } from "./paths";

const dateFmt = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatBlogDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return dateFmt.format(new Date(year, month - 1, day));
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  image: string;
  date: string;
  author: string;
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "guia-completa-para-aplicar-cremas-cosmeticas-naturales",
    title: "Guía Completa para Aplicar Cremas Cosméticas Naturales",
    excerpt:
      "El cuidado de la piel no es solo una cuestión de belleza, sino de salud. Aplicar correctamente una crema cosmética de lujo potencia sus beneficios.",
    tag: "Rutina",
    image: withBasePath("/images/blog/guia-cremas.webp"),
    date: "2025-09-22",
    author: "Jhon Sanabria",
    body: [
      {
        type: "p",
        text: "El cuidado de la piel no es solo una cuestión de belleza, sino de salud. Aplicar correctamente una crema cosmética de lujo potencia sus beneficios y maximiza la absorción de los principios activos. En Pharma Dream, nuestras formulaciones con HEMP y extractos naturales están diseñadas para nutrir, hidratar y regenerar la piel en profundidad. Te enseñamos cómo aplicarlas de manera eficaz.",
      },
      { type: "h2", text: "Paso 1: Limpieza Profunda" },
      {
        type: "p",
        text: "Antes de aplicar cualquier crema, es fundamental limpiar bien el rostro. Utiliza un agua micelar o un limpiador suave que elimine impurezas y prepare la piel para recibir los activos de la crema.",
      },
      { type: "h2", text: "Paso 2: Aplicación de Tónico o Sérum" },
      {
        type: "p",
        text: "Para potenciar la absorción, aplica un tónico hidratante o un sérum según las necesidades de tu piel. En Pharma Dream contamos con sérums hidratantes, renovadores e iluminadores que complementan la acción de las cremas.",
      },
      { type: "h2", text: "Paso 3: Uso de la Crema Cosmética" },
      {
        type: "p",
        text: "Toma una pequeña cantidad de crema y caliéntala entre los dedos. Distribúyela en puntos clave: frente, mejillas, nariz y mentón. Luego, masajea con movimientos ascendentes y circulares para estimular la microcirculación y mejorar la absorción de los ingredientes activos.",
      },
      { type: "h2", text: "Paso 4: No Olvides el Cuello y Escote" },
      {
        type: "p",
        text: "El cuidado no debe limitarse al rostro. Aplica también en cuello y escote con movimientos suaves hacia arriba. Estas áreas son propensas a la pérdida de firmeza y necesitan hidratación constante.",
      },
      { type: "h2", text: "Paso 5: Protección Solar Durante el Día" },
      {
        type: "p",
        text: "Si aplicas la crema por la mañana, finaliza con un protector solar. El HEMP y otros extractos naturales ayudan a proteger la piel, pero es esencial reforzarla con un filtro solar para prevenir el fotoenvejecimiento.",
      },
      { type: "h2", text: "Beneficios de Aplicar Correctamente una Crema de Lujo" },
      {
        type: "ul",
        items: [
          "Absorción óptima: una correcta aplicación asegura que los activos penetren en profundidad.",
          "Estimulación de la circulación: el masaje facial favorece la regeneración celular.",
          "Mejor rendimiento del producto: al aplicar la cantidad adecuada, evitas desperdicio y maximizas beneficios.",
        ],
      },
      {
        type: "p",
        text: "En Pharma Dream, creemos en una cosmética basada en ciencia y naturaleza. Nuestras cremas, enriquecidas con HEMP y extractos naturales, están diseñadas para potenciar la salud de tu piel de manera efectiva y segura. ¡Descubre el poder de la aplicación correcta y transforma tu rutina de skincare!",
      },
    ],
  },
  {
    slug: "ingredientes-naturales-y-extraccion-fitomolecular",
    title:
      "Ingredientes Naturales y Extracción Fitomolecular: El Secreto Detrás de la Eficacia de Pharma Dream",
    excerpt:
      "Descubre cómo Pharma Dream aprovecha la biodiversidad colombiana y técnicas de extracción molecular para crear cosméticos naturales con HEMP.",
    tag: "Ciencia",
    image: withBasePath("/images/blog/fitomolecular.webp"),
    date: "2025-09-22",
    author: "Jhon Sanabria",
    body: [
      {
        type: "p",
        text: "En un mundo donde la cosmética convencional prioriza ingredientes sintéticos, Pharma Dream elige un camino distinto: rescatar la sabiduría de la naturaleza y potenciarla con ciencia. Nuestros productos no solo incluyen HEMP, sino una sinergia de extractos botánicos colombianos procesados con tecnología de vanguardia.",
      },
      { type: "h2", text: "Un paraíso de biodiversidad en tu rutina" },
      {
        type: "p",
        text: "Colombia es uno de los países más biodiversos del mundo, y en Pharma Dream convertimos esa riqueza en activos clave para tu piel.",
      },
      { type: "h3", text: "Ingredientes emblemáticos" },
      {
        type: "ul",
        items: [
          "Hamamelis (Agua Micelar): recolectado en los bosques andinos, actúa como astringente natural, cerrando poros y equilibrando el pH.",
          "Rosa Mosqueta (Crema de Ojos): cultivada en zonas altas, su aceite rico en vitamina C reduce ojeras y regenera tejidos delicados.",
          "Hibisco (Bótox Vegetal): proveniente de climas tropicales, sus flavonoides estimulan la producción de colágeno para un efecto lifting instantáneo.",
          "Caléndula (Protector Solar): sus propiedades antiinflamatorias protegen la piel del estrés ambiental.",
        ],
      },
      { type: "h2", text: "Extracción molecular: la ciencia que preserva lo natural" },
      { type: "h3", text: "1. Máxima pureza" },
      {
        type: "p",
        text: "Separamos los principios activos (como cannabinoides y antioxidantes) sin degradarlos. El HEMP del Sérum Hidratante conserva un 99% de su potencia antioxidante.",
      },
      { type: "h3", text: "2. Cero químicos agresivos" },
      {
        type: "p",
        text: "Evitamos solventes como el hexano, usando métodos basados en agua y presión controlada.",
      },
      { type: "h3", text: "3. Sinergia de ingredientes" },
      {
        type: "p",
        text: "Combinamos extractos para potenciar sus efectos. En la crema corporal, el HEMP y el escualeno trabajan juntos para retener humedad y reparar la barrera cutánea.",
      },
      { type: "h2", text: "¿Cómo benefician estos ingredientes a tu piel?" },
      { type: "h3", text: "Pieles sensibles o con acné" },
      {
        type: "ul",
        items: [
          "Aloe vera + HEMP (Crema Facial): reducen rojeces y regulan el sebo sin obstruir poros.",
          "Avena sativa (Sérum Renovador): calma irritaciones y exfolia suavemente gracias al ácido láctico.",
        ],
      },
      { type: "h3", text: "Antiaging natural" },
      {
        type: "ul",
        items: [
          "Argán + coenzima Q10 (Sérum Revitalizante): nutren en profundidad y combaten los radicales libres.",
          "Colágeno vegetal (Bótox Vegetal): mejora la firmeza con más elasticidad desde la primera aplicación.",
        ],
      },
      { type: "h3", text: "Hidratación profunda" },
      {
        type: "ul",
        items: [
          "Manteca de karité + escualeno (Crema Corporal): penetran hasta las capas más profundas, ideal para pieles secas.",
        ],
      },
      { type: "h2", text: "Preguntas frecuentes" },
      {
        type: "p",
        text: "¿Por qué usar extractos naturales en lugar de sintéticos? Los ingredientes sintéticos (como parabenos o fragancias artificiales) pueden irritar la piel a largo plazo. Las fórmulas naturales son biocompatibles: tu piel las reconoce y absorbe mejor.",
      },
      {
        type: "p",
        text: "¿La extracción molecular hace los productos más caros? Se invierte en tecnología para ofrecer concentraciones óptimas de activos. Un frasco de Sérum Iluminador dura hasta 3 meses con solo 3 gotas diarias.",
      },
      {
        type: "p",
        text: "¿Son aptos para veganos? Sí. Todos los productos son 100% veganos y cruelty-free.",
      },
      {
        type: "p",
        text: "En Pharma Dream creemos que la belleza no debe comprometer la salud ni el planeta. Cada ingrediente es una celebración de la biodiversidad colombiana, y cada técnica, un tributo a la ciencia.",
      },
    ],
  },
  {
    slug: "la-sinergia-de-la-naturaleza-y-la-ciencia",
    title:
      "La Sinergia de la Naturaleza y la Ciencia: Así Funcionan los Ingredientes Clave de Pharma Dream",
    excerpt:
      "Descubre cómo los extractos botánicos, el HEMP y la tecnología de extracción molecular trabajan juntos en los productos de Pharma Dream.",
    tag: "Ciencia",
    image: withBasePath("/images/blog/sinergia.webp"),
    date: "2025-09-22",
    author: "Jhon Sanabria",
    body: [
      {
        type: "p",
        text: "En Pharma Dream, cada producto es el resultado de una alianza perfecta entre la biodiversidad colombiana y la innovación científica. Pero ¿qué hace que ingredientes como el hamamelis, el HEMP o el hibisco sean tan efectivos? Exploramos la bioquímica de estos componentes, su proceso de extracción y cómo se combinan para transformar tu piel.",
      },
      { type: "h2", text: "1. HEMP: el multifuncional de la cosmética natural" },
      {
        type: "p",
        text: "¿Cómo actúa? El HEMP interactúa con el sistema endocannabinoide cutáneo, regulando procesos como la producción de sebo, la inflamación y la hidratación.",
      },
      {
        type: "ul",
        items: [
          "Agua Micelar con HEMP: combina HEMP con hamamelis para limpiar sin resecar.",
          "Crema Facial con HEMP: mezcla HEMP con aloe vera y caléndula para equilibrar pieles mixtas.",
          "Bótox Vegetal: potencia el HEMP con hibisco, logrando un efecto tensor inmediato.",
        ],
      },
      {
        type: "quote",
        text: "El HEMP actúa como transportador molecular, mejorando la absorción de otros activos en la piel.",
      },
      { type: "h2", text: "2. Hamamelis: el astringente natural" },
      {
        type: "p",
        text: "Rico en taninos, el hamamelis contrae los poros, reduce la inflamación y equilibra el pH cutáneo. Nuestro hamamelis se recolecta en los Andes colombianos, donde las bajas temperaturas aumentan su concentración de antioxidantes.",
      },
      { type: "h2", text: "3. Hibisco: el lifting natural" },
      {
        type: "p",
        text: "Contiene ácido cítrico y mucílagos que exfolian y estimulan la producción de colágeno, reduciendo la flacidez. El hibisco tiene un 15% más de flavonoides que el té verde, potenciando su efecto antioxidante.",
      },
      { type: "h2", text: "4. Escualeno: la hidratación inteligente" },
      {
        type: "p",
        text: "Emoliente vegetal que imita los lípidos naturales de la piel, sellando la humedad sin obstruir poros. Usamos escualeno derivado de caña de azúcar, no de hígado de tiburón, garantizando sostenibilidad.",
      },
      { type: "h2", text: "5. Extracción molecular" },
      {
        type: "ul",
        items: [
          "Selección de plantas: ingredientes cosechados en su punto máximo de madurez.",
          "Aislamiento de activos: separamos compuestos clave (ej. cannabinoides del HEMP) sin usar solventes tóxicos.",
          "Formulación sinérgica: combinamos extractos para potenciar sus efectos (ej. HEMP + hamamelis en el Agua Micelar).",
        ],
      },
      {
        type: "quote",
        text: "Productos con un 95% de ingredientes activos biodisponibles, frente al 60% de métodos tradicionales.",
      },
      { type: "h2", text: "Preguntas frecuentes" },
      {
        type: "p",
        text: "¿Por qué no usan fragancias artificiales? Los aceites esenciales (como el geranio en la Crema Facial) aportan aroma sin irritar.",
      },
      {
        type: "p",
        text: "¿El colágeno vegano es igual de efectivo que el animal? Sí. Nuestro colágeno se deriva de plantas fermentadas y tiene una estructura molecular similar al humano.",
      },
      {
        type: "p",
        text: "En Pharma Dream no creemos en ingredientes «estrella» aislados. Creemos en sinergias científicas: HEMP que potencia, hamamelis que equilibra y tecnología que respeta la esencia de cada planta.",
      },
    ],
  },
  {
    slug: "beneficios-del-cbd-y-otros-cannabinoides",
    title:
      "Beneficios del CBD y Otros Cannabinoides en la Salud y el Cuidado de la Piel",
    excerpt:
      "El cannabidiol (CBD) y otros cannabinoides han emergido como compuestos prometedores en la medicina, la dermatología y el bienestar general.",
    tag: "Ingredientes",
    image: withBasePath("/images/blog/cbd-beneficios.webp"),
    date: "2025-09-22",
    author: "Jhon Sanabria",
    body: [
      {
        type: "p",
        text: "El cannabidiol (CBD) y otros cannabinoides han emergido como compuestos prometedores en la medicina, la dermatología y el bienestar general. A diferencia del THC, el CBD no es psicoactivo y sus propiedades terapéuticas están respaldadas por estudios preclínicos y clínicos.",
      },
      { type: "h2", text: "1. El sistema endocannabinoide (SEC): la base biológica" },
      {
        type: "p",
        text: "El cuerpo humano posee un sistema endocannabinoide, compuesto por receptores (CB1 y CB2), endocannabinoides y enzimas. Este sistema regula funciones como el dolor, la inflamación, el sueño, el apetito y la homeostasis cutánea.",
      },
      {
        type: "quote",
        text: "El CBD actúa como modulador alostérico de los receptores CB1/CB2, explicando sus efectos antiinflamatorios y analgésicos.",
        cite: "Pertwee, R. G. (2008), British Journal of Pharmacology",
      },
      { type: "h2", text: "2. Beneficios del CBD validados por la ciencia" },
      { type: "h3", text: "A. Propiedades antiinflamatorias y analgésicas" },
      {
        type: "p",
        text: "El CBD reduce la inflamación al inhibir la producción de citoquinas proinflamatorias (como TNF-α e IL-6) y activar receptores vaniloides (TRPV1), asociados a la percepción del dolor.",
      },
      { type: "h3", text: "B. Efectos antioxidantes y antienvejecimiento" },
      {
        type: "p",
        text: "El CBD neutraliza los radicales libres (ROS), previniendo el daño oxidativo que acelera el envejecimiento cutáneo. Además, estimula la síntesis de colágeno y elastina.",
      },
      { type: "h3", text: "C. Regulación del sebo y acné" },
      {
        type: "p",
        text: "El CBD inhibe la lipogénesis en las glándulas sebáceas, equilibrando la producción de sebo y reduciendo brotes acneicos.",
      },
      { type: "h3", text: "D. Ansiedad y sueño" },
      {
        type: "p",
        text: "El CBD modula la actividad de receptores de serotonina (5-HT1A) y GABA, reduciendo la ansiedad y mejorando la calidad del sueño.",
      },
      { type: "h2", text: "3. Otros cannabinoides relevantes" },
      {
        type: "p",
        text: "Cannabigerol (CBG): antibacteriano, neuroprotector y estimulante del crecimiento capilar. Cannabinol (CBN): sedante suave y promotor de la cicatrización ósea.",
      },
      { type: "h2", text: "4. Aplicaciones en Pharma Dream" },
      {
        type: "p",
        text: "Pharma Dream utiliza métodos de extracción avanzados (extracción fitomolecular) para aislar cannabinoides y fitonutrientes sin degradarlos: alta biodisponibilidad (el CBD del Sérum Revitalizante penetra hasta la dermis) y sinergia botánica con hamamelis, caléndula y aloe vera.",
      },
      {
        type: "ul",
        items: [
          "Agua Micelar con CBD: limpieza antiinflamatoria y regulación del pH.",
          "Crema Facial con CBD: control del sebo y prevención de poros obstruidos.",
          "Protector Solar SPF50 con CBD: protección UV + reparación antioxidante.",
        ],
      },
      { type: "h2", text: "Preguntas frecuentes" },
      {
        type: "p",
        text: "¿El CBD es adictivo? No. La OMS no clasifica al CBD como sustancia adictiva. ¿Puedo usar productos con CBD junto a medicamentos? Consulta a tu médico, el CBD puede interactuar con enzimas hepáticas. ¿Los productos de Pharma Dream contienen THC? No, cumplen con el límite legal de menos de 0.3% THC, sin efectos psicoactivos.",
      },
      {
        type: "p",
        text: "El CBD y otros cannabinoides representan una frontera innovadora en el cuidado de la salud y la piel, respaldada por evidencia científica rigurosa. La combinación de biodiversidad colombiana y tecnología de vanguardia ofrece productos que cuidan y transforman.",
      },
    ],
  },
  {
    slug: "7-curiosidades-sobre-el-cbd",
    title:
      "7 Curiosidades sobre el CBD y los Secretos Naturales que Pharma Dream Lleva a tu Piel",
    excerpt:
      "¿Sabías que el CBD y plantas como el hibisco tienen historias milenarias? Descubre datos fascinantes y cómo Pharma Dream los combina en cosméticos.",
    tag: "Ingredientes",
    image: withBasePath("/images/blog/curiosidades.webp"),
    date: "2025-09-22",
    author: "Jhon Sanabria",
    body: [
      {
        type: "p",
        text: "El CBD y los extractos botánicos no son solo ingredientes de moda: son aliados con raíces históricas y ciencia de vanguardia. En Pharma Dream, rescatamos secretos de la naturaleza y los potenciamos con tecnología molecular. Aquí, 7 curiosidades que te harán mirar tu rutina skincare con otros ojos.",
      },
      { type: "h2", text: "1. El CBD y la piel: una conversación molecular" },
      {
        type: "p",
        text: "Tu piel tiene receptores cannabinoides (CB2) que interactúan directamente con el CBD, regulando inflamación y producción de sebo. Nuestra técnica de extracción molecular asegura que el CBD llegue intacto a las capas profundas de la dermis.",
      },
      { type: "h2", text: "2. Hamamelis: el «agua mágica» de los nativos americanos" },
      {
        type: "p",
        text: "Los nativos americanos usaban hamamelis para tratar heridas y reducir hinchazones. Hoy, la ciencia confirma sus propiedades astringentes y antiinflamatorias. El Agua Micelar con CBD combina hamamelis andino con agua de rosas.",
      },
      { type: "h2", text: "3. Hibisco: la flor egipcia que tensa la piel" },
      {
        type: "p",
        text: "Cleopatra usaba hibisco en sus baños de belleza por su capacidad para tonificar la piel. Contiene ácidos orgánicos que estimulan el colágeno. El Bótox Vegetal incluye extracto de hibisco para un efecto tensor inmediato.",
      },
      { type: "h2", text: "4. CBD vs. radicales libres: un escudo invisible" },
      {
        type: "p",
        text: "El CBD es un antioxidante notablemente más potente que las vitaminas C y E. El Protector Solar SPF50 no solo bloquea rayos UV: su CBD repara el daño solar desde dentro.",
      },
      { type: "h2", text: "5. Aloe vera: la planta que sobrevive al desierto" },
      {
        type: "p",
        text: "El aloe vera almacena agua en sus hojas para sobrevivir en climas áridos. Esa misma capacidad hidratante la llevamos al Sérum Renovador. Nuestro aloe se cultiva en Colombia bajo técnicas sostenibles.",
      },
      { type: "h2", text: "6. La rosa mosqueta: el secreto de las abuelas para las ojeras" },
      {
        type: "p",
        text: "En la Patagonia, las comunidades mapuches usaban rosa mosqueta para cicatrizar heridas. Su aceite es rico en vitamina A, clave para regenerar piel delicada. La Crema de Ojos con CBD une rosa mosqueta y aloe vera.",
      },
      { type: "h2", text: "7. ¿Por qué el CBD funciona mejor con otros ingredientes?" },
      {
        type: "p",
        text: "El CBD es un ingrediente sinérgico: potencia la absorción de otros activos. En la Crema Corporal con CBD, el escualeno sella la hidratación mientras el CBD calma irritaciones.",
      },
      {
        type: "p",
        text: "En Pharma Dream, cada producto es un puente entre el pasado y el futuro. Rescatamos sabiduría ancestral, la validamos con ciencia y la envasamos en fórmulas que respetan tu piel y el planeta.",
      },
    ],
  },
  {
    slug: "biodiversidad-colombiana-y-tecnologia",
    title:
      "Biodiversidad Colombiana y Tecnología: El Corazón de los Productos Naturales de Pharma Dream",
    excerpt:
      "Descubre cómo Pharma Dream aprovecha la riqueza natural de Colombia y técnicas de vanguardia para crear cosméticos que respetan tu piel y el planeta.",
    tag: "Ciencia",
    image: withBasePath("/images/blog/biodiversidad.webp"),
    date: "2025-09-22",
    author: "Jhon Sanabria",
    body: [
      {
        type: "p",
        text: "Colombia es uno de los países más biodiversos del mundo, y en Pharma Dream convertimos esa riqueza en cosméticos que son pura ciencia y naturaleza. Desde los Andes hasta la Amazonía, cada ingrediente cuenta una historia.",
      },
      { type: "h2", text: "1. Colombia: un tesoro botánico en tu rutina" },
      { type: "h3", text: "Hamamelis de los Andes" },
      {
        type: "p",
        text: "Propiedades: astringente y antiinflamatorio. En Pharma Dream: base del Agua Micelar con CBD, ideal para limpiar sin resecar. Los indígenas Nasa lo usaban para tratar irritaciones cutáneas.",
      },
      { type: "h3", text: "Hibisco de climas tropicales" },
      {
        type: "p",
        text: "Propiedades: rico en flavonoides, estimula la producción de colágeno. En Pharma Dream: estrella del Bótox Vegetal, con efecto tensor instantáneo.",
      },
      { type: "h3", text: "Aloe vera del Valle del Cauca" },
      {
        type: "p",
        text: "Propiedades: hidratante y regenerador. En Pharma Dream: protagonista del Sérum Renovador, calmando pieles sensibles.",
      },
      { type: "h2", text: "2. Extracción molecular" },
      {
        type: "ul",
        items: [
          "Pureza del 99%: el CBD en la Crema Facial mantiene sus antioxidantes intactos.",
          "Cero químicos agresivos: se utiliza agua y presión controlada, no solventes tóxicos.",
          "Sinergia perfecta: se combinan ingredientes como CBD con escualeno para hidratación profunda y reparación.",
        ],
      },
      {
        type: "p",
        text: "Ejemplo práctico: el extracto de caléndula en el Protector Solar SPF50 se obtiene sin calor, preservando sus antiinflamatorios naturales.",
      },
      { type: "h2", text: "3. Productos que hablan por Colombia" },
      {
        type: "ul",
        items: [
          "Crema de Ojos con CBD y Rosa Mosqueta: reduce ojeras y nutre piel delicada.",
          "Sérum Hidratante con Aceite de Macadamia: penetra en capas profundas, imitando la hidratación de la selva húmeda.",
          "Protector Solar SPF50 con CBD: bloquea rayos UV mientras el CBD repara el ADN celular.",
        ],
      },
      { type: "h2", text: "Preguntas frecuentes" },
      {
        type: "p",
        text: "¿Por qué usar ingredientes colombianos? Nuestra biodiversidad ofrece plantas únicas con adaptaciones extraordinarias que la ciencia potencia. ¿La extracción molecular encarece los productos? Se invierte en tecnología para que un frasco de Sérum Revitalizante rinda 3 meses. ¿Son aptos para veganos? Sí, el colágeno es vegano (derivado de fermentación microbiana) y no se testea en animales.",
      },
      {
        type: "p",
        text: "En Pharma Dream, la belleza es un acto de amor por Colombia: rescatamos sus plantas, innovamos con ciencia y honramos a quienes las cultivan.",
      },
    ],
  },
  {
    slug: "por-que-el-cbd-es-el-ingrediente-revolucionario",
    title:
      "¿Por Qué el CBD es el Ingrediente Revolucionario que Tu Piel Necesita? (Sin Tabúes, Solo Ciencia)",
    excerpt:
      "¿Cannabis en tu crema? Sí, y es lo mejor que le puede pasar a tu piel. Descubre cómo el CBD rompe mitos, combate el acné y el envejecimiento.",
    tag: "Ingredientes",
    image: withBasePath("/images/blog/cbd-revolucionario.webp"),
    date: "2025-09-22",
    author: "Jhon Sanabria",
    body: [
      {
        type: "p",
        text: "¿Cannabis en tu crema? Sí, y es lo mejor que le puede pasar a tu piel. Descubre cómo el CBD rompe mitos, combate el acné, el envejecimiento y el estrés cutáneo.",
      },
      { type: "h2", text: "1. ¿CBD en skincare? No, no estás leyendo mal" },
      {
        type: "p",
        text: "¿Esto me va a drogar? No. El CBD (cannabidiol) es un compuesto del cáñamo con 0% de efectos psicoactivos. Usamos CBD de grado cosmético, legal y seguro. El cáñamo industrial es primo lejano de la marihuana: misma familia, efectos totalmente distintos.",
      },
      { type: "h2", text: "2. Tu piel tiene un sistema de autodefensa (y el CBD lo activa)" },
      {
        type: "p",
        text: "Tu piel tiene receptores cannabinoides (CB2) que regulan inflamación, producción de sebo y regeneración celular. Con el tiempo, el estrés, la contaminación y los rayos UV los «agotan». La Crema Facial con CBD reactiva esos receptores; el Sérum Revitalizante (CBD + Coenzima Q10) repara el daño celular.",
      },
      { type: "h2", text: "3. CBD vs. acné: el enemigo silencioso" },
      {
        type: "p",
        text: "El acné no es solo «grasa»: es inflamación, bacterias y poros obstruidos. El CBD ataca las 3 causas: antiinflamatorio (calma rojeces), antibacteriano (reduce el C. acnes sin resecar) y regulador de sebo.",
      },
      {
        type: "quote",
        text: "El CBD normaliza la producción de sebo en células humanas.",
        cite: "Oláh et al., 2014",
      },
      { type: "h2", text: "4. ¿CBD para arrugas? Sí, funciona (y no es magia)" },
      {
        type: "p",
        text: "El envejecimiento es inflamación crónica + estrés oxidativo. El CBD combate ambos: es antioxidante (neutraliza radicales libres) y estimula el colágeno. El Bótox Vegetal con hibisco y CBD tensa y rellena sin agujas. En un estudio, el CBD aumentó la síntesis de colágeno un 40% en pieles maduras tras 8 semanas.",
      },
      { type: "h2", text: "5. «Pero yo tengo la piel sensible…»" },
      {
        type: "p",
        text: "El CBD es no comedogénico y calmante. La Crema de Ojos con CBD (rosa mosqueta + aloe vera) reduce bolsas en pieles ultrasensibles. El Sérum Hidratante, sin alcohol ni fragancias, solo CBD + aceites nutritivos.",
      },
      { type: "h2", text: "6. Tabúes rotos" },
      {
        type: "ul",
        items: [
          "«Es ilegal» — Realidad: nuestro CBD cumple con la normativa colombiana (INVIMA) y global, con menos del 0.3% de THC.",
          "«Es solo para jóvenes» — Realidad: el Sérum Revitalizante es perfecto para pieles maduras que buscan regeneración profunda.",
          "«Es caro y no funciona» — Realidad: un frasco de Agua Micelar rinde 4 meses.",
        ],
      },
      { type: "h2", text: "7. La experiencia Pharma Dream" },
      {
        type: "ul",
        items: [
          "Prueba el Bótox Vegetal en una línea de expresión. En 10 minutos, verás cómo se difumina.",
          "Usa el Protector Solar SPF50 un mes. Notarás menos manchas y más luminosidad.",
          "Si tienes dudas, escríbenos. No vendemos humo: hablamos de ciencia, no de milagros.",
        ],
      },
      {
        type: "p",
        text: "El CBD no es una moda: es una revolución en el cuidado de la piel. En Pharma Dream lo mezclamos con la riqueza botánica de Colombia y tecnología de punta para ofrecerte resultados, no promesas.",
      },
    ],
  },
];

export const getBlogPost = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);

export const getRelatedPosts = (post: BlogPost, limit = 3): BlogPost[] =>
  BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, limit);
