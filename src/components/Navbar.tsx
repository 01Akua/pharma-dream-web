"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import Logo from "./ui/Logo";
import { openCartDrawer, useCartCount } from "@/lib/cart";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/tienda" },
  { label: "Ingredientes", href: "/ingredientes" },
  { label: "Blog", href: "/#blog" },
  { label: "Nosotros", href: "/nosotros" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartCount = useCartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparente solo en la home y arriba del todo
  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`relative transition-all duration-500 ${
        solid ? "bg-cream/90 shadow-soft backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Links izquierda (desktop) */}
        <div className="hidden flex-1 items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group relative text-sm font-medium transition-colors ${
                solid ? "text-forest" : "text-cream"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Logo centro */}
        <Link href="/" className="flex items-center lg:flex-1 lg:justify-center">
          <Logo variant={solid ? "dark" : "light"} />
        </Link>

        {/* Iconos derecha */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <button
            aria-label="Buscar"
            className={`hidden transition-colors hover:text-gold sm:block ${
              solid ? "text-forest" : "text-cream"
            }`}
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Carrito"
            onClick={openCartDrawer}
            className={`relative transition-colors hover:text-gold ${
              solid ? "text-forest" : "text-cream"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.6rem] font-bold text-forest">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
          <button
            aria-label="Menú"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden ${solid ? "text-forest" : "text-cream"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden bg-cream/95 backdrop-blur-md transition-all duration-400 lg:hidden ${
          open ? "max-h-80 border-t border-sand" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-sand/60 py-3 text-forest"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
