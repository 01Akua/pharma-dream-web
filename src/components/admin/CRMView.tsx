"use client";

import { useMemo, useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  Search,
  Trash2,
  Eye,
} from "lucide-react";
import {
  useOrders,
  computeStats,
  updateOrderStatus,
  deleteOrder,
  STATUS_META,
  type Order,
  type OrderStatus,
} from "@/lib/crm";
import { formatCOP } from "@/lib/data";
import type { Notify } from "./AdminApp";

const STATUSES: OrderStatus[] = [
  "nuevo",
  "pagado",
  "enviado",
  "entregado",
  "cancelado",
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
  });
}

export default function CRMView({ notify }: { notify: Notify }) {
  const orders = useOrders();
  const stats = useMemo(() => computeStats(orders), [orders]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"todos" | OrderStatus>("todos");
  const [detail, setDetail] = useState<Order | null>(null);

  const maxDaily = Math.max(1, ...stats.daily.map((d) => d.value));

  const filtered = orders.filter((o) => {
    const mF = filter === "todos" || o.status === filter;
    const mQ =
      o.customer.name.toLowerCase().includes(query.toLowerCase()) ||
      o.id.toLowerCase().includes(query.toLowerCase());
    return mF && mQ;
  });

  const cards = [
    {
      label: "Ingresos",
      value: formatCOP(stats.revenue),
      icon: DollarSign,
      tone: "bg-gold/20 text-gold-deep",
    },
    {
      label: "Pedidos",
      value: stats.orders,
      icon: ShoppingBag,
      tone: "bg-olive/15 text-olive",
    },
    {
      label: "Ticket promedio",
      value: formatCOP(stats.avgTicket),
      icon: TrendingUp,
      tone: "bg-sage/20 text-forest",
    },
    {
      label: "Por gestionar",
      value: stats.pending,
      icon: Clock,
      tone: "bg-blue-100 text-blue-700",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-forest">
        Ventas
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        Control de pedidos y desempeño de la tienda.
      </p>

      {/* Métricas */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-forest/5"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.tone}`}
            >
              <c.icon className="h-5 w-5" />
            </span>
            <div className="mt-4 font-display text-2xl font-semibold text-forest">
              {c.value}
            </div>
            <div className="text-sm text-ink-soft">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-forest/5">
        <h2 className="font-display text-lg font-semibold text-forest">
          Ventas · últimos 14 días
        </h2>
        <div className="mt-6 flex items-end gap-1.5" style={{ height: 170 }}>
          {stats.daily.map((d, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col items-center justify-end gap-2"
            >
              <div
                className="w-full rounded-t bg-gradient-to-t from-olive to-sage transition-all hover:from-forest hover:to-olive"
                style={{
                  height: d.value
                    ? Math.max(4, Math.round((d.value / maxDaily) * 140))
                    : 2,
                  opacity: d.value ? 1 : 0.35,
                }}
                title={`${d.label}: ${formatCOP(d.value)}`}
              />
              <span className="text-[0.6rem] text-ink-soft">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-sand bg-white px-4">
          <Search className="h-4 w-4 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por cliente o nº de pedido…"
            className="w-full bg-transparent py-2.5 text-sm text-forest outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["todos", ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3.5 py-2 text-xs font-medium capitalize transition ${
                filter === s
                  ? "bg-forest text-cream"
                  : "bg-white text-forest hover:bg-sand"
              }`}
            >
              {s === "todos" ? "Todos" : STATUS_META[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-forest/5">
        <div className="hidden grid-cols-[110px_1fr_130px_110px_150px_80px] gap-4 border-b border-sand px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-soft lg:grid">
          <span>Pedido</span>
          <span>Cliente</span>
          <span>Fecha</span>
          <span>Total</span>
          <span>Estado</span>
          <span className="text-right">Acciones</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-ink-soft">
            No hay pedidos que coincidan.
          </div>
        ) : (
          filtered.map((o) => (
            <div
              key={o.id}
              className="grid grid-cols-1 gap-2 border-b border-sand px-5 py-4 last:border-0 lg:grid-cols-[110px_1fr_130px_110px_150px_80px] lg:items-center lg:gap-4"
            >
              <div className="font-mono text-sm font-semibold text-forest">
                {o.id}
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-forest">
                  {o.customer.name}
                </div>
                <div className="truncate text-xs text-ink-soft">
                  {o.customer.city} · {o.items.length} art.
                </div>
              </div>
              <div className="text-sm text-ink-soft">{fmtDate(o.createdAt)}</div>
              <div className="text-sm font-semibold text-forest">
                {formatCOP(o.total)}
              </div>
              <div>
                <select
                  value={o.status}
                  onChange={(e) => {
                    updateOrderStatus(o.id, e.target.value as OrderStatus);
                    notify(`Pedido ${o.id} → ${STATUS_META[e.target.value as OrderStatus].label}`);
                  }}
                  className={`w-full rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${STATUS_META[o.status].className}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_META[s].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 lg:justify-end">
                <button
                  onClick={() => setDetail(o)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-deep text-forest transition hover:bg-forest hover:text-cream"
                  aria-label="Ver detalle"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    deleteOrder(o.id);
                    notify(`Pedido ${o.id} eliminado`);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-deep text-red-600 transition hover:bg-red-600 hover:text-cream"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detalle */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-forest/50 backdrop-blur-sm"
            onClick={() => setDetail(null)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-cream p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-forest">
                Pedido {detail.id}
              </h3>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_META[detail.status].className}`}
              >
                {STATUS_META[detail.status].label}
              </span>
            </div>
            <div className="mt-4 rounded-xl bg-white p-4 text-sm">
              <div className="font-medium text-forest">
                {detail.customer.name}
              </div>
              <div className="text-ink-soft">
                {detail.customer.city} · {detail.customer.phone}
              </div>
              <div className="mt-1 text-xs text-ink-soft">
                {new Date(detail.createdAt).toLocaleString("es-CO")}
              </div>
            </div>
            <div className="mt-4 divide-y divide-sand">
              {detail.items.map((it, i) => (
                <div key={i} className="flex justify-between py-2.5 text-sm">
                  <span className="text-ink">
                    {it.qty}× {it.name}
                  </span>
                  <span className="font-medium text-forest">
                    {formatCOP(it.price * it.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-between border-t border-sand pt-3 font-display text-lg font-semibold text-forest">
              <span>Total</span>
              <span>{formatCOP(detail.total)}</span>
            </div>
            <button
              onClick={() => setDetail(null)}
              className="mt-6 w-full rounded-full bg-forest py-2.5 text-sm font-semibold text-cream hover:bg-gold hover:text-forest"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
