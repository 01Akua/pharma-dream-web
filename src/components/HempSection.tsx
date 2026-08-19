"use client";

import Image from "next/image";
import { Droplets, Flame, Leaf, Sparkles, Sprout } from "lucide-react";
import { withBasePath } from "@/lib/paths";
import Reveal from "./ui/Reveal";

const hempBenefits = [
  {
    icon: Droplets,
    title: "Hidratación profunda",
    text: "Restablece la barrera cutánea y mantiene la piel suave.",
  },
  {
    icon: Flame,
    title: "Efecto calmante",
    text: "Alivia rojeces, picazón e irritaciones gracias a sus propiedades antiinflamatorias.",
  },
  {
    icon: Sparkles,
    title: "Acción antioxidante",
    text: "Protege frente al daño oxidativo y previene el envejecimiento prematuro.",
  },
  {
    icon: Sprout,
    title: "Regeneración celular",
    text: "Favorece la cicatrización y mejora la apariencia de cicatrices, quemaduras o eccemas.",
  },
  {
    icon: Leaf,
    title: "Antiedad natural",
    text: "Estimula la producción de colágeno y ayuda a mantener la elasticidad de la piel.",
  },
];

export default function HempSection() {
  return (
    <section id="hemp" className="bg-forest py-24 text-cream">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow text-gold-soft">El corazón de Pharma Dream</span>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
              ¿Qué es el HEMP?
            </h2>
            <p className="mt-5 max-w-lg text-cream/80">
              El <strong className="text-cream">HEMP</strong> (léase &ldquo;jemp&rdquo;) es el
              nombre con el que la ley colombiana identifica al cáñamo: la
              variedad de la planta de cannabis que{" "}
              <strong className="text-cream">no tiene efecto psicoactivo</strong> y
              que se usa de forma segura en cosmética por sus beneficios para
              la piel. Desde que la ley lo permitió, incorporamos HEMP
              certificado y de alta calidad en nuestras fórmulas, gracias a
              sus propiedades hidratantes, antioxidantes, calmantes y
              regeneradoras, ideales para pieles sensibles, con tendencia a
              irritaciones o signos de envejecimiento.
            </p>

            <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {hempBenefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div className="flex gap-3">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive/40 ring-1 ring-gold/30">
                      <b.icon className="h-4 w-4 text-gold-soft" />
                    </span>
                    <div>
                      <h4 className="font-display text-base font-semibold text-cream">
                        {b.title}
                      </h4>
                      <p className="mt-0.5 text-sm text-cream/70">{b.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 max-w-lg text-sm italic text-cream/70">
              En conclusión, el HEMP es tu aliado natural para mantener una
              piel saludable, luminosa y protegida, día tras día.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card">
              <Image
                src={withBasePath("/images/ingredientes/aceite-canamo.webp")}
                alt="Aceite de HEMP (cáñamo) y sus semillas, ingrediente clave de Pharma Dream"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
