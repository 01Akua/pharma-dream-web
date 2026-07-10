"use client";

/* ============================================================
   Store de posts del blog con persistencia local (demo).
   Mismo patrón que store.ts (productos): localStorage por
   navegador, reactivo, migrable a backend real sin tocar los
   componentes.
   ============================================================ */

import { useEffect, useState } from "react";
import { BLOG_POSTS, type BlogPost } from "./blog";
import { slugify } from "./store";

export type StoredBlogPost = BlogPost & { published: boolean };

const KEY = "pd_blog_v1";

const SEED: StoredBlogPost[] = BLOG_POSTS.map((p) => ({
  ...p,
  published: true,
}));

let cache: StoredBlogPost[] | null = null;
const listeners = new Set<() => void>();

function read(): StoredBlogPost[] {
  if (typeof window === "undefined") return SEED;
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as StoredBlogPost[]) : SEED;
  } catch {
    cache = SEED;
  }
  return cache;
}

function write(next: StoredBlogPost[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    console.warn("No se pudo guardar en localStorage:", e);
    throw new Error(
      "El almacenamiento local está lleno. Usa imágenes más livianas o restablece la demo.",
    );
  }
  listeners.forEach((l) => l());
}

/* ---------- Hooks reactivos ---------- */

/** Todos los posts (incluye ocultos). Para el panel admin. */
export function useAllBlogPosts(): StoredBlogPost[] {
  const [state, setState] = useState<StoredBlogPost[]>(SEED);
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

/** Solo posts publicados. Para el blog público. */
export function useVisibleBlogPosts(): StoredBlogPost[] {
  return useAllBlogPosts().filter((p) => p.published);
}

/** Un post por slug, con overrides aplicados (para el detalle). */
export function useStoredBlogPost(slug: string, fallback?: BlogPost) {
  const all = useAllBlogPosts();
  return all.find((p) => p.slug === slug) ?? fallback;
}

/* ---------- Acciones ---------- */

export function upsertBlogPost(post: StoredBlogPost) {
  const list = read();
  const idx = list.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    const next = [...list];
    next[idx] = post;
    write(next);
  } else {
    write([post, ...list]);
  }
}

export function deleteBlogPost(slug: string) {
  write(read().filter((p) => p.slug !== slug));
}

export function toggleBlogPublished(slug: string) {
  write(
    read().map((p) => (p.slug === slug ? { ...p, published: !p.published } : p)),
  );
}

export function resetBlogPosts() {
  write(SEED.map((p) => ({ ...p })));
}

/* ---------- Utilidades ---------- */

export const slugifyBlog = slugify;

export function emptyBlogPost(): StoredBlogPost {
  return {
    slug: "",
    title: "",
    excerpt: "",
    tag: "Rutina",
    image: "",
    date: new Date().toISOString().slice(0, 10),
    author: "Pharma Dream",
    body: [{ type: "p", text: "" }],
    published: true,
  };
}
