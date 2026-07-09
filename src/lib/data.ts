/* ============================================================
   Datos del sitio Pharma Dream (demo de alta calidad)
   Precios y nombres basados en la tienda real.
   ============================================================ */

export const UNSPLASH = (id: string, w = 1000, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number;
  category: "Cremas" | "Sérums" | "Kits";
  /* tono del "studio card" para mantener estética de marca */
  tone: "forest" | "olive" | "sage" | "gold" | "sand";
  label: string; // texto grande del empaque
  sub: string; // subtítulo del empaque
  rating: number;
  reviews: number;
  description?: string; // descripción larga (ficha de producto)
  /* Campos gestionables desde el panel admin */
  published?: boolean; // visible en la tienda
  image?: string; // imagen subida (dataURL o URL); si no hay, se usa el "studio card"
  stock?: number;
};

export const CATEGORY_NAMES = ["Cremas", "Sérums", "Kits"] as const;
export const TONE_NAMES = ["forest", "olive", "sage", "gold", "sand"] as const;

const CDN = "https://cdn.shopify.com/s/files/1/0691/9399/0198/files/";

export const PRODUCTS: Product[] = [
  {
    id: "crema-hidratante-facial",
    name: "Crema Hidratante Facial",
    tagline:
      "Hidratación profunda y equilibrio con extractos naturales y aceite de HEMP. 50 ml.",
    description:
      "Crema Hidratante Facial con Extractos Naturales y Aceite de HEMP (50 ml), para una piel equilibrada y profundamente hidratada. Actúa restaurando los nutrientes esenciales de la piel y protegiéndola de agresiones externas. Su fórmula penetra en las tres primeras capas de la piel, activando la circulación y ayudando a eliminar células muertas y toxinas. El aceite de HEMP regula la producción de sebo, forma una barrera que retiene la humedad y alivia irritaciones. Ideal para todo tipo de piel.",
    price: 77900,
    category: "Cremas",
    tone: "sand",
    label: "CREMA",
    sub: "Hidratante Facial",
    rating: 5,
    reviews: 0,
    image: CDN + "Hidratacion_profunda_para_una_piel_radiante_Nuestra_Crema_Hidratante_Facial_con_extractos_n.jpg?v=1757598636",
  },
  {
    id: "contorno-de-ojos",
    name: "Contorno De Ojos",
    tagline:
      "Reduce bolsas, ojeras y arrugas finas con extracto de sakura y aceite de HEMP.",
    description:
      "Contorno de Ojos con Extractos Naturales y HEMP: combina el poder rejuvenecedor del extracto de hoja de sakura con el aceite de HEMP para una hidratación profunda y duradera. Su fórmula ligera y de rápida absorción estimula la producción de colágeno, devolviendo elasticidad y firmeza, mientras combate bolsas, ojeras y arrugas finas. Con manteca de karité, calma y refresca el contorno de ojos y labios. Ideal para uso diario.",
    price: 75000,
    category: "Cremas",
    tone: "olive",
    label: "CONTORNO",
    sub: "de Ojos",
    rating: 5,
    reviews: 0,
    image: CDN + "Revitaliza_tu_mirada_con_el_poder_del_HEMP_y_el_Sakura_Despidete_de_las_ojeras_bolsas_y_line.jpg?v=1757599088",
  },
  {
    id: "botox-vegetal-efecto-tensor",
    name: "Bótox Vegetal Efecto Tensor",
    tagline:
      "Lifting inmediato y duradero con extractos botánicos y aceite de HEMP.",
    description:
      "Bótox Vegetal Efecto Tensor: crema avanzada para un lifting inmediato y duradero. Combina extractos botánicos y aceite de HEMP para estimular el metabolismo celular, hidratar en profundidad y aportar firmeza, dejando la piel tersa, suave y tonificada. Las líneas de expresión y arrugas se reducen visiblemente gracias a su acción alisadora, reparadora y regeneradora.",
    price: 90000,
    category: "Cremas",
    tone: "forest",
    label: "BÓTOX",
    sub: "Vegetal",
    rating: 5,
    reviews: 0,
    image: CDN + "BOTOX_VEGETAL_EFECTO_TENSOR_Transforma_tu_piel_con_nuestra_innovadora_crema_nutritiva_con_e.jpg?v=1757352902",
  },
  {
    id: "protector-solar-natural-spf-50",
    name: "Protector Solar Natural SPF 50",
    tagline:
      "Alta protección UVB, UVA e IR con filtros naturales, HEMP y vitamina E.",
    description:
      "Protector Solar SPF 50 de alta protección que combina filtros solares naturales (dióxido de titanio y óxido de zinc) con aceite de HEMP. Ofrece una barrera efectiva contra los rayos UVB, UVA e infrarrojos (IR). Enriquecido con vitamina E, protege de quemaduras solares y previene el envejecimiento prematuro. Fórmula ligera y segura, ideal para todo tipo de pieles, incluidas las sensibles.",
    price: 87000,
    compareAt: 100000,
    category: "Cremas",
    tone: "gold",
    label: "SPF 50",
    sub: "Protector Solar",
    rating: 5,
    reviews: 0,
    image: CDN + "protector_solar.jpg?v=1757600445",
  },
  {
    id: "agua-micelar-con-extractos-naturales",
    name: "Agua Micelar con Extractos Naturales",
    tagline:
      "Limpieza profunda y suave sin aclarado. Sin perfume ni parabenos.",
    description:
      "Agua Micelar con Extractos Naturales: solución de limpieza avanzada que combina la suavidad del agua micelar con aceite de cáñamo, agua de rosas y azahares. Su fórmula sin perfume ni parabenos elimina impurezas, maquillaje (incluso resistente al agua) y residuos sin irritar la piel. No necesita aclarado, dejando la piel limpia, hidratada y tonificada. Apta para todo tipo de pieles, ideal para las sensibles.",
    price: 48000,
    category: "Cremas",
    tone: "olive",
    label: "AGUA",
    sub: "Micelar",
    rating: 5,
    reviews: 0,
    image: CDN + "Agua_Micelar_con_Extractos_Naturales_es_tu_nueva_aliada_diaria._Con_aceite_de_HEMP_agua_de_2.jpg?v=1759978684",
  },
  {
    id: "serum-revitalizante-facial",
    name: "Sérum Revitalizante Facial",
    tagline:
      "Combate los signos de la edad con HEMP, ácido hialurónico y colágeno.",
    description:
      "Sérum Revitalizante Facial: fórmula avanzada para combatir los signos del envejecimiento y devolver vitalidad a la piel. Con aceite de HEMP, ácido hialurónico y colágeno, reduce la inflamación, minimiza manchas y arrugas y promueve la renovación celular. Textura ligera y de rápida absorción, ideal para todo tipo de pieles, incluidas grasas, mixtas, secas, sensibles o con tendencia al acné.",
    price: 98000,
    category: "Sérums",
    tone: "sage",
    label: "SÉRUM",
    sub: "Revitalizante",
    rating: 5,
    reviews: 0,
    image: CDN + "Vitalidad_y_juventud_para_tu_piel_El_Serum_Revitalizante_Facial_de_Pharma_Dream_es_la_clave_p.jpg?v=1757600598",
  },
  {
    id: "serum-renovador-facial",
    name: "Sérum Renovador Facial",
    tagline:
      "Renovación celular para piel grasa, mixta o con tendencia acneica.",
    description:
      "Sérum Renovador Facial: fórmula avanzada que combina aceites naturales, vitaminas y extractos botánicos para pieles grasas, mixtas o con tendencia al acné. Con aceite de HEMP que regula el sebo y calma la piel, junto con retinol (retinyl palmitate) y ácido láctico que promueven la renovación celular y reducen la apariencia de poros abiertos. Deja la piel suave, equilibrada y radiante.",
    price: 95000,
    category: "Sérums",
    tone: "forest",
    label: "SÉRUM",
    sub: "Renovador",
    rating: 5,
    reviews: 0,
    image: CDN + "Renueva_y_equilibra_tu_piel_El_Serum_Renovador_Facial_de_Pharma_Dream_esta_disenado_para_pi.jpg?v=1757600845",
  },
  {
    id: "serum-iluminador-facial",
    name: "Sérum Iluminador Facial",
    tagline:
      "Unifica el tono y devuelve luminosidad con HEMP, retinol y ácido láctico.",
    description:
      "Sérum Iluminador Facial: combina extractos naturales, vitaminas y aceites esenciales para devolver la luminosidad a la piel. Con aceite de HEMP, retinol (retinyl palmitate) y ácido láctico, unifica el tono, reduce la pigmentación y suaviza irregularidades, dejando la piel radiante y rejuvenecida. Textura ligera y de rápida absorción, apta para todo tipo de pieles.",
    price: 99500,
    category: "Sérums",
    tone: "gold",
    label: "SÉRUM",
    sub: "Iluminador",
    rating: 5,
    reviews: 0,
    image: CDN + "iluminadorf.jpg?v=1757601278",
  },
  {
    id: "serum-hidratante",
    name: "Sérum Hidratante",
    tagline:
      "Hidratación reparadora con jojoba, macadamia, vitamina E y aceite de HEMP.",
    description:
      "Sérum Hidratante con Extractos Naturales y Aceite de HEMP: fórmula rica en aceites nutritivos y extractos botánicos para una hidratación profunda y reparadora. Calma la piel, reduce la inflamación y fortalece la barrera cutánea. Con aceite de girasol, jojoba y macadamia que nutren, y vitamina E y escualeno que protegen y revitalizan. Ideal para pieles secas, apagadas, frágiles o con tendencia a irritarse.",
    price: 60000,
    category: "Sérums",
    tone: "sage",
    label: "SÉRUM",
    sub: "Hidratante",
    rating: 5,
    reviews: 0,
    image: CDN + "Hidratacionprofundaparatupiel_NuestroSerumHidratanteestadisenadopararevitalizary.jpg?v=1757601418",
  },
];

