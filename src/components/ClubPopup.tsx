"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Gift, X } from "lucide-react";
import { withBasePath } from "@/lib/paths";

const STORAGE_KEY = "pd_club_popup_dismissed_until";
const DISMISS_DAYS = 30;

export default function ClubPopup() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissedUntil = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    if (dismissedUntil > Date.now()) return;

    // 1) aparece tras 7s
    const timer = setTimeout(() => setOpen(true), 7000);

    // 2) o por intención de salida (mouse hacia arriba)
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        clearTimeout(timer);
        document.removeEventListener("mouseleave", onLeave);
      }
    };
    document.addEventListener("mouseleave", onLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(until));
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-cream shadow-card sm:grid-cols-2"
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Lado visual */}
            <div
              className="relative hidden flex-col justify-end bg-cover bg-center p-8 text-cream sm:flex"
              style={{
                backgroundImage: `url(${withBasePath("/images/categorias/kits.webp")})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/70 to-forest/20" />
              <div className="relative">
                <span className="font-display text-3xl italic text-gold-soft">
                  Club
                </span>
                <h3 className="font-display text-2xl font-semibold uppercase tracking-[0.1em] leading-tight">
                  Pharma Dream
                </h3>
                <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">
                  Beneficios exclusivos
                </p>
                <ul className="mt-3 space-y-2 text-sm text-cream/90">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-soft" /> 10% de descuento en tu primera compra
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-soft" /> Descuentos especiales cada mes
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-gold-soft" /> Rifas mensuales de productos Pharma Dream
                  </li>
                </ul>
              </div>
            </div>

            {/* Formulario */}
            <div className="relative p-8">
              <button
                onClick={dismiss}
                aria-label="Cerrar"
                className="absolute right-4 top-4 text-ink-soft transition-colors hover:text-forest"
              >
                <X className="h-5 w-5" />
              </button>

              <Gift className="h-8 w-8 text-gold" />
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-forest">
                ¡Únete al Club Pharma Dream y consiente tu piel!
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Regístrate en nuestro boletín y recibe{" "}
                <strong className="text-gold-deep">10% de descuento</strong> en tu
                primera compra. Además, disfruta de beneficios exclusivos:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-gold-deep" /> Descuentos especiales cada mes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-gold-deep" /> Rifas mensuales de productos Pharma Dream
                </li>
              </ul>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) {
                    setSent(true);
                    setTimeout(dismiss, 1400);
                  }
                }}
                className="mt-6 flex flex-col gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Escribe tu correo electrónico"
                  className="w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm text-forest outline-none focus:ring-2 focus:ring-gold"
                />
                <button
                  type="submit"
                  className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                    sent
                      ? "bg-sage text-forest"
                      : "bg-gold text-forest hover:bg-gold-soft"
                  }`}
                >
                  {sent ? (
                    <>
                      <Check className="h-4 w-4" /> ¡Bienvenida al Club!
                    </>
                  ) : (
                    "Suscribirme"
                  )}
                </button>
              </form>

              <button
                onClick={dismiss}
                className="mt-4 text-xs text-ink-soft underline-offset-2 hover:underline"
              >
                No, gracias. No volver a mostrar.
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
