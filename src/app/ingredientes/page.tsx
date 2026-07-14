import type { Metadata } from "next";
import Image from "next/image";
import { Droplet, Leaf, FlaskConical } from "lucide-react";
import { INGREDIENT_CATEGORIES } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Ingredientes — Pharma Dream",
  description:
    "Aguas infusionadas, extractos naturales y aceites de origen vegetal detrás de cada fórmula Pharma Dream, con su nombre INCI.",
};

const categoryIcons: Record<string, typeof Leaf> = {
  "Aguas Infusionadas": Droplet,
  "Extractos Naturales": Leaf,
  Aceites: FlaskConical,
};

export default function IngredientesPage() {
  return (
    <main className="flex-1 pt-[110px]">
      <section className="bg-forest px-5 py-16 text-cream lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-gold-soft">Orgullosamente naturales</span>
          <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
            Nuestros ingredientes
          </h1>
          <p className="mt-4 leading-relaxed text-cream/80">
            En Pharma Dream creemos firmemente en el poder de la naturaleza
            para cuidar y embellecer la piel. Cada fórmula es el resultado de
            una combinación armoniosa de extractos vegetales y aceites
            esenciales que trabajan en sinergia para potenciar la salud y la
            belleza de tu piel — libres de químicos agresivos, respetando
            tanto tu bienestar como el del medio ambiente.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          {INGREDIENT_CATEGORIES.map((cat, ci) => {
            const Icon = categoryIcons[cat.category] ?? Leaf;
            return (
              <Reveal key={cat.category} delay={ci * 0.08}>
                <div className={ci > 0 ? "mt-14" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-forest">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-forest">
                      {cat.category}
                    </h2>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-forest/5"
                      >
                        <div className="relative aspect-[4/3] w-full bg-sand">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="font-medium text-forest">{item.name}</div>
                          <div className="mt-0.5 text-xs italic text-ink-soft">
                            {item.inci}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
