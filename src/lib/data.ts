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
  /* Campos gestionables desde el panel admin */
  published?: boolean; // visible en la tienda
  image?: string; // imagen subida (dataURL o URL); si no hay, se usa el "studio card"
  stock?: number;
};

export const CATEGORY_NAMES = ["Cremas", "Sérums", "Kits"] as const;
export const TONE_NAMES = ["forest", "olive", "sage", "gold", "sand"] as const;

export const PRODUCTS: Product[] = [
  {
    id: "crema-hidratante-facial",
    name: "Crema Hidratante Facial",
    tagline:
      "Nutre, calma y revitaliza. Enriquecida con aceite de HEMP para todo tipo de piel.",
    price: 77900,
    category: "Cremas",
    tone: "sand",
    label: "CREMA",
    sub: "Hidratante Facial",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "contorno-de-ojos",
    name: "Contorno de Ojos",
    tagline: "Estimula la circulación y reduce signos de fatiga. Con elastina y karité.",
    price: 75000,
    category: "Cremas",
    tone: "olive",
    label: "CONTORNO",
    sub: "de Ojos",
    rating: 4.8,
    reviews: 86,
  },
  {
    id: "botox-vegetal",
    name: "Bótox Vegetal · Efecto Tensor",
    tagline:
      "Suavidad y firmeza al instante gracias a extractos de uva, hamamelis y vitamina E.",
    price: 98000,
    compareAt: 115000,
    category: "Cremas",
    tone: "forest",
    label: "BÓTOX",
    sub: "Vegetal",
    rating: 5.0,
    reviews: 64,
  },
  {
    id: "serum-hidratante",
    name: "Sérum Hidratante",
    tagline: "Hidratación profunda de absorción rápida con ácido hialurónico y HEMP.",
    price: 60000,
    category: "Sérums",
    tone: "sage",
    label: "SÉRUM",
    sub: "Hidratante",
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "serum-colageno",
    name: "Sérum Colágeno",
    tagline: "Reafirma y mejora la elasticidad visible de la piel con uso continuo.",
    price: 68000,
    category: "Sérums",
    tone: "gold",
    label: "COLÁGENO",
    sub: "Sérum Reafirmante",
    rating: 4.8,
    reviews: 73,
  },
  {
    id: "agua-micelar",
    name: "Agua Micelar",
    tagline: "Limpia, desmaquilla y equilibra sin resecar. Ideal para piel sensible.",
    price: 52000,
    category: "Cremas",
    tone: "olive",
    label: "AGUA",
    sub: "Micelar",
    rating: 4.7,
    reviews: 95,
  },
];

export const KITS: Product[] = [
  {
    id: "kit-glow-mananero",
    name: "Kit Glow Mañanero",
    tagline: "Cuidado facial diario: agua micelar, contorno, crema y protector.",
    price: 233750,
    compareAt: 275750,
    category: "Kits",
    tone: "sand",
    label: "KIT GLOW",
    sub: "Mañanero",
    rating: 5.0,
    reviews: 41,
  },
  {
    id: "kit-colageno-elastina",
    name: "Kit Colágeno y Elastina",
    tagline: "Reafirma, nutre y revitaliza con sérums de colágeno y elastina.",
    price: 125000,
    compareAt: 160000,
    category: "Kits",
    tone: "gold",
    label: "KIT COLÁGENO",
    sub: "& Elastina",
    rating: 4.9,
    reviews: 58,
  },
  {
    id: "kit-noche-renovadora",
    name: "Kit Noche Renovadora",
    tagline: "Reparación y nutrición nocturna con agua micelar, crema y sérum.",
    price: 176800,
    compareAt: 208000,
    category: "Kits",
    tone: "forest",
    label: "KIT NOCHE",
    sub: "Renovadora",
    rating: 4.9,
    reviews: 37,
  },
  {
    id: "kit-antiedad",
    name: "Kit Antiedad",
    tagline: "Reafirmante y regenerador con bótox vegetal, crema y colágeno.",
    price: 233759,
    compareAt: 275000,
    category: "Kits",
    tone: "olive",
    label: "KIT ANTIEDAD",
    sub: "Reafirmante",
    rating: 5.0,
    reviews: 29,
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
    image: UNSPLASH("1556228720-195a672e8a03", 800),
    count: 8,
  },
  {
    name: "Sérums",
    description: "Activos concentrados de absorción rápida.",
    tone: "gold",
    image: UNSPLASH("1620916566398-39f1143ab7be", 800),
    count: 6,
  },
  {
    name: "Kits",
    description: "Rutinas completas con descuento por tiempo limitado.",
    tone: "forest",
    image: UNSPLASH("1612817288484-6f916006741a", 800),
    count: 5,
  },
];

export type Ingredient = {
  name: string;
  benefit: string;
};

export const INGREDIENTS: Ingredient[] = [
  { name: "Aceite de HEMP", benefit: "Calma, nutre y refuerza la barrera cutánea." },
  { name: "Ácido Hialurónico", benefit: "Hidratación profunda y efecto relleno." },
  { name: "Hamamelis", benefit: "Astringente natural que tonifica y afina el poro." },
  { name: "Vitamina E", benefit: "Antioxidante que protege del estrés ambiental." },
  { name: "Manteca de Karité", benefit: "Repara y devuelve elasticidad a la piel." },
  { name: "Aloe Vera", benefit: "Refresca y acelera la regeneración cutánea." },
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
