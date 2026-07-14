"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Heart,
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { type Product, formatCOP, TONE_STYLES } from "@/lib/data";
import { useStoredProduct } from "@/lib/store";
import { addToCart, openCartDrawer } from "@/lib/cart";
import CheckoutModal from "./CheckoutModal";

function StudioCard({
  product,
  angle = 150,
  small = false,
}: {
  product: Product;
  angle?: number;
  small?: boolean;
}) {
  const tone = TONE_STYLES[product.tone];
  const bg = tone.bg.replace(/^linear-gradient\(\d+deg/, `linear-gradient(${angle}deg`);

  if (product.image) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl"
      style={{ background: bg }}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex flex-col items-center text-center">
        <div
          className={`relative flex flex-col items-center justify-end rounded-[2rem] rounded-t-md bg-white/15 backdrop-blur-[2px] ring-1 ring-white/25 ${
            small ? "h-20 w-12 pb-2" : "h-48 w-28 pb-5"
          }`}
        >
          <span
            className={`absolute rounded-t-md bg-white/25 ring-1 ring-white/30 ${
              small ? "-top-2 h-3 w-5" : "-top-4 h-7 w-10"
            }`}
          />
          {!small && (
            <>
              <span
                className="text-[0.6rem] font-bold tracking-[0.2em]"
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
            </>
          )}
        </div>
        {!small && (
          <>
            <h4
              className="mt-5 font-display text-3xl font-semibold leading-none"
              style={{ color: tone.text }}
            >
              {product.label}
            </h4>
            <span
              className="mt-1.5 text-sm tracking-[0.18em] uppercase"
              style={{ color: tone.sub }}
            >
              {product.sub}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductDetail({ product: initial }: { product: Product }) {
  const product = useStoredProduct(initial.id, initial) ?? initial;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [angle, setAngle] = useState(150);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkout, setCheckout] = useState(false);

  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;
  const keyIngredients = product.keyIngredients?.slice(0, 4) ?? [];

  const faqs = [
    product.includes && {
      q: "🌿 Este kit incluye",
      list: product.includes,
    },
    product.keyIngredients && {
      q: "💧 Ingredientes principales",
      items: product.keyIngredients,
    },
    product.inci && {
      q: "⚗️ Composición (INCI)",
      text: product.inci,
    },
    (product.howToUse || product.warnings) && {
      q: "💫 Modo de empleo y recomendaciones",
      steps: product.howToUse,
      warnings: product.warnings,
    },
  ].filter(Boolean) as {
    q: string;
    list?: string[];
    items?: { name: string; benefit: string }[];
    text?: string;
    steps?: string[];
    warnings?: string[];
  }[];

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {/* Galería */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <motion.div
          key={angle}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className="aspect-square w-full shadow-card"
        >
          <StudioCard product={product} angle={angle} />
        </motion.div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[150, 110, 200, 60].map((a) => (
            <button
              key={a}
              onClick={() => setAngle(a)}
              className={`aspect-square overflow-hidden rounded-xl ring-2 transition ${
                angle === a ? "ring-gold" : "ring-transparent hover:ring-sand"
              }`}
            >
              <StudioCard product={product} angle={a} small />
            </button>
          ))}
        </div>

        {/* Video de modo de uso (clip corto sin audio) */}
        {(product.videos ?? (product.video ? [product.video] : [])).length > 0 && (
          <div
            className={`mt-4 grid gap-3 ${
              (product.videos?.length ?? 1) > 1 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {(product.videos ?? [product.video!]).map((v) => (
              <div
                key={v}
                className="aspect-[9/16] overflow-hidden rounded-2xl bg-cream-deep shadow-soft"
              >
                <video
                  src={v}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.18em] text-sage">
            {product.category}
          </span>
          {discount > 0 && (
            <span className="rounded-full bg-forest px-2.5 py-0.5 text-[0.65rem] font-bold text-gold-soft">
              -{discount}% OFF
            </span>
          )}
        </div>

        <h1 className="mt-2 font-display text-4xl font-medium text-forest">
          {product.name}
        </h1>

        {product.reviews > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating)
                      ? "fill-gold text-gold"
                      : "text-sand"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-ink-soft">
              {product.rating} · {product.reviews} reseñas
            </span>
          </div>
        )}

        <div className="mt-5 flex items-end gap-3">
          <span className="font-display text-3xl font-semibold text-forest">
            {formatCOP(product.price)}
          </span>
          {product.compareAt && (
            <span className="pb-1 text-lg text-ink-soft line-through">
              {formatCOP(product.compareAt)}
            </span>
          )}
        </div>

        <p className="mt-5 leading-relaxed text-ink">{product.tagline}</p>
        {product.description && (
          <p className="mt-3 leading-relaxed text-ink-soft">
            {product.description}
          </p>
        )}

        {product.benefits && product.benefits.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                {b}
              </li>
            ))}
          </ul>
        )}

        {/* Ingredientes clave */}
        <div className="mt-6 flex flex-wrap gap-2">
          {keyIngredients.map((ing) => (
            <span
              key={ing.name}
              className="inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-3 py-1.5 text-xs font-medium text-forest"
            >
              <Leaf className="h-3.5 w-3.5 text-olive" />
              {ing.name}
            </span>
          ))}
        </div>

        {/* Cantidad + acciones */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border border-sand bg-white">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-11 w-11 items-center justify-center text-forest hover:text-gold"
              aria-label="Disminuir"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-semibold text-forest">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="flex h-11 w-11 items-center justify-center text-forest hover:text-gold"
              aria-label="Aumentar"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => {
              addToCart(product, qty);
              setAdded(true);
              setTimeout(() => setAdded(false), 1800);
              setTimeout(() => openCartDrawer(), 300);
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all ${
              added
                ? "bg-olive text-cream"
                : "bg-forest text-cream hover:bg-gold hover:text-forest"
            }`}
          >
            {added ? (
              <>
                <Check className="h-5 w-5" /> Añadido a la cesta
              </>
            ) : (
              "Añadir a la cesta"
            )}
          </button>

          <button
            aria-label="Guardar"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-sand text-forest transition hover:border-gold hover:text-gold"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={() => setCheckout(true)}
          className="mt-3 w-full rounded-full bg-gold py-3.5 text-sm font-semibold text-forest transition hover:bg-gold-soft"
        >
          Comprar ahora
        </button>

        {/* Beneficios */}
        <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl bg-cream-deep p-4 sm:grid-cols-3">
          {[
            { icon: Truck, t: "Envío gratis", s: "Desde $200.000" },
            { icon: ShieldCheck, t: "Pago seguro", s: "Tarjeta · PSE · Bold" },
            { icon: Leaf, t: "100% natural", s: "Activos vegetales" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-2.5">
              <b.icon className="h-5 w-5 shrink-0 text-olive" />
              <div className="leading-tight">
                <div className="text-xs font-semibold text-forest">{b.t}</div>
                <div className="text-[0.7rem] text-ink-soft">{b.s}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Acordeón */}
        <div className="mt-8 divide-y divide-sand border-t border-sand">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left font-medium text-forest"
              >
                {f.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden text-sm leading-relaxed text-ink-soft transition-all ${
                  openFaq === i ? "max-h-[1000px] pb-5" : "max-h-0"
                }`}
              >
                {f.list && (
                  <ul className="space-y-2">
                    {f.list.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {f.items && (
                  <dl className="space-y-3">
                    {f.items.map((ing) => (
                      <div key={ing.name}>
                        <dt className="font-semibold text-forest">{ing.name}</dt>
                        <dd>{ing.benefit}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {f.text && <p>{f.text}</p>}
                {f.steps && (
                  <ol className="list-decimal space-y-1.5 pl-4">
                    {f.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                )}
                {f.warnings && (
                  <ul className="mt-4 space-y-1.5 border-t border-sand pt-4">
                    {f.warnings.map((w) => (
                      <li key={w} className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {checkout && (
        <CheckoutModal
          items={[
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              qty,
            },
          ]}
          onClose={() => setCheckout(false)}
        />
      )}
    </div>
  );
}