export const KITS: Product[] = [
  {
    id: "kit-colageno-y-elastina-reafirma-nutre-y-revitaliza",
    name: "Kit Colágeno y Elastina",
    tagline: "Reafirma, nutre y revitaliza. Colágeno + Elastina con HEMP.",
    description:
      "Kit Colágeno y Elastina, creado para fortalecer la matriz dérmica y recuperar elasticidad, firmeza y luminosidad. Formulado con activos de última generación y enriquecido con hemp (aceite de cáñamo). Beneficios: reafirmación visible, elasticidad revitalizada, estimulación natural del colágeno (vitamina C), renovación celular (retinol), hidratación equilibrada y protección antioxidante. Incluye Colágeno y Elastina en un ritual completo.",
    price: 160000,
    category: "Kits",
    tone: "gold",
    label: "KIT COLÁGENO",
    sub: "& Elastina",
    rating: 5,
    reviews: 0,
    image: CDN + "KITS2.png?v=1760026790",
  },
  {
    id: "kit-glow-mananero-cuidado-facial-diario",
    name: "Kit Glow Mañanero – Cuidado Facial Diario",
    tagline:
      "Rutina matutina: agua micelar, contorno, crema y protector SPF 50.",
    description:
      "Kit Glow Mañanero: tu rutina matutina completa para una piel radiante, hidratada y protegida en pocos pasos. Incluye Agua Micelar (limpia y prepara la piel), Contorno de Ojos (atenúa ojeras y aporta firmeza), Crema Hidratante (hidratación ligera y de rápida absorción) y Protector Solar SPF 50 (protege de los rayos UV y el envejecimiento prematuro).",
    price: 233750,
    compareAt: 275750,
    category: "Kits",
    tone: "sand",
    label: "KIT GLOW",
    sub: "Mañanero",
    rating: 5,
    reviews: 0,
    image: CDN + "KITS1.png?v=1759953997",
  },
  {
    id: "kit-noche-renovadora-reparacion-y-antiedad",
    name: "Kit Noche Renovadora – Reparación y Antiedad",
    tagline:
      "Limpieza, nutrición y regeneración nocturna con el poder del HEMP.",
    description:
      "Kit Noche Renovadora: cuidado profundo mientras duermes. Combina limpieza, nutrición y regeneración en una fórmula pensada para la noche, con el poder del hemp. Ideal para despertar con una piel más suave, luminosa y reparada. Incluye Agua Micelar, Crema Hidratante Facial y Sérum Renovador.",
    price: 176800,
    compareAt: 208000,
    category: "Kits",
    tone: "forest",
    label: "KIT NOCHE",
    sub: "Renovadora",
    rating: 5,
    reviews: 0,
    image: CDN + "KITS4.png?v=1759969333",
  },
  {
    id: "kit-antiedad-reafirmante-y-regenerador",
    name: "Kit Antiedad – Reafirmante y Regenerador",
    tagline: "Bótox vegetal, crema facial y kit colágeno y elastina.",
    description:
      "Kit Antiedad – Reafirmante y Regenerador: solución completa que combina la acción tensora del Bótox Vegetal, la nutrición de la crema facial y el poder del kit de colágeno y elastina, todo potenciado con hemp. Diseñado para reafirmar, regenerar y devolver juventud visible a tu piel.",
    price: 233759,
    compareAt: 275000,
    category: "Kits",
    tone: "olive",
    label: "KIT ANTIEDAD",
    sub: "Reafirmante",
    rating: 5,
    reviews: 0,
    image: CDN + "KITS3.png?v=1759956172",
  },
  {
    id: "kit-piel-saludable-nutricion-y-equilibrio-natural",
    name: "Kit Despigmentante – Iluminador y Uniformidad",
    tagline: "Combate manchas y unifica el tono. Agua micelar, crema y sérum.",
    description:
      "Kit Despigmentante – Iluminador y Uniformidad: formulado con ingredientes naturales y enriquecido con hemp. Una rutina específica para combatir manchas, unificar el tono y aportar luminosidad gradual y saludable. Incluye Agua Micelar, Crema Facial y Sérum Iluminador.",
    price: 181050,
    compareAt: 213000,
    category: "Kits",
    tone: "sage",
    label: "KIT DESPIGMENTANTE",
    sub: "Iluminador",
    rating: 5,
    reviews: 0,
    image: CDN + "KITS5_80857ae9-d335-4eec-9f5f-4f46da3428c4.png?v=1759978520",
  },
];

