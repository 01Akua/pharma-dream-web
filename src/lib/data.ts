/* ============================================================
   Datos del sitio Pharma Dream
   Precios, nombres, descripciones, ingredientes y modo de empleo
   extraídos de la tienda real (pharma-dream.com) y de las fichas
   técnicas oficiales 2026.
   ============================================================ */

import { withBasePath } from "./paths";

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export type ProductIngredient = { name: string; benefit: string };

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
  benefits?: string[]; // beneficios clave
  keyIngredients?: ProductIngredient[]; // ingredientes principales
  inci?: string; // composición INCI completa
  howToUse?: string[]; // modo de empleo, paso a paso
  warnings?: string[]; // advertencias y precauciones
  includes?: string[]; // solo kits: productos que incluye
  /* Campos gestionables desde el panel admin */
  published?: boolean; // visible en la tienda
  image?: string; // imagen principal (dataURL o URL); si no hay, se usa el "studio card"
  images?: string[]; // galería de fotos adicionales (dataURL o URL), opcional
  stock?: number;
  video?: string; // clip corto de "modo de uso" (sin audio), opcional
  videos?: string[]; // varios clips (ej. kits con más de un producto), opcional
};

export const CATEGORY_NAMES = ["Cremas", "Sérums", "Kits"] as const;
export const TONE_NAMES = ["forest", "olive", "sage", "gold", "sand"] as const;

const CDN = "https://cdn.shopify.com/s/files/1/0691/9399/0198/files/";

const WARNINGS_ESTANDAR = [
  "Producto de uso exclusivamente externo.",
  "Evite el contacto directo con los ojos y mucosas. En caso de contacto accidental, enjuague con abundante agua.",
  "No ingerir.",
  "Suspenda su uso si presenta irritación, enrojecimiento o cualquier reacción desfavorable. Si la molestia persiste, consulte a su médico o dermatólogo.",
  "No aplicar sobre piel irritada, lesionada o con heridas abiertas.",
  "Manténgase fuera del alcance de los niños.",
  "Conservar en su envase original, bien cerrado, en un lugar fresco y seco, protegido de la luz directa y fuentes de calor.",
  "Agítese antes de usar.",
  "El aceite de semilla de cáñamo de espectro completo proviene de plantas de cáñamo enteras; por ello, puede contener trazas de polen. No se recomienda su uso en personas alérgicas al polen.",
];

