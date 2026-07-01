"use client";

import Link from "next/link";
import { AtSign, Camera, Mail, MapPin, Phone, Video } from "lucide-react";
import Logo from "./ui/Logo";
import { useContent } from "@/lib/content";

const groups = [
  {
    title: "Tienda",
    links: ["Cremas", "Sérums", "Kits", "Ingredientes", "Más vendidos"],
  },
  {
    title: "Información",
    links: [
      "Política de privacidad",
      "Devoluciones y reembolso",
      "Términos de servicio",
      "Política de envío",
      "Preguntas frecuentes",
    ],
  },
];

const socials = [Camera, AtSign, Video, Mail];

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
                  <li key={l}>
                    <a
                      href="#"
                      className="transition-colors hover:text-gold-soft"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sociales + pagos */}
        <div className="mt-14 flex flex-col items-center gap-6 border-t border-cream/15 py-7 sm:flex-row sm:justify-between">
          <div className="flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-forest"
                aria-label="Red social"
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
