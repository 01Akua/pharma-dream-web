"use client";

/* ============================================================
   Store de productos — persistencia real en Firestore.
   Migrado desde localStorage (igual que Pedidos en crm.ts) para
   que el inventario/catálogo se sincronice entre dispositivos y
   entre todas las sesiones del panel admin en tiempo real.
   ============================================================ */

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { ALL_PRODUCTS, type Product } from "./data";

export type StoredProduct = Product & { published: boolean };

const PRODUCTS_COLLECTION = "products";

/* Semilla inmutable a partir del catálogo por defecto */
const SEED: StoredProduct[] = ALL_PRODUCTS.map((p) => ({
  ...p,
  published: p.published ?? true,
}));

let cache: StoredProduct[] = SEED;
const listeners = new Set<(products: StoredProduct[]) => void>();
let seeded = false;
let subscribed = false;

async function seedIfEmpty() {
  const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
  if (!snap.empty) return;
  const batch = writeBatch(db);
  for (const p of SEED) {
    batch.set(doc(db, PRODUCTS_COLLECTION, p.id), p);
  }
  await batch.commit();
}

function ensureSubscribed() {
  if (subscribed || typeof window === "undefined") return;
  subscribed = true;
  if (!seeded) {
    seeded = true;
    seedIfEmpty();
  }
  onSnapshot(collection(db, PRODUCTS_COLLECTION), (snap) => {
    if (snap.empty) return; // evita parpadeo vacío mientras se siembra
    cache = snap.docs.map((d) => d.data() as StoredProduct);
    listeners.forEach((l) => l(cache));
  });
}

/* ---------- Hooks reactivos ---------- */

/** Todos los productos (incluye ocultos). Para el panel admin. */
export function useAllProducts(): StoredProduct[] {
  const [state, setState] = useState<StoredProduct[]>(cache);
  useEffect(() => {
    ensureSubscribed();
    const listener = (products: StoredProduct[]) => setState(products);
    listeners.add(listener);
    setState(cache);
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

export async function upsertProduct(product: StoredProduct) {
  await setDoc(doc(db, PRODUCTS_COLLECTION, product.id), product);
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

export async function togglePublished(id: string) {
  const current = cache.find((p) => p.id === id);
  if (!current) return;
  await setDoc(
    doc(db, PRODUCTS_COLLECTION, id),
    { published: !current.published },
    { merge: true },
  );
}

export async function resetStore() {
  const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
  const batch = writeBatch(db);
  snap.docs.forEach((d) => batch.delete(d.ref));
  for (const p of SEED) {
    batch.set(doc(db, PRODUCTS_COLLECTION, p.id), p);
  }
  await batch.commit();
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

/** Reduce y comprime una imagen a dataURL para no llenar el documento de Firestore. */
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
