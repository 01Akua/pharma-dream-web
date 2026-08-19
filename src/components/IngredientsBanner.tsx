import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function IngredientsBanner() {
  return (
    <section className="bg-olive/15 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center sm:flex-row sm:text-left lg:px-8">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
            <Leaf className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-forest">
              Conoce nuestros ingredientes
            </h3>
            <p className="text-sm text-ink-soft">
              Qué es el HEMP, qué significa &ldquo;fitomolecular&rdquo; y qué hace cada
              activo natural en tu piel, explicado en palabras simples.
            </p>
          </div>
        </div>
        <Link
          href="/ingredientes"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-olive"
        >
          Ver ingredientes
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
