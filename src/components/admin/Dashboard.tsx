"use client";

import {
  Package,
  Eye,
  DollarSign,
  ShoppingBag,
  Clock,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { useAllProducts } from "@/lib/store";
import { useOrders, computeStats } from "@/lib/crm";
import { formatCOP } from "@/lib/data";

export default function Dashboard({
  onGoToProducts,
  onGoToSales,
}: {
  onGoToProducts: () => void;
  onGoToSales: () => void;
}) {
  const products = useAllProducts();
  const orders = useOrders();
  const sales = computeStats(orders);
  const publicados = products.filter((p) => p.published).length;

  const stats = [
    {
      label: "Ingresos",
      value: formatCOP(sales.revenue),
      icon: DollarSign,
      tone: "bg-gold/20 text-gold-deep",
      onClick: onGoToSales,
    },
    {
      label: "Pedidos",
      value: sales.orders,
      icon: ShoppingBag,
      tone: "bg-olive/15 text-olive",
      onClick: onGoToSales,
    },
    {
      label: "Por gestionar",
      value: sales.pending,
      icon: Clock,
      tone: "bg-blue-100 text-blue-700",
      onClick: onGoToSales,
    },
    {
      label: "Productos publicados",
      value: `${publicados}/${products.length}`,
      icon: Eye,
      tone: "bg-sage/20 text-forest",
      onClick: onGoToProducts,
    },
  ];

  const recent = products.slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-forest">
            Resumen
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Vista general de tu catálogo.
          </p>
        </div>
        <button
          onClick={onGoToProducts}
          className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold hover:text-forest"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </button>
      </div>

      {/* Métricas */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={s.onClick}
            className="rounded-2xl bg-white p-5 text-left shadow-soft ring-1 ring-forest/5 transition hover:ring-gold/40"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}
            >
              <s.icon className="h-5 w-5" />
            </span>
            <div className="mt-4 font-display text-2xl font-semibold text-forest">
              {s.value}
            </div>
            <div className="text-sm text-ink-soft">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Recientes */}
      <div className="mt-10 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-forest/5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-forest">
            Productos recientes
          </h2>
          <button
            onClick={onGoToProducts}
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-deep hover:text-olive"
          >
            Ver todos <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 divide-y divide-sand">
          {recent.map((p) => (
            <div key={p.id} className="flex items-center gap-4 py-3">
              <span
                className="h-11 w-11 shrink-0 overflow-hidden rounded-lg"
                style={{
                  background:
                    "linear-gradient(150deg,#8a9a6b,#5a6b3b)",
                }}
              >
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-forest">
                  {p.name}
                </div>
                <div className="text-xs text-ink-soft">{p.category}</div>
              </div>
              <div className="text-sm font-semibold text-forest">
                {formatCOP(p.price)}
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold ${
                  p.published
                    ? "bg-sage/20 text-forest"
                    : "bg-sand text-ink-soft"
                }`}
              >
                {p.published ? "Publicado" : "Oculto"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
