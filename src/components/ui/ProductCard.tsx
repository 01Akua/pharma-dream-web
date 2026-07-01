"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Plus, Star } from "lucide-react";
import { type Product, formatCOP, TONE_STYLES } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const tone = TONE_STYLES[product.tone];
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-forest/5"
    >
      {/* "Studio card" del producto */}
      <Link
        href={`/producto/${product.id}`}
        aria-label={`Ver ${product.name}`}
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden"
        style={{ background: tone.bg }}
      >
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-forest px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-gold-soft">
            -{discount}%
          </span>
        )}

        {/* Imagen subida desde el panel admin (si existe) */}
        {product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* halo decorativo */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />

        {/* "botella" simulada con tipografía de empaque */}
        <div
          className={`relative flex flex-col items-center text-center transition-transform duration-700 group-hover:scale-[1.04] ${
            product.image ? "hidden" : ""
          }`}
        >
          <div className="relative flex h-40 w-24 flex-col items-center justify-end rounded-[2rem] rounded-t-md bg-white/15 pb-4 backdrop-blur-[2px] ring-1 ring-white/25">
            <span className="absolute -top-4 h-7 w-9 rounded-t-md bg-white/25 ring-1 ring-white/30" />
            <span
              className="text-[0.55rem] font-bold tracking-[0.2em]"
              style={{ color: tone.text }}
            >
              PHARMA
            </span>
            <span
              className="mb-1 text-[0.45rem] tracking-[0.3em]"
              style={{ color: tone.sub }}
            >
              DREAM
            </span>
          </div>
          <h4
            className="mt-5 font-display text-2xl font-semibold leading-none"
            style={{ color: tone.text }}
          >
            {product.label}
          </h4>
          <span
            className="mt-1 text-xs tracking-[0.18em] uppercase"
            style={{ color: tone.sub }}
          >
            {product.sub}
          </span>
        </div>
      </Link>

      {/* Detalle */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-gold">
          <Star className="h-3.5 w-3.5 fill-gold" />
          <span className="text-xs font-semibold text-ink">{product.rating}</span>
          <span className="text-xs text-ink-soft">({product.reviews})</span>
          <span className="ml-auto text-[0.65rem] uppercase tracking-wider text-sage">
            {product.category}
          </span>
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold text-forest">
          <Link
            href={`/producto/${product.id}`}
            className="transition-colors hover:text-olive"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {product.tagline}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-col">
            {product.compareAt && (
              <span className="text-xs text-ink-soft line-through">
                {formatCOP(product.compareAt)}
              </span>
            )}
            <span className="font-display text-xl font-semibold text-forest">
              {formatCOP(product.price)}
            </span>
          </div>

          <button
            onClick={() => {
              setAdded(true);
              setTimeout(() => setAdded(false), 1600);
            }}
            aria-label={`Añadir ${product.name} al carrito`}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
              added
                ? "bg-olive text-cream"
                : "bg-forest text-cream hover:bg-gold hover:text-forest"
            }`}
          >
            {added ? (
              <Check className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
