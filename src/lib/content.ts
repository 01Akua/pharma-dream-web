"use client";

/* ============================================================
   CMS de contenido del sitio (textos + imágenes) — demo local.
   Los componentes leen de aquí; el panel /admin lo edita.
   Migrable a backend real sin tocar la interfaz.
   ============================================================ */

import { useEffect, useState } from "react";
import { UNSPLASH } from "./data";

export type HeroSlide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
};

export type SiteContent = {
  announcement: string[];
  hero: HeroSlide[];
  categories: { name: string; description: string; image: string }[];
  science: {
    eyebrow: string;
    title: string;
    description: string;
    statValue: string;
    statLabel: string;
    image: string;
  };
  blog: { title: string; excerpt: string; tag: string; image: string }[];
  newsletter: { title: string; subtitle: string };
  footer: { blurb: string; city: string; phone: string; email: string };
};

export const DEFAULT_CONTENT: SiteContent = {
  announcement: [
    "Envíos gratis a partir de COP $200.000",
    "10% OFF en tu primera compra uniéndote al Club Pharma Dream",
    "Pago seguro · Tarjeta, PSE y contra entrega",
  ],
  hero: [
    {
      eyebrow: "Dermocosmética avanzada",
      title: "Nutrición para la piel",
      subtitle:
        "El poder nutracéutico que conecta la ciencia con la naturaleza. Fórmulas con Tecnología Fitomolecular para piel sensible y reactiva.",
      cta: "Ver catálogo",
      image: UNSPLASH("1497436072909-60f360e1d4b1", 1920, 80),
    },
    {
      eyebrow: "Efecto tensor natural",
      title: "Firmeza que se siente",
      subtitle:
        "Descubre la suavidad y firmeza de tu piel gracias a extractos naturales que rejuvenecen y tensan al instante.",
      cta: "Conocer el Bótox Vegetal",
      image: UNSPLASH("1556760544-74068565f05c", 1920, 80),
    },
    {
      eyebrow: "Respaldado por la ciencia",
      title: "Tu piel merece innovación",
      subtitle:
        "Activos vegetales bioactivos con alta afinidad cutánea, formulados para resultados visibles con uso continuo.",
      cta: "Explorar ingredientes",
      image: UNSPLASH("1570172619644-dfd03ed5d881", 1920, 80),
    },
  ],
  categories: [
    {
      name: "Cremas",
      description: "Hidratación y reparación de la barrera cutánea.",
      image: UNSPLASH("1556228720-195a672e8a03", 800),
    },
    {
      name: "Sérums",
      description: "Activos concentrados de absorción rápida.",
      image: UNSPLASH("1620916566398-39f1143ab7be", 800),
    },
    {
      name: "Kits",
      description: "Rutinas completas con descuento por tiempo limitado.",
      image: UNSPLASH("1612817288484-6f916006741a", 800),
    },
  ],
  science: {
    eyebrow: "Respaldado por la ciencia",
    title: "Dermocosmética avanzada para piel sensible y reactiva",
    description:
      "Integramos Tecnología Fitomolecular y activos vegetales bioactivos para optimizar la afinidad cutánea y fortalecer la barrera natural de la piel. Productos seguros, eficaces y adaptados a ti.",
    statValue: "+98%",
    statLabel:
      "reportó una piel más hidratada y confortable tras 4 semanas.",
    image: UNSPLASH("1466781783364-36c955e42a7f", 1000, 80),
  },
  blog: [
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
  ],
  newsletter: {
    title: "Únete al Club Pharma Dream",
    subtitle:
      "Recibe 10% de descuento en tu primera compra, descuentos mensuales y rifas exclusivas.",
  },
  footer: {
    blurb:
      "Dermocosmética inteligente que conecta la ciencia con la naturaleza. Fórmulas seguras y eficaces para piel sensible y reactiva.",
    city: "Bogotá, Colombia",
    phone: "+57 321 745 0695",
    email: "info@pharma-dream.com",
  },
};

const KEY = "pd_content_v1";

let cache: SiteContent | null = null;
const listeners = new Set<() => void>();

function read(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    // Merge superficial para tolerar contenido guardado incompleto
    cache = raw
      ? { ...DEFAULT_CONTENT, ...(JSON.parse(raw) as Partial<SiteContent>) }
      : DEFAULT_CONTENT;
  } catch {
    cache = DEFAULT_CONTENT;
  }
  return cache;
}

function write(next: SiteContent) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    console.warn("No se pudo guardar contenido:", e);
    throw new Error(
      "El almacenamiento local está lleno. Usa imágenes más livianas o restablece el contenido.",
    );
  }
  listeners.forEach((l) => l());
}

export function useContent(): SiteContent {
  const [state, setState] = useState<SiteContent>(DEFAULT_CONTENT);
  useEffect(() => {
    setState(read());
    const l = () => setState({ ...read() });
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return state;
}

export function patchContent(patch: Partial<SiteContent>) {
  write({ ...read(), ...patch });
}

export function resetContent() {
  write({ ...DEFAULT_CONTENT });
}