export const ALL_PRODUCTS: Product[] = [...PRODUCTS, ...KITS];

export const getProduct = (id: string): Product | undefined =>
  ALL_PRODUCTS.find((p) => p.id === id);

export const getRelated = (product: Product, limit = 4): Product[] =>
  ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  )
    .concat(ALL_PRODUCTS.filter((p) => p.category !== product.category))
    .slice(0, limit);

export type Category = {
  name: string;
  description: string;
  tone: Product["tone"];
  image: string;
  count: number;
};

export const CATEGORIES: Category[] = [
  {
    name: "Cremas",
    description: "Hidratación y reparación de la barrera cutánea.",
    tone: "sage",
    image: "/images/categorias/cremas.webp",
    count: 5,
  },
  {
    name: "Sérums",
    description: "Activos concentrados de absorción rápida.",
    tone: "gold",
    image: "/images/categorias/serums.webp",
    count: 4,
  },
  {
    name: "Kits",
    description: "Rutinas completas con descuento por tiempo limitado.",
    tone: "forest",
    image: "/images/categorias/kits.webp",
    count: 5,
  },
];

export type Ingredient = {
  name: string;
  benefit: string;
};

export const INGREDIENTS: Ingredient[] = [
  { name: "Aceite de HEMP", benefit: "Calma, regula el sebo y refuerza la barrera cutánea." },
  { name: "Ácido Hialurónico", benefit: "Hidratación profunda y efecto relleno." },
  { name: "Colágeno y Elastina", benefit: "Reafirman y devuelven elasticidad a la piel." },
  { name: "Retinol", benefit: "Renovación celular y textura más uniforme." },
  { name: "Vitamina E", benefit: "Antioxidante que protege del daño ambiental." },
  { name: "Manteca de Karité", benefit: "Nutre y suaviza en profundidad." },
];

