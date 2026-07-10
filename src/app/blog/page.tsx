import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog — Pharma Dream",
  description:
    "Ciencia, ingredientes y rutinas de cuidado de la piel: el blog de Pharma Dream sobre HEMP, extracción fitomolecular y dermocosmética natural.",
};

export default function BlogPage() {
  return (
    <main className="flex-1 pt-[110px]">
      <section className="bg-forest px-5 py-16 text-cream lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="text-xs tracking-wider text-cream/60">
            <Link href="/" className="hover:text-gold-soft">
              Inicio
            </Link>{" "}
            / <span className="text-gold-soft">Blog</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
            Ciencia y cuidado de la piel
          </h1>
          <p className="mt-3 max-w-xl text-cream/80">
            Ingredientes, HEMP, extracción fitomolecular y rutinas — todo lo
            que hay detrás de cada fórmula Pharma Dream.
          </p>
        </div>
      </section>

      <section className="bg-cream-deep px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block">
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
                <span className="mt-4 block text-xs uppercase tracking-wider text-sage">
                  {formatBlogDate(post.date)}
                </span>
                <h2 className="mt-1.5 font-display text-xl font-semibold leading-snug text-forest transition-colors group-hover:text-olive">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
                  Leer artículo
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
