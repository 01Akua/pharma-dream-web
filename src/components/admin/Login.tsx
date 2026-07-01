"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Info } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { DEMO_USER, DEMO_PASS } from "./AdminApp";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() === DEMO_USER && pass === DEMO_PASS) {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest px-4">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-olive/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-3xl bg-cream p-8 shadow-card"
      >
        <div className="flex justify-center">
          <Logo variant="dark" />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-semibold text-forest">
          Panel administrativo
        </h1>
        <p className="mt-1 text-center text-sm text-ink-soft">
          Ingresa para gestionar tu tienda
        </p>

        <form onSubmit={submit} className="mt-7 flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-sand bg-white px-4 focus-within:ring-2 focus-within:ring-gold">
            <User className="h-4 w-4 text-ink-soft" />
            <input
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setError(false);
              }}
              placeholder="Usuario"
              className="w-full bg-transparent py-3 text-sm text-forest outline-none"
            />
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-sand bg-white px-4 focus-within:ring-2 focus-within:ring-gold">
            <Lock className="h-4 w-4 text-ink-soft" />
            <input
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError(false);
              }}
              placeholder="Contraseña"
              className="w-full bg-transparent py-3 text-sm text-forest outline-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              Usuario o contraseña incorrectos.
            </p>
          )}

          <button
            type="submit"
            className="mt-1 rounded-xl bg-forest py-3 text-sm font-semibold text-cream transition hover:bg-gold hover:text-forest"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 flex items-start gap-2 rounded-xl bg-cream-deep p-3 text-xs text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
          <span>
            Demo — usuario <strong className="text-forest">{DEMO_USER}</strong> ·
            contraseña <strong className="text-forest">{DEMO_PASS}</strong>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
