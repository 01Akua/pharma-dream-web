import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { REVIEWS } from "@/lib/data";
import Reveal from "./ui/Reveal";

export default function ReviewsSection() {
  return (
    <section id="resenas" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-gold-deep">Miles de pieles felices</span>
          <h2 className="mt-4 font-display text-4xl font-medium text-forest sm:text-5xl">
            Lo que dicen nuestras clientas
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm font-medium text-ink-soft">
              4.9 / 5 · +400 reseñas verificadas
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-forest/5">
                <Quote className="h-8 w-8 text-gold-soft" />
                <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink">
                  “{r.text}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-sand pt-5">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <figcaption>
                    <div className="font-semibold text-forest">{r.name}</div>
                    <div className="text-xs text-ink-soft">
                      {r.city} · {r.product}
                    </div>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
