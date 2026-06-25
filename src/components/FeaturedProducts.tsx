"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, KITS, type Product } from "@/lib/data";
import ProductCard from "./ui/ProductCard";
import Reveal from "./ui/Reveal";

const filters = ["Todos", "Cremas", "Sérums", "Kits"] as const;
type Filter = (typeof filters)[number];

const ALL = [...PRODUCTS, ...KITS];

export default function FeaturedProducts() {
  const [filter, setFilter] = useState<Filter>("Todos");

  const visible: Product[] =
    filter === "Todos" ? ALL : ALL.filter((p) => p.category === filter);

  return (
    <section id="productos" className="relative bg-cream-deep py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col items-center text-center">
          <span className="eyebrow text-gold-deep">Lo más querido</span>
          <h2 className="mt-4 font-display text-4xl font-medium text-forest sm:text-5xl">
            Productos destacados
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            Dermocosmética de lujo formulada con activos vegetales bioactivos y
            respaldada por la ciencia.
          </p>
        </Reveal>

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
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

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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

        <div className="mt-14 flex justify-center">
          <Link
            href="/tienda"
            className="group inline-flex items-center gap-2 rounded-full border border-forest px-8 py-3.5 text-sm font-semibold text-forest transition-all hover:bg-forest hover:text-cream"
          >
            Ver todo el catálogo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
