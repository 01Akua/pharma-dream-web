"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Gift, X } from "lucide-react";

const STORAGE_KEY = "pd_club_popup_dismissed";

export default function ClubPopup() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

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
      localStorage.setItem(STORAGE_KEY, "1");
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
            <div className="relative hidden flex-col justify-end bg-gradient-to-br from-olive to-forest p-8 text-cream sm:flex">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl" />
              <Gift className="h-10 w-10 text-gold-soft" />
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">
                Club Pharma Dream
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-cream/85">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold-soft" /> 10% en tu primera compra
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold-soft" /> Descuentos cada mes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold-soft" /> Rifas mensuales
                </li>
              </ul>
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

              <h3 className="font-display text-2xl font-semibold text-forest">
                ¡Consiente tu piel!
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Regístrate y recibe{" "}
                <strong className="text-gold-deep">10% de descuento</strong> en tu
                primera compra.
              </p>

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
