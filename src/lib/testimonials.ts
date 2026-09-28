"use client";

/* ============================================================
   Testimonios / prueba social — persistidos en Firestore
   (mismo patrón que src/lib/club.ts). El cliente pidió dos
   formatos a la vez:
     1) Capturas/fotos reales de reseñas de Instagram — estáticas,
        se administran en INSTAGRAM_TESTIMONIALS más abajo.
     2) Formulario en el sitio para que cada clienta deje su propia
        reseña — se guarda en Firestore con approved:false y solo
        se muestra en el sitio después de aprobarse desde /admin
        (moderación anti-spam pedida por el cliente).
   ============================================================ */

import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type Testimonial = {
  id: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO
  approved: boolean;
};

const COLLECTION = "testimonials";

let cache: Testimonial[] = [];
const listeners = new Set<(items: Testimonial[]) => void>();

function subscribeAll() {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    cache = snap.docs.map((d) => d.data() as Testimonial);
    listeners.forEach((l) => l(cache));
  });
}

/** Todas las reseñas (aprobadas y pendientes) — para el panel admin. */
export function useAllTestimonials(): Testimonial[] {
  const [state, setState] = useState<Testimonial[]>(cache);
  useEffect(() => {
    const listener = (items: Testimonial[]) => setState(items);
    listeners.add(listener);
    const unsub = subscribeAll();
    return () => {
      listeners.delete(listener);
      unsub();
    };
  }, []);
  return state;
}

/** Solo reseñas aprobadas — para mostrar en el sitio público. */
export function useApprovedTestimonials(): Testimonial[] {
  const all = useAllTestimonials();
  return all.filter((t) => t.approved);
}

export async function addTestimonial(input: {
  name: string;
  rating: number;
  comment: string;
}) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const testimonial: Testimonial = {
    id,
    name: input.name.trim(),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    comment: input.comment.trim(),
    createdAt: new Date().toISOString(),
    approved: false,
  };
  await setDoc(doc(db, COLLECTION, id), testimonial);
  return testimonial;
}

export async function setTestimonialApproved(id: string, approved: boolean) {
  await updateDoc(doc(db, COLLECTION, id), { approved });
}

export async function deleteTestimonial(id: string) {
  await deleteDoc(doc(db, COLLECTION, id));
}

/* ------------------------------------------------------------
   Capturas/fotos reales de Instagram — el cliente las sube desde
   su Drive; mientras tanto este arreglo queda vacío y la sección
   no se rompe (solo oculta el bloque de capturas).
   Para publicar una nueva: agregar el archivo en
   /public/images/testimonios/ y una línea aquí.
   ------------------------------------------------------------ */
export type InstagramTestimonial = {
  image: string;
  alt: string;
};

export const INSTAGRAM_TESTIMONIALS: InstagramTestimonial[] = [
  // Ejemplo una vez el cliente aporte las capturas:
  // { image: withBasePath("/images/testimonios/ig-1.webp"), alt: "Reseña de @usuaria en Instagram" },
];