export const PRODUCTS: Product[] = [
  {
    id: "crema-hidratante-facial",
    name: "Crema Hidratante Facial",
    tagline:
      "Hidratación profunda y equilibrio con extractos naturales y aceite de HEMP. 50 ml.",
    description:
      "Crema facial hidratante y reparadora enriquecida con aceite de HEMP, diseñada para nutrir, calmar y revitalizar la piel. Ideal para todo tipo de pieles, incluyendo las sensibles. Actúa restaurando los nutrientes esenciales de la piel, devolviéndole su equilibrio natural y protegiéndola de agresiones externas. Su fórmula penetra en las tres primeras capas de la piel, activando la circulación sanguínea y ayudando a eliminar células muertas y toxinas.",
    benefits: [
      "Hidratación profunda: el aceite de HEMP regula la producción de sebo y actúa como un potente hidratante.",
      "Protección duradera: forma una barrera que retiene la humedad, manteniendo tu piel hidratada por más tiempo.",
      "Cuidado de la piel: alivia irritaciones y mejora la absorción de nutrientes esenciales, como vitaminas, antioxidantes y minerales.",
    ],
    keyIngredients: [
      { name: "Aceite de HEMP (semilla de cáñamo)", benefit: "Calma la piel, reduce la inflamación y equilibra la producción de sebo. Rico en omega-3 y omega-6, nutre y fortalece la barrera cutánea." },
      { name: "Ácido Hialurónico", benefit: "Hidratación intensa y reducción de líneas finas." },
      { name: "Niacinamida (Vitamina B3)", benefit: "Unifica el tono y mejora la textura." },
      { name: "Extracto de Aloe Vera", benefit: "Calma y refresca, ideal para pieles sensibles." },
      { name: "Aceite de Jojoba", benefit: "Nutre y suaviza sin obstruir los poros." },
    ],
    inci:
      "Rosa Damascena Flower Water, Aloe Barbadensis Leaf Extract, Calendula Officinalis Flower Water, Olivoyl Hydrolyzed Oat Protein, Cetearyl Alcohol, Glyceryl Oleate, Glyceryl Stearate, Cetyl Alcohol, Theobroma Grandiflorum Seed Butter, Triticum Vulgare Germ Oil, Prunus Amygdalus Dulcis Oil, Cannabis Sativa Seed Oil, Hydrolyzed Hyaluronic Acid, Kaempferol, Magnolol, Honokiol, Polyglyceryl-10 Oleate, Polyglyceryl-6 Esters, Prunus Armeniaca (Apricot) Kernel Oil Polyglyceryl-6 Esters, Sorbitan Palmitate, Dicetyl Phosphate, Aqua (Water), Glycerin, Caprylyl Glycol, Ethylhexylglycerin, Pelargonium Graveolens Flower Oil, Aniba Rosaeodora (Rosewood) Wood Oil, Xanthan Gum, Lactic Acid.",
    howToUse: [
      "Limpiar el rostro con un limpiador suave.",
      "Aplicar una pequeña cantidad de crema en las yemas de los dedos.",
      "Distribuir uniformemente sobre el rostro y el cuello con movimientos ascendentes.",
      "Dejar absorber completamente antes de aplicar maquillaje u otros productos.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 77900,
    category: "Cremas",
    tone: "sand",
    label: "CREMA",
    sub: "Hidratante Facial",
    rating: 5,
    reviews: 0,
    image: CDN + "Hidratacion_profunda_para_una_piel_radiante_Nuestra_Crema_Hidratante_Facial_con_extractos_n.jpg?v=1757598636",
    images: [
      withBasePath("/images/productos/crema-hidratante-facial-2.webp"),
      withBasePath("/images/productos/crema-hidratante-facial-3.webp"),
      withBasePath("/images/productos/crema-hidratante-facial-4.webp"),
    ],
    video: withBasePath("/videos/productos/crema-hidratante-facial.mp4"),
  },
  {
    id: "contorno-de-ojos",
    name: "Contorno De Ojos",
    tagline:
      "Reduce bolsas, ojeras y arrugas finas con extracto de sakura y aceite de HEMP.",
    description:
      "Tratamiento de inspiración japonesa que repara y revitaliza la piel del contorno de ojos y labios. Combina el poder rejuvenecedor del extracto de hoja de sakura con el aceite de HEMP, ofreciendo una hidratación profunda y duradera. Su fórmula ligera y de rápida absorción estimula la producción de colágeno, devolviendo elasticidad y firmeza, mientras combate bolsas, ojeras y arrugas finas.",
    benefits: [
      "Reduce visiblemente las bolsas, ojeras y arrugas finas.",
      "Estimula la producción de colágeno, mejorando la firmeza y elasticidad.",
      "Hidratación profunda y duradera gracias al HEMP y la manteca de karité.",
      "Calma y refresca la piel del contorno de ojos y labios.",
      "Fórmula ligera y de rápida absorción, ideal para uso diario.",
    ],
    keyIngredients: [
      { name: "Manteca de Karité", benefit: "Rica en polifenoles, vitamina A y E, nutre la piel en profundidad, combate los radicales libres y calma irritaciones, acné o eccemas." },
      { name: "Aceite de HEMP", benefit: "Alto contenido en omega 3 y 6, antioxidantes y vitamina E. Regula la grasa, reduce la inflamación e hidrata sin obstruir los poros." },
      { name: "Elastina", benefit: "Proteína esencial que aporta resistencia y flexibilidad al tejido cutáneo, manteniendo la piel firme y rejuvenecida." },
      { name: "Vitamina E", benefit: "Neutraliza los radicales libres generados por la contaminación y la radiación UV, retrasando los signos de envejecimiento." },
      { name: "Extracto de Hamamelis", benefit: "Acción purificante y tonificante; reduce poros dilatados, alivia enrojecimiento y disminuye bolsas y ojeras." },
    ],
    inci:
      "Aqua, Propylene Glycol, Glycerin, Collagen, Hydrolyzed Elastin, Rosa Moschata Seed Oil, Butyrospermum Parkii (Shea) Butter, Aloe Barbadensis Leaf Extract, Cannabis Sativa Seed Oil, Hamamelis Virginiana (Witch Hazel) Leaf Extract, Triticum Vulgare (Wheat) Germ Extract, Avena Sativa (Oat) Kernel Extract, Vitis Vinifera (Grape) Seed Extract, Prunus Serrulata (Sakura) Flower Extract, Tocopherol, Allantoin, Pearl Extract, Squalane, Ethylhexyl Methoxycinnamate.",
    howToUse: [
      "Agitar el envase airless antes de usar.",
      "Aplicar una pequeña cantidad (un push) del producto sobre los dedos.",
      "Deslizar suavemente en el contorno de los ojos, realizando movimientos ascendentes.",
      "Masajear hasta su completa absorción.",
      "Usar por la mañana y por la noche para obtener los mejores resultados.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 75000,
    category: "Cremas",
    tone: "olive",
    label: "CONTORNO",
    sub: "de Ojos",
    rating: 5,
    reviews: 0,
    image: CDN + "Revitaliza_tu_mirada_con_el_poder_del_HEMP_y_el_Sakura_Despidete_de_las_ojeras_bolsas_y_line.jpg?v=1757599088",
    images: [
      withBasePath("/images/productos/contorno-de-ojos-2.webp"),
      withBasePath("/images/productos/contorno-de-ojos-3.webp"),
      withBasePath("/images/productos/contorno-de-ojos-4.webp"),
    ],
    video: withBasePath("/videos/productos/contorno-de-ojos.mp4"),
  },
  {
    id: "botox-vegetal-efecto-tensor",
    name: "Bótox Vegetal Efecto Tensor",
    tagline:
      "Lifting inmediato y duradero con péptidos biomiméticos y ácido hialurónico.",
    description:
      "Sérum facial concentrado con péptidos biomiméticos y activos hidratantes, diseñado para mejorar la apariencia de líneas de expresión, aportar efecto tensor inmediato y favorecer la firmeza cutánea. Su combinación de Acetyl Hexapeptide-8, Matrixyl®, Ácido Hialurónico y Niacinamida contribuye a mejorar visiblemente la textura de la piel, aumentar la hidratación y promover una apariencia más lisa y rejuvenecida. Fórmula de rápida absorción, no comedogénica y apta para todo tipo de piel.",
    benefits: [
      "Efecto lifting inmediato y duradero.",
      "Reduce visiblemente las líneas de expresión y arrugas.",
      "Hidratación profunda y reparadora.",
      "Aporta firmeza y suavidad a la piel.",
      "Enriquecida con péptidos biomiméticos y extractos naturales.",
    ],
    keyIngredients: [
      { name: "Acetyl Hexapeptide-8", benefit: "Péptido biomimético con efecto tipo \"botox-like\". Ayuda a reducir la apariencia de líneas de expresión al relajar parcialmente la contracción muscular superficial." },
      { name: "Palmitoyl Tripeptide-1 & Tetrapeptide-7 (Matrixyl®)", benefit: "Péptido estimulador de colágeno. Favorece la síntesis de colágeno y elastina, mejorando firmeza, elasticidad y densidad cutánea." },
      { name: "Sodium Hyaluronate (Ácido Hialurónico)", benefit: "Potente agente hidratante de alto poder de retención de agua. Rellena visualmente líneas finas, dejando la piel más tersa." },
      { name: "Niacinamide", benefit: "Forma activa de la vitamina B3. Mejora la luminosidad, unifica el tono y fortalece la barrera cutánea." },
      { name: "Cannabis Sativa Callus Lysate", benefit: "Activo obtenido de cultivos celulares de Cannabis sativa. Rico en antioxidantes, aminoácidos y péptidos vegetales con acción bioestimulante." },
      { name: "Panthenol (D-Pantenol)", benefit: "Provitamina B5 con propiedades hidratantes y reparadoras. Calma la piel y favorece la regeneración cutánea." },
      { name: "Allantoin", benefit: "Ingrediente calmante y regenerador que favorece la renovación celular y reduce la irritación." },
    ],
    inci:
      "Aqua (Water), Acetyl Hexapeptide-8, Glycerin, Palmitoyl Tripeptide-1 (and) Palmitoyl Tetrapeptide-7, Niacinamide, Benzoic Acid (and) Dehydroacetic Acid (and) Benzyl Alcohol, Panthenol, Sodium Hyaluronate, Allantoin, Cannabis Sativa Callus Lysate, Disodium EDTA.",
    howToUse: [
      "Presione suavemente el tubo colapsible hasta dispensar una pequeña cantidad de producto.",
      "Aplique directamente sobre el rostro limpio y seco utilizando el aplicador metálico, deslizándolo suavemente en movimientos ascendentes sobre frente, contorno de ojos, surcos nasogenianos y cuello.",
      "Masajee hasta su completa absorción.",
      "Se recomienda su uso dos veces al día (mañana y noche). Durante el día, complementar con protector solar.",
      "Después de cada uso, limpiar el aplicador metálico con un pañuelo limpio y cerrar correctamente el envase.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 90000,
    category: "Cremas",
    tone: "forest",
    label: "BÓTOX",
    sub: "Vegetal",
    rating: 5,
    reviews: 0,
    image: CDN + "BOTOX_VEGETAL_EFECTO_TENSOR_Transforma_tu_piel_con_nuestra_innovadora_crema_nutritiva_con_e.jpg?v=1757352902",
    images: [
      withBasePath("/images/productos/botox-vegetal-efecto-tensor-2.webp"),
      withBasePath("/images/productos/botox-vegetal-efecto-tensor-3.webp"),
      withBasePath("/images/productos/botox-vegetal-efecto-tensor-4.webp"),
    ],
    video: withBasePath("/videos/productos/botox-vegetal-efecto-tensor.mp4"),
  },
  {
    id: "protector-solar-natural-spf-50",
    name: "Protector Solar Natural SPF 50",
    tagline:
      "Alta protección UVB, UVA e IR con filtros naturales, HEMP y vitamina E.",
    description:
      "Crema de alta protección que combina filtros solares naturales (dióxido de titanio y óxido de zinc) con aceite de HEMP, ofreciendo una barrera efectiva contra los rayos UVB, UVA e infrarrojos (IR). Enriquecido con vitamina E, protege de quemaduras solares y previene el envejecimiento prematuro. Fórmula ligera y segura, ideal para todo tipo de pieles, incluidas las sensibles.",
    benefits: [
      "Protección total contra los rayos UVB, UVA e infrarrojos (IR).",
      "Hidratación profunda gracias al aceite de HEMP, que calma y mejora la elasticidad.",
      "Previene el envejecimiento prematuro causado por el sol.",
      "Fórmula ligera y segura, ideal para todo tipo de pieles, incluyendo las sensibles.",
    ],
    keyIngredients: [
      { name: "Dióxido de Titanio", benefit: "Filtro físico que protege contra los rayos UVB y UVA." },
      { name: "Óxido de Zinc", benefit: "Filtro físico de amplio espectro que protege contra los rayos UVB, UVA e infrarrojos (IR)." },
      { name: "Aceite de HEMP", benefit: "Hidrata, calma la piel y mejora su elasticidad." },
      { name: "Vitamina E (Tocopherol)", benefit: "Potente antioxidante que previene el daño oxidativo y el envejecimiento prematuro." },
      { name: "Aceite de Jojoba", benefit: "Nutre y suaviza la piel sin obstruir los poros." },
      { name: "Panthenol (Provitamina B5)", benefit: "Repara y calma la piel, promoviendo su regeneración natural." },
    ],
    inci:
      "Cetyl Alcohol, Stearyl Alcohol, Beeswax, Ceteareth-20, Propylene Glycol, Glycerin, Tocopherol, Titanium Dioxide, Zinc Oxide, Simmondsia Chinensis Seed Oil, Cannabis Sativa Seed Oil, BHT, Panthenol, Octocrylene, Diethylhexyl Butamido, Imidazolidinyl Urea, Butyl Methoxydibenzoylmethane, Aqua.",
    howToUse: [
      "Agitar el envase antes de usar.",
      "Aplicar generosamente sobre la piel limpia y seca, al menos 15 minutos antes de la exposición al sol.",
      "Reaplicar cada 2 horas, especialmente después de nadar, sudar o secarse con una toalla.",
      "Usar diariamente para una protección óptima.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 87000,
    compareAt: 100000,
    category: "Cremas",
    tone: "gold",
    label: "SPF 50",
    sub: "Protector Solar",
    rating: 5,
    reviews: 0,
    image: CDN + "protector_solar.jpg?v=1757600445",
    images: [
      withBasePath("/images/productos/protector-solar-natural-spf-50-2.webp"),
      withBasePath("/images/productos/protector-solar-natural-spf-50-3.webp"),
      withBasePath("/images/productos/protector-solar-natural-spf-50-4.webp"),
    ],
    video: withBasePath("/videos/productos/protector-solar-natural-spf-50.mp4"),
  },
  {
    id: "agua-micelar-con-extractos-naturales",
    name: "Agua Micelar con Extractos Naturales",
    tagline:
      "Limpieza profunda y suave sin aclarado. Sin perfume ni parabenos.",
    description:
      "Agua micelar suave que limpia eficazmente el rostro eliminando impurezas profundas e incluso maquillaje de larga duración, sin alterar la barrera cutánea ni dejar sensación grasosa. Su fórmula combina agua de rosas, cocoamida propil betaína, acetato de tocoferol, aceite de rosas, aceite de argán y aceite de HEMP, aportando propiedades calmantes, antioxidantes e hidratantes. El aceite de HEMP contribuye a restaurar la barrera lipídica, mejorar la hidratación y mantener el balance del sebo.",
    benefits: [
      "Elimina impurezas, maquillaje y residuos sin irritar la piel.",
      "Hidratación profunda y regulación del sebo gracias al aceite de HEMP.",
      "Efecto calmante y refrescante, ideal para pieles sensibles.",
      "No necesita aclarado, dejando la piel limpia y tonificada.",
      "Fórmula sin perfume ni parabenos, apta para todo tipo de pieles.",
    ],
    keyIngredients: [
      { name: "Agua de Rosas", benefit: "Tonificante, calmante y refrescante; ayuda a equilibrar el pH cutáneo y reduce el enrojecimiento." },
      { name: "Cocamidopropyl Betaine", benefit: "Tensioactivo anfótero suave; limpia con baja irritación y mejora la tolerancia cutánea." },
      { name: "Acetato de Tocoferol (Vitamina E)", benefit: "Antioxidante que protege la piel del estrés oxidativo y aporta propiedades hidratantes." },
      { name: "Aceite de Argán", benefit: "Rico en ácidos grasos esenciales; refuerza la barrera cutánea y mejora la elasticidad y suavidad." },
      { name: "Aceite de HEMP", benefit: "Ayuda a restaurar la barrera lipídica, mejora la hidratación y contribuye al equilibrio del sebo cutáneo." },
    ],
    inci:
      "Aqua (Water), Rosa Damascena Flower Water, Cocamidopropyl Betaine, Polysorbate 80, Tocopheryl Acetate, Lecithin, Glycerin, Sodium Benzoate, Potassium Sorbate, Citric Acid, Rosa Damascena Flower Oil, Argania Spinosa Kernel Oil, Cannabis Sativa Seed Oil, Parfum.",
    howToUse: [
      "Agítese antes de usar.",
      "Aplicar con un algodón sobre párpados, rostro y cuello mediante suaves toques.",
      "Elimina fácilmente el maquillaje y las impurezas, dejando la piel limpia, tonificada y preparada para el cuidado diario.",
      "No requiere enjuague; se recomienda retirar el exceso de producto antes de aplicar otros tratamientos.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 48000,
    category: "Cremas",
    tone: "olive",
    label: "AGUA",
    sub: "Micelar",
    rating: 5,
    reviews: 0,
    image: CDN + "Agua_Micelar_con_Extractos_Naturales_es_tu_nueva_aliada_diaria._Con_aceite_de_HEMP_agua_de_2.jpg?v=1759978684",
    images: [
      withBasePath("/images/productos/agua-micelar-con-extractos-naturales-2.webp"),
      withBasePath("/images/productos/agua-micelar-con-extractos-naturales-3.webp"),
      withBasePath("/images/productos/agua-micelar-con-extractos-naturales-4.webp"),
    ],
    video: withBasePath("/videos/productos/agua-micelar-con-extractos-naturales.mp4"),
  },
  {
    id: "serum-revitalizante-facial",
    name: "Sérum Revitalizante Facial",
    tagline:
      "Combate los signos de la edad con HEMP, ácido hialurónico y colágeno.",
    description:
      "Fórmula avanzada diseñada para combatir los signos del envejecimiento y devolver la vitalidad a la piel. Con aceite de HEMP, ácido hialurónico y colágeno, este sérum reduce la inflamación, minimiza la apariencia de manchas y arrugas, y promueve la renovación celular. Su textura ligera y de rápida absorción lo hace ideal para todo tipo de pieles.",
    benefits: [
      "Reduce la inflamación y calma la piel gracias al HEMP.",
      "Minimiza la apariencia de manchas, arrugas y líneas finas.",
      "Promueve la renovación celular y devuelve la vitalidad a la piel.",
      "Hidratación profunda y duradera con ácido hialurónico.",
      "Protege la piel del daño oxidativo y el envejecimiento prematuro.",
    ],
    keyIngredients: [
      { name: "Aceite de HEMP", benefit: "Reduce la inflamación, calma la piel y promueve su regeneración." },
      { name: "Ácido Hialurónico", benefit: "Proporciona hidratación intensa y reduce la apariencia de líneas finas y arrugas." },
      { name: "Colágeno", benefit: "Mejora la firmeza y elasticidad de la piel." },
      { name: "Ubiquinona (Coenzima Q10)", benefit: "Protege la piel del daño oxidativo y estimula la renovación celular." },
      { name: "Extracto de Caléndula", benefit: "Calma la piel irritada y promueve su regeneración." },
    ],
    inci:
      "Rosa Damascena Flower Water, Aloe Barbadensis Leaf Extract, Mauritia Flexuosa Fruit Oil, Olivoyl Hydrolyzed Oat Protein, Cetearyl Alcohol, Glyceryl Oleate, Glyceryl Stearate, Cetyl Alcohol, Persea Gratissima (Avocado) Oil, Hydrogenated Vegetable Oil, Tocopherol, Macadamia Ternifolia Seed Oil, Rosa Moschata Seed Oil, Aqua (Water), Glycerin, Algae Extract, Potassium Sorbate, Caprylyl Glycol, Ethylhexylglycerin, Pelargonium Graveolens Flower Oil, Cannabis Sativa Seed Oil, Lactic Acid.",
    howToUse: [
      "Aplicar 3-4 gotas del sérum en la palma de las manos.",
      "Frotar las manos para generar calor y activar los ingredientes.",
      "Distribuir el producto sobre el rostro con suaves masajes circulares ascendentes.",
      "Dejar absorber durante 1 minuto antes de aplicar otros productos.",
      "Usar preferiblemente por la noche para aprovechar su efecto regenerador.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 98000,
    category: "Sérums",
    tone: "sage",
    label: "SÉRUM",
    sub: "Revitalizante",
    rating: 5,
    reviews: 0,
    image: CDN + "Vitalidad_y_juventud_para_tu_piel_El_Serum_Revitalizante_Facial_de_Pharma_Dream_es_la_clave_p.jpg?v=1757600598",
    images: [
      withBasePath("/images/productos/serum-revitalizante-facial-2.webp"),
      withBasePath("/images/productos/serum-revitalizante-facial-3.webp"),
      withBasePath("/images/productos/serum-revitalizante-facial-4.webp"),
    ],
    video: withBasePath("/videos/productos/serum-revitalizante-facial.mp4"),
  },
  {
    id: "serum-renovador-facial",
    name: "Sérum Renovador Facial",
    tagline:
      "Renovación celular para piel grasa, mixta o con tendencia acneica.",
    description:
      "Fórmula avanzada que combina aceites naturales, vitaminas y extractos botánicos para tratar las pieles grasas, mixtas o con tendencia al acné. Diseñado para combatir el envejecimiento prematuro, controlar el exceso de grasa y favorecer la cicatrización, dejando la piel libre de impurezas y con poros menos visibles.",
    benefits: [
      "Regula la producción de sebo.",
      "Promueve la renovación celular.",
      "Reduce la apariencia de poros abiertos.",
      "Favorece la cicatrización.",
      "Deja la piel suave, equilibrada y radiante.",
    ],
    keyIngredients: [
      { name: "Aceite de HEMP", benefit: "Regula la producción de sebo, calma la piel y reduce la inflamación." },
      { name: "Retinol (Retinyl Palmitate)", benefit: "Promueve la renovación celular y reduce los signos del envejecimiento." },
      { name: "Ácido Láctico", benefit: "Exfolia suavemente, mejora la textura de la piel y reduce la apariencia de poros." },
      { name: "Niacinamida", benefit: "Reduce el enrojecimiento, unifica el tono de la piel y controla el exceso de grasa." },
      { name: "Aceite de Argán", benefit: "Nutre y equilibra la piel sin obstruir los poros." },
    ],
    inci:
      "Rosa Damascena Flower Water, Aloe Barbadensis Leaf Extract, Chamomilla Recutita (Matricaria) Flower Water, Olivoyl Hydrolyzed Oat Protein, Cetearyl Alcohol, Glyceryl Oleate, Glyceryl Stearate, Ascorbic Acid, Vitis Vinifera (Grape) Seed Oil, Argania Spinosa Kernel Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Butyrospermum Parkii (Shea) Butter, Retinyl Palmitate, Caffeine, Glycerin, Niacinamide, Hydrolyzed Wheat Protein, Ubiquinone, Camellia Sinensis Leaf Extract, Ginkgo Biloba Leaf Extract, Caprylyl Glycol (and) Ethylhexylglycerin, Lavandula Angustifolia (Lavender) Flower Oil, Cannabis Sativa Seed Oil, Tocopheryl Acetate, Lactic Acid.",
    howToUse: [
      "Aplicar 3-4 gotas del sérum en la palma de las manos.",
      "Frotar las manos para generar calor y activar los ingredientes.",
      "Distribuir el producto sobre el rostro con suaves masajes circulares ascendentes.",
      "Dejar absorber durante 1 minuto antes de aplicar otros productos.",
      "Usar preferiblemente por la noche para aprovechar su efecto regenerador.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 95000,
    category: "Sérums",
    tone: "forest",
    label: "SÉRUM",
    sub: "Renovador",
    rating: 5,
    reviews: 0,
    image: CDN + "Renueva_y_equilibra_tu_piel_El_Serum_Renovador_Facial_de_Pharma_Dream_esta_disenado_para_pi.jpg?v=1757600845",
    images: [
      withBasePath("/images/productos/serum-renovador-facial-2.webp"),
      withBasePath("/images/productos/serum-renovador-facial-3.webp"),
      withBasePath("/images/productos/serum-renovador-facial-4.webp"),
    ],
    video: withBasePath("/videos/productos/serum-renovador-facial.mp4"),
  },
  {
    id: "serum-iluminador-facial",
    name: "Sérum Iluminador Facial",
    tagline:
      "Unifica el tono y devuelve luminosidad con HEMP, retinol y ácido láctico.",
    description:
      "Fórmula avanzada que combina extractos naturales, vitaminas y aceites esenciales para devolver la luminosidad a la piel. Con aceite de HEMP, retinol (retinyl palmitate) y ácido láctico, este sérum unifica el tono, reduce la pigmentación y suaviza las irregularidades, dejando la piel radiante y rejuvenecida.",
    benefits: [
      "Unifica el tono de la piel y reduce la pigmentación.",
      "Devuelve la luminosidad y deja la piel radiante.",
      "Reduce las irregularidades y suaviza las líneas de expresión.",
      "Calma la piel y reduce la inflamación gracias al HEMP.",
      "Promueve la renovación celular con retinol y ácido láctico.",
    ],
    keyIngredients: [
      { name: "Aceite de HEMP", benefit: "Calma la piel, reduce la inflamación y mejora su elasticidad." },
      { name: "Retinol (Retinyl Palmitate)", benefit: "Promueve la renovación celular y reduce los signos del envejecimiento." },
      { name: "Ácido Láctico", benefit: "Exfolia suavemente, unifica el tono y mejora la textura de la piel." },
      { name: "Vitamina C (Sodium Ascorbyl Phosphate)", benefit: "Ilumina la piel y reduce la apariencia de manchas." },
      { name: "Niacinamida", benefit: "Reduce el enrojecimiento, unifica el tono y controla el exceso de grasa." },
    ],
    inci:
      "Rosa Damascena Flower Water, Aloe Barbadensis Extract, Chamomilla Recutita Flower Water, Olivoyl Hydrolyzed Oat Protein, Cetearyl Alcohol, Glyceryl Oleate, Glyceryl Stearate, Hibiscus Sabdariffa Seed Oil, Illicium Verum Oil, Argania Spinosa Kernel Oil, Prunus Amygdalus Dulcis Oil, Retinyl Palmitate, Squalane, Theobroma Grandiflorum, Allantoin, Niacin, Glycerin, Bisabolol, Sodium Ascorbyl Phosphate, Sodium Lactate, Caprylyl Glycol (and) Ethylhexylglycerin, Cananga Odorata Flower Oil, Cannabis Sativa Seed Oil, Tocopheryl Acetate, Lactic Acid.",
    howToUse: [
      "Aplicar 3-4 gotas del sérum en la palma de las manos.",
      "Frotar las manos para generar calor y activar los ingredientes.",
      "Distribuir el producto sobre el rostro con suaves masajes circulares ascendentes.",
      "Dejar absorber durante 1 minuto antes de aplicar otros productos.",
      "Usar preferiblemente por la noche para aprovechar su efecto regenerador; debido al retinol, usar protector solar durante el día.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 99500,
    category: "Sérums",
    tone: "gold",
    label: "SÉRUM",
    sub: "Iluminador",
    rating: 5,
    reviews: 0,
    image: CDN + "iluminadorf.jpg?v=1757601278",
    images: [
      withBasePath("/images/productos/serum-iluminador-facial-2.webp"),
      withBasePath("/images/productos/serum-iluminador-facial-3.webp"),
      withBasePath("/images/productos/serum-iluminador-facial-4.webp"),
    ],
    video: withBasePath("/videos/productos/serum-iluminador-facial.mp4"),
  },
  {
    id: "serum-hidratante",
    name: "Sérum Hidratante",
    tagline:
      "Hidratación reparadora con argán, almendra y mantequilla de mango.",
    description:
      "Aceite facial nutritivo de origen natural, formulado con una mezcla de aceites vegetales y antioxidantes que trabajan en sinergia para hidratar profundamente, reparar la piel y mejorar su apariencia general. Su combinación de aceite de argán, almendra y mantequilla de mango aporta una nutrición intensiva que ayuda a restaurar la suavidad y elasticidad de la piel desde la primera aplicación. Gracias al poder regenerador del aceite de rosa mosqueta y burití, contribuye a mejorar la apariencia de manchas, cicatrices y signos de envejecimiento.",
    benefits: [
      "Hidratación profunda y reparadora para pieles secas y apagadas.",
      "Restaura la suavidad y elasticidad de la piel desde la primera aplicación.",
      "Mejora la apariencia de manchas, cicatrices y signos de envejecimiento.",
      "Protege la piel del daño oxidativo con vitamina E.",
    ],
    keyIngredients: [
      { name: "Aceite de Argán", benefit: "Rico en ácidos grasos esenciales, vitamina E y polifenoles antioxidantes. Hidrata, nutre y mejora la elasticidad de la piel." },
      { name: "Mantequilla de Mango", benefit: "Propiedades emolientes, hidratantes y suavizantes. Ideal para pieles secas; aporta confort y flexibilidad cutánea." },
      { name: "Aceite de Almendra Dulce", benefit: "Rico en vitaminas A y E y ácidos grasos. Suaviza, nutre y protege la piel, aportando hidratación duradera." },
      { name: "Aceite de Rosa Mosqueta", benefit: "Propiedades regeneradoras y reparadoras; ayuda a mejorar la apariencia de cicatrices, manchas y líneas de expresión." },
      { name: "Aceite de HEMP", benefit: "Rico en ácidos grasos omega 3, 6 y 9. Proporciona hidratación profunda, acción antioxidante y efecto calmante." },
      { name: "Aceite de Burití", benefit: "Alto contenido en carotenoides (provitamina A) y vitamina E; aporta acción antioxidante, hidratante y protectora." },
    ],
    inci:
      "Argania Spinosa Kernel Oil, Mangifera Indica Seed Butter, Prunus Amygdalus Dulcis Oil, Rosa Rubiginosa Seed Oil, Cannabis Sativa Seed Oil, Mauritia Flexuosa Fruit Oil, Tocopheryl Acetate, Ricinus Communis Seed Oil, Parfum (Honey Fragrance).",
    howToUse: [
      "Aplicar tres gotas en las palmas de las manos.",
      "Frotarlas suavemente para activar los aceites.",
      "Distribuir sobre el rostro, cuello y escote mediante un suave masaje hasta su total absorción.",
      "Agitar antes de usar.",
    ],
    warnings: WARNINGS_ESTANDAR,
    price: 60000,
    category: "Sérums",
    tone: "sage",
    label: "SÉRUM",
    sub: "Hidratante",
    rating: 5,
    reviews: 0,
    image: CDN + "Hidratacionprofundaparatupiel_NuestroSerumHidratanteestadisenadopararevitalizary.jpg?v=1757601418",
    images: [
      withBasePath("/images/productos/serum-hidratante-2.webp"),
      withBasePath("/images/productos/serum-hidratante-3.webp"),
      withBasePath("/images/productos/serum-hidratante-4.webp"),
    ],
    video: withBasePath("/videos/productos/serum-hidratante.mp4"),
  },
];

export const KITS: Product[] = [
  {
    id: "kit-colageno-y-elastina-reafirma-nutre-y-revitaliza",
    name: "Kit Colágeno y Elastina",
    tagline: "Reafirma, nutre y revitaliza. Colágeno + Elastina con HEMP.",
    description:
      "Regenera la estructura de tu piel con el Kit Colágeno & Elastina, creado para fortalecer la matriz dérmica y recuperar elasticidad, firmeza y luminosidad. Formulado con activos de última generación y enriquecido con HEMP.",
    includes: [
      "Colágeno USP con Ácido Ascórbico: fortalece, reafirma y revitaliza la piel desde las capas más profundas. Combina colágeno de grado USP con vitamina C, que estimula la producción natural de colágeno.",
      "Elastina con Retinol: mejora la firmeza, elasticidad y textura de la piel, estimulando la regeneración celular y la producción natural de colágeno.",
    ],
    benefits: [
      "Reafirmación visible al restaurar la estructura dérmica.",
      "Elasticidad revitalizada.",
      "Estimulación natural del colágeno (vitamina C).",
      "Renovación celular (retinol).",
      "Hidratación equilibrada y protección antioxidante.",
    ],
    keyIngredients: [
      { name: "Ácido Hialurónico Puro", benefit: "Potente agente hidratante; proporciona efecto relleno y mejora la elasticidad de la piel." },
      { name: "Matrixil 3000", benefit: "Complejo de péptidos biomiméticos que estimula la producción natural de colágeno y elastina." },
      { name: "Niacinamida", benefit: "Acción iluminadora y fortalecedora; mejora el tono desigual y refuerza la barrera cutánea." },
    ],
    inci:
      "Colágeno — Aqua (Water), Rosa Damascena Flower Water, Sodium Hyaluronate, Disodium EDTA, Niacinamide, Panthenol, Sharomix, Cannabis Sativa Seed Oil, Palmitoyl Tripeptide-1 (and) Palmitoyl Tetrapeptide-7, Polysorbate 80, Allantoin, Tocopherol. · Elastina — Aqua, Sodium Hyaluronate, Glycyrrhiza Glabra (Licorice) Root Extract, Rosa Damascena Flower Oil, Polysorbate 80, Niacinamide, Panthenol, Sharomix, Hydrolyzed Silk, Cannabis Sativa Seed Oil, Palmitoyl Tripeptide-1 (and) Palmitoyl Tetrapeptide-7, Glyceryl Stearate, Tocopheryl Acetate.",
    howToUse: [
      "Aplicar unas gotas en la palma de las manos, frotar suavemente para activar el calor.",
      "Extender sobre el rostro con masajes circulares ascendentes.",
      "Dejar actuar durante un minuto hasta su completa absorción.",
      "Para mejores resultados, usar en la noche, permitiendo que la piel se regenere durante el descanso.",
    ],
    warnings: [...WARNINGS_ESTANDAR, "No usar en estado de embarazo."],
    price: 160000,
    category: "Kits",
    tone: "gold",
    label: "KIT COLÁGENO",
    sub: "& Elastina",
    rating: 5,
    reviews: 0,
    image: CDN + "KITS2.png?v=1760026790",
    videos: [
      withBasePath("/videos/productos/kit-colageno.mp4"),
      withBasePath("/videos/productos/kit-elastina.mp4"),
    ],
  },
  {
    id: "kit-glow-mananero-cuidado-facial-diario",
    name: "Kit Glow Mañanero – Cuidado Facial Diario",
    tagline:
      "Rutina matutina: agua micelar, contorno, crema y protector SPF 50.",
    description:
      "Empieza tu día con una piel radiante y saludable. Esta rutina integral combina cuatro productos esenciales que trabajan juntos para limpiar, calmar, hidratar y proteger tu piel ante los desafíos diarios.",
    includes: [
      "Agua Micelar con Extractos Naturales y HEMP",
      "Contorno de Ojos con Extractos Naturales y HEMP",
      "Crema Hidratante Facial con Extractos Naturales y HEMP",
      "Protector Solar SPF 50 con Filtros Naturales y HEMP",
    ],
    benefits: [
      "Limpieza profunda sin alterar el equilibrio natural de la piel.",
      "Reduce ojeras y descongestiona la zona periocular.",
      "Hidratación ligera y de rápida absorción.",
      "Protección de amplio espectro contra rayos UVB, UVA e infrarrojos.",
      "Previene manchas y envejecimiento prematuro.",
    ],
    howToUse: [
      "Agua Micelar: aplicar con disco de algodón, no requiere enjuague.",
      "Contorno de ojos: pequeña cantidad con el dedo anular, con toques suaves desde el lagrimal.",
      "Crema hidratante: aplicar sobre rostro y cuello con masajes ascendentes.",
      "Protector solar: aplicar en capa uniforme al final de la rutina; reaplicar cada 2-3 horas.",
    ],
    warnings: WARNINGS_ESTANDAR,
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
      "Dale a tu piel el cuidado profundo que merece mientras duermes. El Kit Noche Renovadora combina limpieza, nutrición y regeneración en una fórmula pensada para la noche, con el poder del HEMP.",
    includes: [
      "Agua Micelar con Extractos Naturales y HEMP: limpia profundamente sin irritar ni resecar la piel.",
      "Sérum Renovador Facial con Extractos Naturales y HEMP: estimula la regeneración celular y la producción de colágeno.",
      "Crema Hidratante Facial con Extractos Naturales y HEMP: proporciona hidratación profunda y nutrición intensa mientras duermes.",
    ],
    benefits: [
      "Elimina maquillaje, grasa y residuos acumulados durante el día.",
      "Suaviza líneas finas, mejora la textura y unifica el tono de la piel.",
      "Deja el rostro más suave, firme y luminoso al despertar.",
    ],
    howToUse: [
      "Aplicar agua micelar con disco de algodón en movimientos suaves.",
      "Aplicar 3-5 gotas de sérum en rostro limpio, extendiendo con masajes ascendentes.",
      "Permitir la absorción antes del siguiente paso.",
      "Aplicar la crema con movimientos circulares ascendentes como último paso.",
    ],
    warnings: WARNINGS_ESTANDAR,
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
      "Transforma tu rutina antiedad con una solución completa que combina la acción tensora del Bótox Vegetal, la nutrición de la crema facial y el poder del kit de colágeno y elastina, todo potenciado con HEMP.",
    includes: [
      "Bótox Vegetal Efecto Tensor con Extractos Naturales y HEMP",
      "Colágeno USP con Ácido Ascórbico",
      "Elastina con Retinol",
      "Crema Hidratante Facial con Extractos Naturales y HEMP",
    ],
    benefits: [
      "Devuelve juventud visible a tu piel.",
      "Reafirma, hidrata y regenera desde capas profundas.",
      "Reduce líneas de expresión y mejora la elasticidad.",
      "Efecto tensor inmediato sin procedimientos invasivos.",
      "Piel más firme, luminosa y revitalizada desde las primeras aplicaciones.",
    ],
    howToUse: [
      "Aplicar en la mañana o en la noche sobre piel limpia y seca.",
      "Distribuir una pequeña cantidad con masajes suaves en frente, contorno de ojos y boca.",
      "Usar los sérums antes de la crema facial.",
      "El kit de colágeno y elastina se recomienda para uso nocturno.",
    ],
    warnings: WARNINGS_ESTANDAR,
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
      "Rutina específica diseñada para combatir manchas, unificar el tono y aportar luminosidad gradual y saludable, formulada con ingredientes naturales y enriquecida con HEMP.",
    includes: [
      "Agua Micelar con Extractos Naturales y HEMP: limpieza suave, purificante y equilibrante que prepara la piel para recibir activos despigmentantes.",
      "Sérum Iluminador Facial con Extractos Naturales y HEMP: reduce la pigmentación visible, favorece la renovación celular y potencia la luminosidad natural.",
      "Crema Hidratante Facial con Extractos Naturales y HEMP: hidratación ligera y de rápida absorción, con acabado luminoso y saludable.",
    ],
    benefits: [
      "Elimina impurezas sin resecar la piel.",
      "Reduce la pigmentación visible y las manchas.",
      "Suaviza irregularidades del tono.",
      "Nutre y suaviza sin obstruir los poros.",
    ],
    howToUse: [
      "Agua Micelar: aplicar con disco de algodón en rostro y cuello, mañana y noche. No requiere enjuague.",
      "Sérum: aplicar 3-5 gotas en rostro limpio, masajeando con movimientos ascendentes. Usar con protector solar durante el día.",
      "Crema: aplicar después del sérum con masajes ascendentes en rostro y cuello, preferentemente en la noche.",
    ],
    warnings: WARNINGS_ESTANDAR,
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
    image: withBasePath("/images/categorias/cremas.webp"),
    count: 5,
  },
  {
    name: "Sérums",
    description: "Activos concentrados de absorción rápida.",
    tone: "gold",
    image: withBasePath("/images/categorias/serums.webp"),
    count: 4,
  },
  {
    name: "Kits",
    description: "Rutinas completas con descuento por tiempo limitado.",
    tone: "forest",
    image: withBasePath("/images/categorias/kits.webp"),
    count: 5,
  },
];

/* Ingredientes de marca (página /ingredientes), agrupados como en la
   ficha oficial de Pharma Dream. */
export type IngredientDetail = {
  name: string;
  inci: string;
  description: string;
  image: string;
};

export type IngredientCategory = {
  category: string;
  items: IngredientDetail[];
};

const ING = (file: string) => withBasePath(`/images/ingredientes/${file}`);

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  {
    category: "Aguas Infusionadas",
    items: [
      {
        name: "Agua de Flor de Rosa Damascena",
        inci: "Rosa damascena flower water",
        description:
          "Hidrolato calmante e hidratante que ayuda a tonificar y afinar la apariencia de los poros, dejando la piel fresca y suave.",
        image: ING("agua-rosa-damascena.webp"),
      },
      {
        name: "Agua de Flor de Manzanilla",
        inci: "Chamomilla recutita flower water",
        description:
          "Reconocida por su efecto calmante y antiinflamatorio; ideal para pieles sensibles o con tendencia al enrojecimiento.",
        image: ING("agua-manzanilla.webp"),
      },
    ],
  },
  {
    category: "Extractos Naturales",
    items: [
      {
        name: "Extracto de Aloe Vera",
        inci: "Aloe barbadensis leaf extract",
        description:
          "Hidrata en profundidad y calma la piel irritada; aporta frescura y ayuda a mantener la barrera cutánea en buen estado.",
        image: ING("extracto-aloe-vera.webp"),
      },
      {
        name: "Extracto de Avena",
        inci: "Avena sativa kernel extract",
        description:
          "Rico en betaglucanos que calman y protegen; suaviza la piel y alivia la sensación de tirantez o picor.",
        image: ING("extracto-avena.webp"),
      },
      {
        name: "Extracto de Caléndula",
        inci: "Calendula officinalis oil",
        description:
          "Propiedades cicatrizantes y antiinflamatorias reconocidas; ayuda a calmar rojeces y favorece la regeneración de la piel.",
        image: ING("extracto-calendula.webp"),
      },
      {
        name: "Extracto de Hamamelis",
        inci: "Hamamelis virginiana leaf extract",
        description:
          "Astringente natural que ayuda a equilibrar el exceso de grasa y afinar visiblemente el aspecto de los poros.",
        image: ING("extracto-hamamelis.webp"),
      },
      {
        name: "Extracto de Hibisco",
        inci: "Hibiscus sabdariffa seed oil",
        description:
          "Aporta antioxidantes naturales y ayuda a mejorar la elasticidad, dando a la piel una apariencia más firme y luminosa.",
        image: ING("extracto-hibisco.webp"),
      },
      {
        name: "Extracto de Perla",
        inci: "Pearl extract",
        description:
          "Aporta luminosidad y ayuda a unificar el tono de la piel, dejando un acabado más terso y radiante.",
        image: ING("extracto-perla.webp"),
      },
      {
        name: "Extracto de Uva",
        inci: "Vitis vinifera seed extract",
        description:
          "Alto contenido de antioxidantes que ayudan a proteger la piel del daño ambiental y a mantener su firmeza.",
        image: ING("extracto-perla.webp"),
      },
    ],
  },
  {
    category: "Aceites",
    items: [
      {
        name: "Aceite de Almendras Dulces",
        inci: "Prunus amygdalus dulcis oil",
        description:
          "Emoliente suave que nutre e hidrata sin obstruir los poros; ideal para pieles secas y sensibles.",
        image: ING("aceite-almendras.webp"),
      },
      {
        name: "Aceite de Argán",
        inci: "Argania spinosa kernel oil",
        description:
          "Rico en vitamina E y ácidos grasos esenciales; hidrata en profundidad y ayuda a mantener la piel más elástica y rejuvenecida.",
        image: ING("aceite-argan.webp"),
      },
      {
        name: "Aceite de Cáñamo (HEMP)",
        inci: "Cannabis sativa seed oil",
        description:
          "Equilibra la producción de sebo y refuerza la barrera cutánea; calma sin dejar sensación grasosa.",
        image: ING("aceite-canamo.webp"),
      },
      {
        name: "Aceite de Hibisco",
        inci: "Hibiscus sabdariffa seed oil",
        description:
          "Con propiedades exfoliantes suaves y antioxidantes que ayudan a mejorar la textura y luminosidad de la piel.",
        image: ING("aceite-hibisco.webp"),
      },
      {
        name: "Aceite de Illicium Verum",
        inci: "Illicium verum oil",
        description:
          "Aceite esencial con propiedades calmantes que complementa las fórmulas aportando una sensación de frescura.",
        image: ING("aceite-illicium.webp"),
      },
      {
        name: "Aceite de Rosa Damascena",
        inci: "Rosa damascena flower oil",
        description:
          "Nutre e hidrata mientras aporta un aroma floral natural; ayuda a mejorar la firmeza y luminosidad de la piel.",
        image: ING("aceite-rosa-damascena.webp"),
      },
      {
        name: "Aceite de Sándalo",
        inci: "Santalum album oil",
        description:
          "Calmante y suavizante, tradicionalmente usado para aportar bienestar a la piel y equilibrar su apariencia.",
        image: ING("aceite-sandalo.webp"),
      },
      {
        name: "Aceite de Semilla de Uva",
        inci: "Vitis vinifera seed oil",
        description:
          "Ligero y rico en antioxidantes; se absorbe con rapidez y ayuda a fortalecer la barrera natural de la piel.",
        image: ING("aceite-semilla-uva.webp"),
      },
      {
        name: "Aceite de Semillas de Cannabis",
        inci: "Cannabis sativa seed oil",
        description:
          "Ayuda a reducir la apariencia de inflamación y afinar los poros, aportando equilibrio a pieles mixtas y grasas.",
        image: ING("aceite-semillas-cannabis.webp"),
      },
      {
        name: "Aceite de Caléndula",
        inci: "Calendula officinalis oil",
        description:
          "Favorece la regeneración de la piel y ayuda a calmar la irritación gracias a sus propiedades reconocidas.",
        image: ING("aceite-calendula.webp"),
      },
      {
        name: "Aceite de Germen de Trigo",
        inci: "Triticum vulgare germ oil",
        description:
          "Alto contenido de vitamina E; nutre en profundidad y ayuda a mantener la elasticidad natural de la piel.",
        image: ING("aceite-germen-trigo.webp"),
      },
      {
        name: "Aceite de Jojoba",
        inci: "Simmondsia chinensis seed oil",
        description:
          "Su estructura es similar al sebo natural de la piel, por lo que hidrata y equilibra sin obstruir los poros; apto para pieles grasas y sensibles.",
        image: ING("aceite-jojoba.webp"),
      },
      {
        name: "Aceite de Oliva",
        inci: "Olea europaea fruit oil",
        description:
          "Rico en antioxidantes y ácidos grasos; nutre profundamente y ayuda a mantener la piel suave y flexible.",
        image: ING("aceite-oliva.webp"),
      },
      {
        name: "Aceite de Rosa Mosqueta",
        inci: "Rosa moschata seed oil",
        description:
          "Reconocido por favorecer la regeneración de la piel; ayuda a mejorar la apariencia de cicatrices y marcas.",
        image: ING("aceite-rosa-mosqueta.webp"),
      },
    ],
  },
];

/* Resumen corto usado en la sección "Ciencia" del home */
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

/* Videos cortos sobre la ciencia detrás de las fórmulas (página /ingredientes) */
export type ScienceVideo = {
  title: string;
  description: string;
  video: string;
  subtitles: string;
};

export const SCIENCE_VIDEOS: ScienceVideo[] = [
  {
    title: "Extracción Fitomolecular",
    description:
      "Cómo obtenemos en laboratorio los compuestos bioactivos de las plantas que usamos en nuestras fórmulas.",
    video: withBasePath("/videos/ciencia/fitomolecular.mp4"),
    subtitles: withBasePath("/videos/ciencia/fitomolecular.vtt"),
  },
  {
    title: "Nutracéuticos para el cuidado facial",
    description:
      "Qué son los nutracéuticos y por qué son clave para nutrir la piel desde la fórmula.",
    video: withBasePath("/videos/ciencia/nutraceutico.mp4"),
    subtitles: withBasePath("/videos/ciencia/nutraceutico.vtt"),
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
