import Image from "next/image";
import { FlaskConical, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { INGREDIENTS, UNSPLASH } from "@/lib/data";
import Reveal from "./ui/Reveal";

const badges = [
  { icon: Leaf, label: "Activos vegetales bioactivos" },
  { icon: ShieldCheck, label: "Notificación sanitaria INVIMA" },
  { icon: FlaskConical, label: "Tecnología Fitomolecular" },
  { icon: Sparkles, label: "Libre de crueldad animal" },
];

export default function ScienceSection() {
  return (
    <section id="ciencia" className="relative overflow-hidden bg-forest py-24 text-cream">
      {/* textura decorativa */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-olive/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Imagen */}
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
                <Image
                  src={UNSPLASH("1466781783364-36c955e42a7f", 1000, 80)}
                  alt="Cuidado de la piel con activos naturales"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
              </div>
              {/* tarjeta flotante */}
              <div className="absolute -bottom-6 -right-4 w-48 rounded-2xl bg-cream p-5 text-forest shadow-card sm:-right-8">
                <span className="font-display text-3xl font-semibold">+98%</span>
                <p className="mt-1 text-xs leading-snug text-ink-soft">
                  reportó una piel más hidratada y confortable tras 4 semanas.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Texto + ingredientes */}
          <div>
            <Reveal>
              <span className="eyebrow text-gold-soft">Respaldado por la ciencia</span>
              <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
                Dermocosmética avanzada para piel sensible y reactiva
              </h2>
              <p className="mt-5 max-w-lg text-cream/80">
                Integramos Tecnología Fitomolecular y activos vegetales bioactivos
                para optimizar la afinidad cutánea y fortalecer la barrera natural
                de la piel. Productos seguros, eficaces y adaptados a ti.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {INGREDIENTS.map((ing, i) => (
                <Reveal key={ing.name} delay={i * 0.06}>
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-olive/40 ring-1 ring-gold/30">
                      <Leaf className="h-3.5 w-3.5 text-gold-soft" />
                    </span>
                    <div>
                      <h4 className="font-display text-base font-semibold text-cream">
                        {ing.name}
                      </h4>
                      <p className="text-sm text-cream/70">{ing.benefit}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Sellos de confianza */}
        <Reveal>
          <div className="mt-20 grid grid-cols-2 gap-4 border-t border-cream/15 pt-10 md:grid-cols-4">
            {badges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-3 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 ring-1 ring-gold/30">
                  <b.icon className="h-5 w-5 text-gold-soft" />
                </span>
                <span className="text-sm text-cream/80">{b.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
