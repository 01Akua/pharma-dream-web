"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./ui/Logo";
import { useContent } from "@/lib/content";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.6 5.82c-1.02-.9-1.6-2.2-1.6-3.63h-3.1v14.06c0 1.5-1.22 2.72-2.73 2.72a2.73 2.73 0 0 1-2.72-2.72 2.73 2.73 0 0 1 2.72-2.73c.28 0 .55.04.8.12V10.5a5.9 5.9 0 0 0-.8-.06A5.83 5.83 0 0 0 4.05 16.3a5.83 5.83 0 0 0 5.82 5.82 5.83 5.83 0 0 0 5.82-5.82V9.02a8.35 8.35 0 0 0 4.87 1.56V7.48a5.02 5.02 0 0 1-3.96-1.66Z" />
    </svg>
  );
}

const socials = [
  { Icon: InstagramIcon, href: "https://www.instagram.com/pharmadream_col/", label: "Instagram" },
  { Icon: TikTokIcon, href: "https://www.tiktok.com/@pharma.dream", label: "TikTok" },
];

const groups = [
  {
    title: "Tienda",
    links: [
      { label: "Cremas", href: "/tienda" },
      { label: "Sérums", href: "/tienda" },
      { label: "Kits", href: "/tienda" },
      { label: "Ingredientes", href: "/ingredientes" },
      { label: "Más vendidos", href: "/tienda" },
    ],
  },
  {
    title: "Información",
    links: [
      { label: "Política de privacidad", href: "/politica-privacidad" },
      { label: "Devoluciones y reembolso", href: "/devoluciones-y-reembolsos" },
      { label: "Términos de servicio", href: "/terminos-y-condiciones" },
      { label: "Política de envío", href: "/politica-de-envios" },
      { label: "Preguntas frecuentes", href: "#" },
    ],
  },
];

export default function Footer() {
  const { footer } = useContent();
  return (
    <footer className="bg-forest pt-16 text-cream/80">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca + contacto */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65">
              {footer.blurb}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-gold-soft" /> {footer.city}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-soft" /> {footer.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold-soft" /> {footer.email}
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="font-display text-base font-semibold text-cream">
                {g.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="transition-colors hover:text-gold-soft"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sociales + pagos */}
        <div className="mt-14 flex flex-col items-center gap-6 border-t border-cream/15 py-7 sm:flex-row sm:justify-between">
          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-forest"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[0.65rem] uppercase tracking-wider text-cream/60">
            <span className="rounded border border-cream/20 px-2.5 py-1">Visa</span>
            <span className="rounded border border-cream/20 px-2.5 py-1">Mastercard</span>
            <span className="rounded border border-cream/20 px-2.5 py-1">PSE</span>
            <span className="rounded border border-cream/20 px-2.5 py-1">Bold</span>
            <span className="rounded border border-cream/20 px-2.5 py-1">Contra entrega</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-cream/15 py-6 text-center text-xs text-cream/50 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Pharma Dream · Colombia (COP $). Todos
            los derechos reservados.
          </span>
          <Link href="/admin" className="transition-colors hover:text-gold-soft">
            Panel administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
}
