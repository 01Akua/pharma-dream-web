"use client";

/* ============================================================
   Store de productos con persistencia local (demo).
   - Fuente de verdad: localStorage (por navegador).
   - Reactivo: cualquier cambio en el admin refresca la tienda
     y las demás vistas abiertas.
   - Diseñado para migrar a un backend real (Supabase/API) sin
     tocar los componentes: solo se cambian read/write.
   ============================================================ */

import { useEffect, useState } from "react";
import { ALL_PRODUCTS, type Product } from "./data";

export type StoredProduct = Product & { published: boolean };

const KEY = "pd_products_v2";

/* Semilla inmutable a partir del catálogo por defecto */
const SEED: StoredProduct[] = ALL_PRODUCTS.map((p) => ({
  ...p,
  published: p.published ?? true,
}));

let cache: StoredProduct[] | null = null;
const listeners = new Set<() => void>();

function read(): StoredProduct[] {
  if (typeof window === "undefined") return SEED;
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      cache = SEED;
      return cache;
    }
    const stored = JSON.parse(raw) as StoredProduct[];
    const seedById = new Map(SEED.map((p) => [p.id, p]));
    const storedIds = new Set(stored.map((p) => p.id));
    // Completa con datos del catálogo actual los campos que un navegador con
    // una versión vieja en localStorage todavía no conoce (ej. la foto real,
    // agregada después de que alguien probó el sitio) y descarta productos
    // que ya no existen en el catálogo.
    const merged = stored
      .filter((p) => seedById.has(p.id))
      .map((p) => ({ ...seedById.get(p.id)!, ...p }));
    for (const seedProduct of SEED) {
      if (!storedIds.has(seedProduct.id)) merged.push(seedProduct);
    }
    cache = merged;
  } catch {
    cache = SEED;
  }
  return cache;
}

function write(next: StoredProduct[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    // Cuota de localStorage excedida (imágenes muy pesadas)
    console.warn("No se pudo guardar en localStorage:", e);
    throw new Error(
      "El almacenamiento local está lleno. Usa imágenes más livianas o restablece la demo.",
    );
  }
  listeners.forEach((l) => l());
}

/* ---------- Hooks reactivos ---------- */

/** Todos los productos (incluye ocultos). Para el panel admin. */
export function useAllProducts(): StoredProduct[] {
  const [state, setState] = useState<StoredProduct[]>(SEED);
  useEffect(() => {
    setState(read());
    const listener = () => setState([...read()]);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);
  return state;
}

/** Solo productos publicados. Para la tienda pública. */
export function useVisibleProducts(): StoredProduct[] {
  return useAllProducts().filter((p) => p.published);
}

/** Un producto por id, con overrides aplicados (para el detalle). */
export function useStoredProduct(id: string, fallback?: Product) {
  const all = useAllProducts();
  return all.find((p) => p.id === id) ?? fallback;
}

/* ---------- Acciones ---------- */

export function upsertProduct(product: StoredProduct) {
  const list = read();
  const idx = list.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    const next = [...list];
    next[idx] = product;
    write(next);
  } else {
    write([product, ...list]);
  }
}

export function deleteProduct(id: string) {
  write(read().filter((p) => p.id !== id));
}

export function togglePublished(id: string) {
  write(
    read().map((p) => (p.id === id ? { ...p, published: !p.published } : p)),
  );
}

export function resetStore() {
  write(SEED.map((p) => ({ ...p })));
}

/* ---------- Utilidades ---------- */

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export function emptyProduct(): StoredProduct {
  return {
    id: "",
    name: "",
    tagline: "",
    price: 0,
    category: "Cremas",
    tone: "sage",
    label: "",
    sub: "",
    rating: 5,
    reviews: 0,
    stock: 0,
    published: true,
  };
}

/** Reduce y comprime una imagen a dataURL para no llenar localStorage. */
export function fileToDataURL(file: File, maxSize = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("No se pudo procesar la imagen"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => reject(new Error("Imagen inválida"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
    reader.readAsDataURL(file);
  });
}
