import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS, getProduct, getRelated } from "@/lib/data";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Producto no encontrado — Pharma Dream" };
  return {
    title: `${product.name} — Pharma Dream`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: Params) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <main className="flex-1 pt-[110px]">
      <section className="px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-8 text-xs tracking-wider text-ink-soft">
            <Link href="/" className="hover:text-gold-deep">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/tienda" className="hover:text-gold-deep">
              Tienda
            </Link>{" "}
            / <span className="text-forest">{product.name}</span>
          </nav>

          <ProductDetail product={product} />
        </div>
      </section>

      {/* Relacionados */}
      <section className="bg-cream-deep px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-medium text-forest sm:text-4xl">
              También te puede gustar
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
