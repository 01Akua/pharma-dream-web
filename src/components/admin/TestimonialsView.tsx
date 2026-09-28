"use client";

import { Star, Check, Trash2, MessageSquareQuote } from "lucide-react";
import {
  deleteTestimonial,
  setTestimonialApproved,
  useAllTestimonials,
} from "@/lib/testimonials";
import type { Notify } from "./AdminApp";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TestimonialsView({ notify }: { notify: Notify }) {
  const items = useAllTestimonials();
  const pending = items.filter((t) => !t.approved);
  const approved = items.filter((t) => t.approved);

  const approve = async (id: string) => {
    await setTestimonialApproved(id, true);
    notify("Reseña publicada en el sitio");
  };

  const unapprove = async (id: string) => {
    await setTestimonialApproved(id, false);
    notify("Reseña oculta del sitio");
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar esta reseña definitivamente?")) return;
    await deleteTestimonial(id);
    notify("Reseña eliminada");
  };

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-semibold text-forest">
          Testimonios
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Reseñas dejadas desde el formulario del sitio. Apruébalas para que
          aparezcan en la sección de testimonios del home.
        </p>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Pendientes de revisión
          <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs text-gold-deep">
            {pending.length}
          </span>
        </h2>
        <div className="space-y-3">
          {pending.length === 0 && (
            <p className="rounded-2xl border border-sand bg-white p-6 text-center text-sm text-ink-soft">
              No hay reseñas pendientes.
            </p>
          )}
          {pending.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-3 rounded-2xl border border-sand bg-white p-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`h-3.5 w-3.5 ${
                          n <= t.rating ? "fill-gold text-gold" : "text-sand"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="text-xs text-ink-soft">
                    {fmtDate(t.createdAt)}
                  </span>
                </div>
                <p className="mt-1.5 max-w-xl text-sm text-ink-soft">
                  {t.comment}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => approve(t.id)}
                  className="flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-medium text-cream hover:bg-forest/90"
                >
                  <Check className="h-3.5 w-3.5" /> Aprobar
                </button>
                <button
                  onClick={() => remove(t.id)}
                  className="flex items-center gap-1.5 rounded-full border border-sand px-4 py-2 text-xs font-medium text-ink-soft hover:bg-sand"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Descartar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-soft">
          <MessageSquareQuote className="h-4 w-4" /> Publicadas en el sitio
          <span className="rounded-full bg-sage/25 px-2 py-0.5 text-xs text-forest">
            {approved.length}
          </span>
        </h2>
        <div className="space-y-3">
          {approved.length === 0 && (
            <p className="rounded-2xl border border-sand bg-white p-6 text-center text-sm text-ink-soft">
              Todavía no hay reseñas publicadas.
            </p>
          )}
          {approved.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-3 rounded-2xl border border-sand bg-white p-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`h-3.5 w-3.5 ${
                          n <= t.rating ? "fill-gold text-gold" : "text-sand"
                        }`}
                      />
                    ))}
                  </span>
                </div>
                <p className="mt-1.5 max-w-xl text-sm text-ink-soft">
                  {t.comment}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => unapprove(t.id)}
                  className="rounded-full border border-sand px-4 py-2 text-xs font-medium text-ink-soft hover:bg-sand"
                >
                  Ocultar
                </button>
                <button
                  onClick={() => remove(t.id)}
                  className="flex items-center gap-1.5 rounded-full border border-sand px-4 py-2 text-xs font-medium text-ink-soft hover:bg-sand"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
