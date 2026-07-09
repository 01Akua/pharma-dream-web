"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useVisibleProducts } from "@/lib/store";
import ProductCard from "./ui/ProductCard";

const filters = ["Cremas", "Sérums", "Kits"] as const;
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
  const initial = params.get("cat") as Filter | null;
  const [filter, setFilter] = useState<Filter | null>(
    initial && filters.includes(initial) ? initial : null,
  );
  const [sort, setSort] = useState<SortKey>("destacados");
  const products = useVisibleProducts();

  const visible = useMemo(() => {
    if (!filter) return [];
    let list = products.filter((p) => p.category === filter);
    if (sort === "precioAsc") list = list.sort((a, b) => a.price - b.price);
    if (sort === "precioDesc") list = list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list = list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filter, sort, products]);

  if (!filter) {
    return (
      <div className="py-4">
        <p className="text-center text-sm uppercase tracking-[0.14em] text-sage">
          Elige una categoría para ver los productos
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setFilter(cat.name as Filter)}
              className="group relative block h-80 overflow-hidden rounded-3xl text-left shadow-soft"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-semibold text-cream">
                    {cat.name}
                  </h3>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm transition-all duration-300 group-hover:bg-gold group-hover:text-forest">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-1.5 max-w-xs text-sm text-cream/80">
                  {cat.description}
                </p>
                <span className="mt-3 inline-block text-[0.7rem] uppercase tracking-[0.18em] text-gold-soft">
                  {cat.count} productos
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Barra de filtros */}
      <div className="flex flex-col gap-4 border-y border-sand py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter(null)}
            className="rounded-full border border-sand px-5 py-2 text-sm font-medium text-ink-soft transition-all duration-300 hover:bg-sand"
          >
            ← Categorías
          </button>
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
