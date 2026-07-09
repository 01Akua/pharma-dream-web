"use client";

/* ============================================================
   CMS de contenido del sitio (textos + imágenes) — demo local.
   Los componentes leen de aquí; el panel /admin lo edita.
   Migrable a backend real sin tocar la interfaz.
   ============================================================ */

import { useEffect, useState } from "react";
import { withBasePath } from "./paths";

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
    "Gana un 10% OFF en tu primera compra uniéndote al Club Pharma Dream",
    "Pago seguro · Tarjeta, PSE y contra entrega",
  ],
  hero: [
    {
      eyebrow: "Dermocosmética avanzada",
      title: "Nutrición para la piel",
      subtitle:
        "El poder nutracéutico que conecta ciencia y naturaleza para cuidar tu piel.",
      cta: "Ver catálogo",
      image: withBasePath("/images/hero/nutricion.webp"),
    },
    {
      eyebrow: "Efecto tensor natural",
      title: "Efecto Tensor Natural",
      subtitle:
        "Descubre la suavidad y firmeza de tu piel gracias a extractos naturales que rejuvenecen y tensan al instante.",
      cta: "Comprar",
      image: withBasePath("/images/hero/tensor.webp"),
    },
    {
      eyebrow: "Hidratación profunda",
      title: "Sérum Hidratante Facial",
      subtitle:
        "Nutre, calma y devuelve luminosidad a las pieles secas y sensibles con aceite de HEMP.",
      cta: "Comprar",
      image: withBasePath("/images/hero/hidratante.webp"),
    },
  ],
  categories: [
    {
      name: "Cremas",
      description: "Hidratación y reparación de la barrera cutánea.",
      image: withBasePath("/images/categorias/cremas.webp"),
    },
    {
      name: "Sérums",
      description: "Activos concentrados de absorción rápida.",
      image: withBasePath("/images/categorias/serums.webp"),
    },
    {
      name: "Kits",
      description: "Rutinas completas con descuento por tiempo limitado.",
      image: withBasePath("/images/categorias/kits.webp"),
    },
  ],
  science: {
    eyebrow: "Tecnología Fitomolecular",
    title: "Dermocosmética avanzada para piel sensible y reactiva",
    description:
      "En Pharma Dream elevamos el cuidado de la piel a un enfoque dermocosmético inteligente. Nuestras fórmulas integran Tecnología Fitomolecular y activos vegetales bioactivos para optimizar la afinidad cutánea y favorecer una piel equilibrada y saludable. Creamos productos seguros, eficaces y adaptados a ti, porque tu piel merece innovación respaldada por la ciencia.",
    statValue: "100%",
    statLabel: "Activos vegetales bioactivos y aceite de HEMP.",
    image: withBasePath("/images/ciencia/ciencia.webp"),
  },
  blog: [
    {
      title: "Guía Completa para Aplicar Cremas Cosméticas Naturales",
      excerpt:
        "El cuidado de la piel no es solo belleza, sino salud. Aplicar correctamente una crema de lujo potencia sus beneficios y maximiza la absorción de los activos.",
      tag: "Rutina",
      image: withBasePath("/images/blog/guia-cremas.webp"),
    },
    {
      title:
        "Ingredientes Naturales y Extracción Fitomolecular: El Secreto Detrás de la Eficacia",
      excerpt:
        "Descubre cómo Pharma Dream aprovecha la biodiversidad colombiana y técnicas de extracción molecular para crear cosméticos naturales con HEMP.",
      tag: "Ciencia",
      image: withBasePath("/images/blog/fitomolecular.webp"),
    },
    {
      title:
        "Beneficios del CBD y Otros Cannabinoides en el Cuidado de la Piel",
      excerpt:
        "El cannabidiol (CBD) y otros cannabinoides han emergido como compuestos prometedores en dermatología y bienestar, con propiedades respaldadas por la evidencia.",
      tag: "Ingredientes",
      image: withBasePath("/images/blog/cbd.webp"),
    },
  ],
  newsletter: {
    title: "Únete al Club Pharma Dream",
    subtitle:
      "Regístrate y obtén un 10% de descuento en tu primera compra, además de descuentos mensuales y rifas exclusivas.",
  },
  footer: {
    blurb:
      "Dermocosmética inteligente que conecta la ciencia con la naturaleza. Fórmulas seguras y eficaces para piel sensible y reactiva.",
    city: "Bogotá, Colombia",
    phone: "+57 321 745 0695",
    email: "info@pharma-dream.com",
  },
};

const KEY = "pd_content_v2";

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
