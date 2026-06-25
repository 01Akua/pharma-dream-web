import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Tienda — Pharma Dream",
  description:
    "Explora toda la colección de dermocosmética Pharma Dream: cremas, sérums y kits con activos vegetales bioactivos.",
};

export default function TiendaPage() {
  return (
    <main className="flex-1 pt-[68px]">
      {/* Encabezado */}
      <section className="bg-forest px-5 py-16 text-cream lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="text-xs tracking-wider text-cream/60">
            <Link href="/" className="hover:text-gold-soft">
              Inicio
            </Link>{" "}
            / <span className="text-gold-soft">Tienda</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
            Nuestra colección
          </h1>
          <p className="mt-3 max-w-xl text-cream/80">
            Dermocosmética de lujo formulada con Tecnología Fitomolecular y
            activos vegetales bioactivos. Hecho en Colombia.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-cream px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<div className="py-20 text-center text-ink-soft">Cargando…</div>}>
            <ShopGrid />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
