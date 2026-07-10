"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatBlogDate, type BlogBlock, type BlogPost } from "@/lib/blog";
import { useStoredBlogPost, useVisibleBlogPosts } from "@/lib/blogStore";
import Reveal from "./ui/Reveal";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-display text-2xl font-semibold text-forest sm:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-7 font-display text-xl font-semibold text-forest">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 leading-relaxed text-ink">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-6 rounded-2xl border-l-4 border-gold bg-cream-deep p-5 italic leading-relaxed text-ink">
          “{block.text}”
          {block.cite && (
            <span className="mt-2 block text-sm not-italic text-ink-soft">
              — {block.cite}
            </span>
          )}
        </blockquote>
      );
    default:
      return <p className="mt-4 leading-relaxed text-ink">{block.text}</p>;
  }
}

export default function BlogArticle({
  slug,
  initial,
}: {
  slug: string;
  initial: BlogPost;
}) {
  const post = useStoredBlogPost(slug, initial) ?? initial;
  const related = useVisibleBlogPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="flex-1 pt-[110px]">
      <section className="bg-forest px-5 py-16 text-cream lg:px-8">
        <div className="mx-auto max-w-3xl">
          <nav className="text-xs tracking-wider text-cream/60">
            <Link href="/" className="hover:text-gold-soft">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/blog" className="hover:text-gold-soft">
              Blog
            </Link>{" "}
            / <span className="text-gold-soft">{post.tag}</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-cream/70">
            {post.author} · {formatBlogDate(post.date)}
          </p>
        </div>
      </section>

      <section className="bg-cream py-14">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-sand shadow-card">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <article className="mt-10">
              {post.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </article>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-olive"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-deep py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-forest">
            Sigue leyendo
          </h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <Link href={`/blog/${r.slug}`} className="group block">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-sand shadow-soft">
                    {r.image && (
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-forest transition-colors group-hover:text-olive">
                    {r.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
                    Leer artículo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
