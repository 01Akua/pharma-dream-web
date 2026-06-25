import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import Reveal from "./ui/Reveal";

export default function CategoriesSection() {
  return (
    <section className="relative bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-gold-deep">Explora por categoría</span>
          <h2 className="mt-4 font-display text-4xl font-medium text-forest sm:text-5xl">
            Una rutina para cada piel
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 0.1}>
              <Link
                href={`/tienda?cat=${cat.name}`}
                className="group relative block h-80 overflow-hidden rounded-3xl shadow-soft"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold text-cream">
                      {cat.name}
                    </h3>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm transition-all duration-300 group-hover:bg-gold group-hover:text-forest">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-xs text-sm text-cream/80">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-block text-[0.7rem] uppercase tracking-[0.18em] text-gold-soft">
                    {cat.count} productos
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