export type Review = {
  name: string;
  city: string;
  text: string;
  product: string;
  avatar: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Valentina R.",
    city: "Bogotá",
    text: "Mi piel sensible por fin dejó de reaccionar. La crema hidratante es lo mejor que he probado, la textura es de lujo.",
    product: "Crema Hidratante Facial",
    avatar: UNSPLASH("1494790108377-be9c29b29330", 200),
  },
  {
    name: "Daniela M.",
    city: "Medellín",
    text: "El bótox vegetal hace un efecto tensor real desde la primera aplicación. Se siente firme sin resecar.",
    product: "Bótox Vegetal",
    avatar: UNSPLASH("1438761681033-6461ffad8d80", 200),
  },
  {
    name: "Carolina P.",
    city: "Cali",
    text: "Compré el Kit Noche Renovadora y mi rutina cambió por completo. Despierto con la piel descansada y luminosa.",
    product: "Kit Noche Renovadora",
    avatar: UNSPLASH("1534528741775-53994a69daeb", 200),
  },
];

export type Post = {
  title: string;
  excerpt: string;
  tag: string;
  image: string;
};

export const POSTS: Post[] = [
  {
    title: "Guía completa para aplicar cremas cosméticas naturales",
    excerpt:
      "Aplicar correctamente una crema de lujo potencia sus activos. Te mostramos el orden y la técnica ideal.",
    tag: "Rutina",
    image: UNSPLASH("1570172619644-dfd03ed5d881", 800),
  },
  {
    title: "Tecnología Fitomolecular: el secreto detrás de la eficacia",
    excerpt:
      "Cómo la biodiversidad colombiana y la extracción avanzada logran fórmulas con alta afinidad cutánea.",
    tag: "Ciencia",
    image: UNSPLASH("1518531933037-91b2f5f229cc", 800),
  },
  {
    title: "Beneficios del CBD y otros cannabinoides en el cuidado de la piel",
    excerpt:
      "Evidencia científica y aplicaciones reales del HEMP para piel sensible, reactiva y madura.",
    tag: "Ingredientes",
    image: UNSPLASH("1540555700478-4be289fbecef", 800),
  },
];

export const TONE_STYLES: Record<
  Product["tone"],
  { bg: string; text: string; sub: string }
> = {
  forest: {
    bg: "linear-gradient(150deg,#3e4a2e 0%,#2f3a23 60%,#222a18 100%)",
    text: "#d6bd7c",
    sub: "#e7e0cf",
  },
  olive: {
    bg: "linear-gradient(150deg,#6a7a48 0%,#5a6b3b 60%,#46552d 100%)",
    text: "#f4eedd",
    sub: "#e9e6d2",
  },
  sage: {
    bg: "linear-gradient(150deg,#a7b487 0%,#8a9a6b 60%,#74855a 100%)",
    text: "#2f3a23",
    sub: "#33401f",
  },
  gold: {
    bg: "linear-gradient(150deg,#d6bd7c 0%,#c2a14e 55%,#a9883a 100%)",
    text: "#2f3a23",
    sub: "#3a2f12",
  },
  sand: {
    bg: "linear-gradient(150deg,#efe6d6 0%,#e4d8c3 60%,#d6c6a8 100%)",
    text: "#5a6b3b",
    sub: "#5b5d4f",
  },
};
