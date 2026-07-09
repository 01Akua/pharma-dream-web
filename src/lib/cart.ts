"use client";

/* ============================================================
   Carrito de compras (demo con persistencia local).
   Mismo patrón que store.ts / crm.ts: cache + listeners +
   localStorage, para migrar a backend real sin tocar la UI.
   ============================================================ */

import { useEffect, useState } from "react";
import type { Product } from "./data";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image?: string;
  qty: number;
};

const KEY = "pd_cart_v1";

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(next: CartItem[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    console.warn("No se pudo guardar el carrito:", e);
  }
  listeners.forEach((l) => l());
}

/* ---------- Hooks reactivos ---------- */

export function useCart(): CartItem[] {
  const [state, setState] = useState<CartItem[]>([]);
  useEffect(() => {
    setState(read());
    const l = () => setState([...read()]);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return state;
}

export function useCartCount(): number {
  return useCart().reduce((s, it) => s + it.qty, 0);
}

export function useCartTotal(): number {
  return useCart().reduce((s, it) => s + it.price * it.qty, 0);
}

/* ---------- Acciones ---------- */

export function addToCart(product: Product, qty = 1) {
  const list = read();
  const idx = list.findIndex((it) => it.productId === product.id);
  if (idx >= 0) {
    const next = [...list];
    next[idx] = { ...next[idx], qty: next[idx].qty + qty };
    write(next);
  } else {
    write([
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty,
      },
      ...list,
    ]);
  }
}

export function updateCartQty(productId: string, qty: number) {
  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }
  write(read().map((it) => (it.productId === productId ? { ...it, qty } : it)));
}

export function removeFromCart(productId: string) {
  write(read().filter((it) => it.productId !== productId));
}

export function clearCart() {
  write([]);
}

/* ---------- Estado del panel/drawer (abrir desde cualquier lado) ---------- */

let drawerOpen = false;
const drawerListeners = new Set<() => void>();

export function useCartDrawerOpen(): boolean {
  const [state, setState] = useState(drawerOpen);
  useEffect(() => {
    const l = () => setState(drawerOpen);
    drawerListeners.add(l);
    return () => {
      drawerListeners.delete(l);
    };
  }, []);
  return state;
}

export function openCartDrawer() {
  drawerOpen = true;
  drawerListeners.forEach((l) => l());
}

export function closeCartDrawer() {
  drawerOpen = false;
  drawerListeners.forEach((l) => l());
}
