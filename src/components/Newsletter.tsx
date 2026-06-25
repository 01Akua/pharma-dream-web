"use client";

import { useState } from "react";
import { Check, Gift } from "lucide-react";
import Reveal from "./ui/Reveal";

export default function Newsletter() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <section className="bg-cream px-5 py-20 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-olive to-forest px-6 py-14 text-center shadow-card sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-sage/20 blur-3xl" />

          <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream/10 ring-1 ring-gold/30">
            <Gift className="h-6 w-6 text-gold-soft" />
          </span>
          <h2 className="relative mt-6 font-display text-3xl font-medium text-cream sm:text-4xl">
            Únete al Club Pharma Dream
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-cream/80">
            Recibe <strong className="text-gold-soft">10% de descuento</strong> en
            tu primera compra, descuentos mensuales y rifas exclusivas.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSent(true);
            }}
            className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escribe tu correo electrónico"
              className="w-full rounded-full border border-cream/20 bg-cream/95 px-5 py-3.5 text-sm text-forest outline-none placeholder:text-ink-soft focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className={`flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all ${
                sent
                  ? "bg-sage text-forest"
                  : "bg-gold text-forest hover:bg-gold-soft"
              }`}
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" /> ¡Listo!
                </>
              ) : (
                "Suscribirme"
              )}
            </button>
          </form>
          <p className="relative mt-4 text-xs text-cream/60">
            Sin spam. Puedes darte de baja cuando quieras.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
