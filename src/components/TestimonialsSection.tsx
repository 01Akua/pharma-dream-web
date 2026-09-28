"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote, Check } from "lucide-react";
import { INSTAGRAM_TESTIMONIALS, addTestimonial, useApprovedTestimonials } from "@/lib/testimonials";
import Reveal from "./ui/Reveal";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${size} ${n <= value ? "fill-gold text-gold" : "text-sand"}`}
        />
      ))}
    </div>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TestimonialsSection() {
  const approved = useApprovedTestimonials();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSending(true);
    setError(false);
    try {
      await addTestimonial({ name, rating, comment });
      setSent(true);
      setName("");
      setComment("");
      setRating(5);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-cream-deep px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-gold-deep">Comunidad Pharma Dream</span>
          <h2 className="mt-4 font-display text-4xl font-medium text-forest sm:text-5xl">
            Lo que dicen quienes ya nos probaron
          </h2>
        </Reveal>

        {/* Capturas reales de Instagram */}
        {INSTAGRAM_TESTIMONIALS.length > 0 && (
          <Reveal delay={0.05} className="mt-14">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {INSTAGRAM_TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand shadow-soft"
                >
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-forest">
                    <InstagramIcon className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Reseñas aprobadas dejadas en el sitio */}
        {approved.length > 0 && (
          <Reveal delay={0.1} className="mt-14">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {approved.slice(0, 6).map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-3 rounded-2xl border border-sand bg-white p-6 shadow-soft"
                >
                  <Quote className="h-5 w-5 text-gold" />
                  <Stars value={t.rating} />
                  <p className="text-sm leading-relaxed text-ink">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                  <div className="mt-auto pt-2 text-xs uppercase tracking-wide text-ink-soft">
                    {t.name} · {fmtDate(t.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Formulario para dejar una reseña */}
        <Reveal delay={0.15} className="mt-16">
          <div className="mx-auto max-w-xl rounded-3xl bg-forest px-6 py-10 text-center shadow-card sm:px-10">
            <h3 className="font-display text-2xl font-medium text-cream">
              ¿Ya probaste Pharma Dream?
            </h3>
            <p className="mt-2 text-sm text-cream/75">
              Cuéntanos tu experiencia. Revisamos cada reseña antes de
              publicarla.
            </p>

            {sent ? (
              <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl bg-cream/10 px-6 py-8 text-cream">
                <Check className="h-6 w-6 text-gold-soft" />
                <p className="text-sm">
                  ¡Gracias por tu reseña! Se publicará en el sitio en cuanto
                  la aprobemos.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 flex flex-col gap-3 text-left">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full rounded-full border border-cream/20 bg-cream/95 px-5 py-3 text-sm text-forest outline-none placeholder:text-ink-soft focus:ring-2 focus:ring-gold"
                />
                <div className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/95 px-5 py-3">
                  <span className="text-sm text-ink-soft">Tu calificación:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        onClick={() => setRating(n)}
                        aria-label={`${n} estrellas`}
                      >
                        <Star
                          className={`h-5 w-5 ${
                            n <= rating ? "fill-gold text-gold" : "text-sand"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos qué te pareció el producto…"
                  rows={3}
                  className="w-full rounded-2xl border border-cream/20 bg-cream/95 px-5 py-3 text-sm text-forest outline-none placeholder:text-ink-soft focus:ring-2 focus:ring-gold"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-1 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-forest transition-all hover:bg-gold-soft disabled:opacity-60"
                >
                  {sending ? "Enviando…" : "Enviar mi reseña"}
                </button>
                {error && (
                  <p className="text-center text-xs text-red-300">
                    No pudimos enviar tu reseña. Intenta de nuevo en un
                    momento.
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
