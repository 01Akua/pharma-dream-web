import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { POSTS } from "@/lib/data";
import Reveal from "./ui/Reveal";

export default function BlogSection() {
  return (
    <section id="blog" className="bg-cream-deep py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow text-gold-deep">Nuestro blog</span>
            <h2 className="mt-4 font-display text-4xl font-medium text-forest sm:text-5xl">
              Ciencia y cuidado de la piel
            </h2>
          </div>
          <a
            href="#blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-forest"
          >
            Ver todo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.1}>
              <a href="#blog" className="group block">
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-soft">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-forest backdrop-blur-sm">
                    {post.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-forest transition-colors group-hover:text-olive">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
                  Leer artículo
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
