"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatBlogDate } from "@/lib/blog";
import { useVisibleBlogPosts } from "@/lib/blogStore";
import Reveal from "./ui/Reveal";

export default function BlogGrid() {
  const posts = useVisibleBlogPosts();

  return (
    <div className="mx-auto grid max-w-7xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal key={post.slug} delay={i * 0.06}>
          <Link href={`/blog/${post.slug}`} className="group block">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-sand shadow-soft">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
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
  );
}
