"use client";

/* ============================================================
   CRM / control de ventas (demo con persistencia local).
   Diseñado para migrar a backend real sin tocar la interfaz.
   ============================================================ */

import { useEffect, useState } from "react";
import { ALL_PRODUCTS } from "./data";

export type OrderStatus =
  | "nuevo"
  | "pagado"
  | "enviado"
  | "entregado"
  | "cancelado";

export const STATUS_META: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  nuevo: { label: "Nuevo", className: "bg-blue-100 text-blue-700" },
  pagado: { label: "Pagado", className: "bg-amber-100 text-amber-700" },
  enviado: { label: "Enviado", className: "bg-indigo-100 text-indigo-700" },
  entregado: { label: "Entregado", className: "bg-sage/25 text-forest" },
  cancelado: { label: "Cancelado", className: "bg-red-100 text-red-700" },
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
};

export type PaymentMethod =
  | "contraentrega"
  | "transferencia"
  | "tarjeta"
  | "pse"
  | "nequi";

export const PAYMENT_METHODS: { id: PaymentMethod; label: string }[] = [
  { id: "contraentrega", label: "Pago contra entrega" },
  { id: "transferencia", label: "Transferencia bancaria" },
  { id: "tarjeta", label: "Tarjeta (crédito/débito)" },
  { id: "pse", label: "PSE" },
  { id: "nequi", label: "Nequi / Daviplata" },
];

export type Order = {
  id: string;
  customer: { name: string; phone: string; city: string };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  createdAt: string; // ISO
};

const KEY = "pd_orders_v2";

/* ---------- Datos demo ---------- */

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(9 + (n % 8), (n * 7) % 60, 0, 0);
  return d.toISOString();
}

function pick(id: string, qty = 1): OrderItem {
  const p = ALL_PRODUCTS.find((x) => x.id === id) ?? ALL_PRODUCTS[0];
  return { productId: p.id, name: p.name, price: p.price, qty };
}

function order(
  id: string,
  name: string,
  city: string,
  phone: string,
  items: OrderItem[],
  status: OrderStatus,
  day: number,
): Order {
  return {
    id,
    customer: { name, phone, city },
    items,
    total: items.reduce((s, it) => s + it.price * it.qty, 0),
    status,
    createdAt: daysAgo(day),
  };
}

function seed(): Order[] {
  return [
    order("PD-1042", "Valentina Ramírez", "Bogotá", "+57 310 555 1042", [pick("crema-hidratante-facial"), pick("serum-hidratante")], "entregado", 27),
    order("PD-1043", "Daniela Moreno", "Medellín", "+57 311 555 1043", [pick("botox-vegetal-efecto-tensor", 2)], "entregado", 24),
    order("PD-1044", "Carolina Peña", "Cali", "+57 312 555 1044", [pick("kit-noche-renovadora-reparacion-y-antiedad")], "enviado", 19),
    order("PD-1045", "Andrés Gómez", "Bogotá", "+57 313 555 1045", [pick("contorno-de-ojos"), pick("agua-micelar-con-extractos-naturales")], "entregado", 16),
    order("PD-1046", "Laura Castaño", "Barranquilla", "+57 314 555 1046", [pick("kit-colageno-y-elastina-reafirma-nutre-y-revitaliza")], "pagado", 12),
    order("PD-1047", "María José Ruiz", "Bogotá", "+57 315 555 1047", [pick("serum-revitalizante-facial"), pick("crema-hidratante-facial")], "enviado", 9),
    order("PD-1048", "Santiago Torres", "Bucaramanga", "+57 316 555 1048", [pick("kit-antiedad-reafirmante-y-regenerador")], "pagado", 6),
    order("PD-1049", "Paula Herrera", "Medellín", "+57 317 555 1049", [pick("serum-hidratante", 2)], "nuevo", 3),
    order("PD-1050", "Juliana Ríos", "Bogotá", "+57 318 555 1050", [pick("botox-vegetal-efecto-tensor"), pick("contorno-de-ojos")], "nuevo", 1),
    order("PD-1051", "Camila Vargas", "Pereira", "+57 319 555 1051", [pick("kit-glow-mananero-cuidado-facial-diario")], "cancelado", 14),
  ];
}

/* ---------- Persistencia reactiva ---------- */

let cache: Order[] | null = null;
const listeners = new Set<() => void>();

function read(): Order[] {
  if (typeof window === "undefined") return seed();
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Order[]) : seed();
  } catch {
    cache = seed();
  }
  return cache;
}

function write(next: Order[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    console.warn("No se pudo guardar pedidos:", e);
  }
  listeners.forEach((l) => l());
}

export function useOrders(): Order[] {
  const [state, setState] = useState<Order[]>(seed());
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

/* ---------- Acciones ---------- */

export function createOrder(input: {
  customer: Order["customer"];
  items: OrderItem[];
  paymentMethod?: PaymentMethod;
}): Order {
  const list = read();
  const next: Order = {
    id: `PD-${1052 + list.length}`,
    customer: input.customer,
    items: input.items,
    total: input.items.reduce((s, it) => s + it.price * it.qty, 0),
    status: "nuevo",
    paymentMethod: input.paymentMethod,
    createdAt: new Date().toISOString(),
  };
  write([next, ...list]);
  return next;
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  write(read().map((o) => (o.id === id ? { ...o, status } : o)));
}

export function deleteOrder(id: string) {
  write(read().filter((o) => o.id !== id));
}

export function resetOrders() {
  write(seed());
}

/* ---------- Analítica ---------- */

export type SalesStats = {
  revenue: number;
  orders: number;
  avgTicket: number;
  pending: number;
  daily: { label: string; value: number }[];
};

export function computeStats(orders: Order[]): SalesStats {
  const valid = orders.filter((o) => o.status !== "cancelado");
  const revenue = valid.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(
    (o) => o.status === "nuevo" || o.status === "pagado",
  ).length;

  // Ventas por día, últimos 14 días
  const days = 14;
  const daily: { label: string; value: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const value = valid
      .filter((o) => {
        const t = new Date(o.createdAt).getTime();
        return t >= d.getTime() && t < next.getTime();
      })
      .reduce((s, o) => s + o.total, 0);
    daily.push({ label: `${d.getDate()}/${d.getMonth() + 1}`, value });
  }

  return {
    revenue,
    orders: valid.length,
    avgTicket: valid.length ? Math.round(revenue / valid.length) : 0,
    pending,
    daily,
  };
}
