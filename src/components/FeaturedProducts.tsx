"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useVisibleProducts } from "@/lib/store";
import ProductCard from "./ui/ProductCard";
import Reveal from "./ui/Reveal";

// Una crema, un sérum y un kit representativos: cada categoría ya tiene su
// propia tarjeta arriba (CategoriesSection), así que aquí no repetimos
// filtros por categoría, solo la selección destacada del catálogo.
const FEATURED_IDS = [
  "botox-vegetal-efecto-tensor",
  "kit-colageno-y-elastina-reafirma-nutre-y-revitaliza",
  "serum-hidratante",
  "protector-solar-natural-spf-50",
];

export default function FeaturedProducts() {
  const all = useVisibleProducts();
  const visible = FEATURED_IDS.map((id) => all.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

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
