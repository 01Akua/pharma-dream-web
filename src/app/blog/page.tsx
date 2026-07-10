import type { Metadata } from "next";
import Link from "next/link";
import BlogGrid from "@/components/BlogGrid";

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
        <BlogGrid />
      </section>
    </main>
  );
}
