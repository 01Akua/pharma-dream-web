"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useVisibleProducts } from "@/lib/store";
import ProductCard from "./ui/ProductCard";

const filters = ["Todos", "Cremas", "Sérums", "Kits"] as const;
type Filter = (typeof filters)[number];

const sorts = {
  destacados: "Destacados",
  precioAsc: "Precio: menor a mayor",
  precioDesc: "Precio: mayor a menor",
  rating: "Mejor valorados",
} as const;
type SortKey = keyof typeof sorts;

export default function ShopGrid() {
  const params = useSearchParams();
  const initial = (params.get("cat") as Filter) || "Todos";
  const [filter, setFilter] = useState<Filter>(
    filters.includes(initial) ? initial : "Todos",
  );
  const [sort, setSort] = useState<SortKey>("destacados");
  const products = useVisibleProducts();

  const visible = useMemo(() => {
    let list =
      filter === "Todos"
        ? [...products]
        : products.filter((p) => p.category === filter);
    if (sort === "precioAsc") list = list.sort((a, b) => a.price - b.price);
    if (sort === "precioDesc") list = list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filter, sort, products]);

  return (
    <>
      {/* Barra de filtros */}
      <div className="flex flex-col gap-4 border-y border-sand py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? "bg-forest text-cream shadow-soft"
                  : "bg-white text-forest hover:bg-sand"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-soft">{visible.length} productos</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-sand bg-white px-4 py-2 text-sm text-forest outline-none focus:ring-2 focus:ring-gold"
          >
            {Object.entries(sorts).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
