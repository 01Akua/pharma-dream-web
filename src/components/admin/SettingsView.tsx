"use client";

import { useState } from "react";
import { RotateCcw, Info, Database, ShieldCheck } from "lucide-react";
import { resetStore } from "@/lib/store";
import type { Notify } from "./AdminApp";

export default function SettingsView({ notify }: { notify: Notify }) {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold text-forest">Ajustes</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Información de la demo y opciones de datos.
      </p>

      {/* Info demo */}
      <div className="mt-8 flex gap-3 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-forest/5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
        <div className="text-sm leading-relaxed text-ink">
          <strong className="text-forest">Esto es una demostración.</strong> Los
          cambios (productos e imágenes) se guardan en este navegador para que
          puedas probar todas las funciones. En la versión profesional, los datos
          se guardarán en la nube y se verán reflejados para todos los clientes y
          dispositivos al instante.
        </div>
      </div>

      {/* Capacidades */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-forest/5">
          <Database className="h-5 w-5 text-olive" />
          <h3 className="mt-3 font-semibold text-forest">Datos</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Crear, editar, publicar y eliminar productos, con precios, stock e
            imágenes.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-forest/5">
          <ShieldCheck className="h-5 w-5 text-olive" />
          <h3 className="mt-3 font-semibold text-forest">Acceso</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Panel protegido con inicio de sesión. En producción, con usuarios y
            roles reales.
          </p>
        </div>
      </div>

      {/* Restablecer */}
      <div className="mt-4 rounded-2xl border border-sand bg-cream p-5">
        <h3 className="font-semibold text-forest">Restablecer demo</h3>
        <p className="mt-1 text-sm text-ink-soft">
          Vuelve el catálogo a su estado original y borra los cambios de prueba.
        </p>
        {!confirm ? (
          <button
            onClick={() => setConfirm(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-forest px-5 py-2.5 text-sm font-semibold text-forest transition hover:bg-forest hover:text-cream"
          >
            <RotateCcw className="h-4 w-4" />
            Restablecer catálogo
          </button>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-forest">¿Seguro?</span>
            <button
              onClick={() => {
                resetStore();
                setConfirm(false);
                notify("Catálogo restablecido");
              }}
              className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-cream hover:bg-red-700"
            >
              Sí, restablecer
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="rounded-full border border-sand px-5 py-2 text-sm font-semibold text-forest hover:bg-sand"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
