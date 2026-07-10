"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Package,
} from "lucide-react";
import {
  useAllProducts,
  deleteProduct,
  togglePublished,
  type StoredProduct,
} from "@/lib/store";
import { formatCOP, CATEGORY_NAMES } from "@/lib/data";
import type { Notify } from "./AdminApp";
import ProductEditor from "./ProductEditor";

export default function ProductsView({ notify }: { notify: Notify }) {
  const products = useAllProducts();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"Todos" | (typeof CATEGORY_NAMES)[number]>(
    "Todos",
  );
  const [editing, setEditing] = useState<StoredProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = cat === "Todos" || p.category === cat;
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [products, cat, query]);

  const closeEditor = () => {
    setEditing(null);
    setCreating(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-forest">
            Productos
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {products.length} productos en el catálogo.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold hover:text-forest"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </button>
      </div>

      {/* Filtros */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-sand bg-white px-4">
          <Search className="h-4 w-4 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto…"
            className="w-full bg-transparent py-2.5 text-sm text-forest outline-none"
          />
        </div>
        <div className="flex gap-1.5">
          {(["Todos", ...CATEGORY_NAMES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                cat === c
                  ? "bg-forest text-cream"
                  : "bg-white text-forest hover:bg-sand"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-forest/5">
        {/* Cabecera (desktop) */}
        <div className="hidden grid-cols-[1fr_120px_120px_110px_120px] gap-4 border-b border-sand px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-soft lg:grid">
          <span>Producto</span>
          <span>Categoría</span>
          <span>Precio</span>
          <span>Estado</span>
          <span className="text-right">Acciones</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-ink-soft">
            <Package className="h-8 w-8" />
            <p>No hay productos que coincidan.</p>
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-1 gap-3 border-b border-sand px-5 py-4 last:border-0 lg:grid-cols-[1fr_120px_120px_110px_120px] lg:items-center lg:gap-4"
            >
              {/* Producto */}
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="h-11 w-11 shrink-0 overflow-hidden rounded-lg ring-1 ring-forest/10"
                  style={{ background: "linear-gradient(150deg,#8a9a6b,#5a6b3b)" }}
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
                <div className="min-w-0">
                  <div className="truncate font-medium text-forest">{p.name}</div>
                  <div className="truncate text-xs text-ink-soft">
                    {p.tagline}
                  </div>
                </div>
              </div>

              {/* Categoría */}
              <div className="text-sm text-ink-soft">
                <span className="lg:hidden">Categoría: </span>
                {p.category}
              </div>

              {/* Precio */}
              <div className="text-sm font-semibold text-forest">
                {formatCOP(p.price)}
              </div>

              {/* Estado */}
              <div>
                <button
                  onClick={() => {
                    togglePublished(p.id);
                    notify(
                      p.published
                        ? `“${p.name}” ocultado`
                        : `“${p.name}” publicado`,
                    );
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold transition ${
                    p.published
                      ? "bg-sage/20 text-forest hover:bg-sage/30"
                      : "bg-sand text-ink-soft hover:bg-sand/70"
                  }`}
                >
                  {p.published ? (
                    <Eye className="h-3.5 w-3.5" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5" />
                  )}
                  {p.published ? "Publicado" : "Oculto"}
                </button>
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-2 lg:justify-end">
                <button
                  onClick={() => setEditing(p)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-deep text-forest transition hover:bg-forest hover:text-cream"
                  aria-label="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setConfirmId(p.id)}
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

      {/* Editor (crear / editar) */}
      {(editing || creating) && (
        <ProductEditor
          product={editing}
          onClose={closeEditor}
          notify={notify}
        />
      )}

      {/* Confirmación de borrado */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-forest/50 backdrop-blur-sm"
            onClick={() => setConfirmId(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-cream p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-forest">
              ¿Eliminar producto?
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Esta acción no se puede deshacer.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 rounded-full border border-sand py-2.5 text-sm font-semibold text-forest hover:bg-sand"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const prod = products.find((x) => x.id === confirmId);
                  deleteProduct(confirmId);
                  setConfirmId(null);
                  notify(`“${prod?.name ?? "Producto"}” eliminado`);
                }}
                className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-cream hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
