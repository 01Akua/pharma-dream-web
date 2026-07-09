"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/lib/content";

export default function Hero() {
  const { hero: slides } = useContent();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[index % slides.length];

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Fondo con crossfade */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay neutro, solo para legibilidad del texto (sin tinte de color) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow text-gold-soft">{slide.eyebrow}</span>
              <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
                {slide.subtitle}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#productos"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-forest shadow-soft transition-all hover:bg-gold-soft hover:shadow-card"
                >
                  {slide.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#ciencia"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:border-cream hover:bg-cream/10"
                >
                  Nuestra ciencia
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicadores */}
          <div className="mt-14 flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className="group relative h-1 overflow-hidden rounded-full bg-cream/30 transition-all"
                style={{ width: i === index ? 44 : 22 }}
              >
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-0 bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6.5, ease: "linear" }}
                    style={{ originX: 0 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sello flotante */}
      <div className="absolute bottom-10 right-8 z-10 hidden animate-floaty lg:block">
        <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-gold/40 bg-forest/30 text-center backdrop-blur-sm">
          <span className="font-display text-2xl font-semibold text-gold-soft">
            100%
          </span>
          <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-cream/80">
            Activos
            <br />
            naturales
          </span>
        </div>
      </div>
    </section>
  );
}
