"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  ExternalLink,
  Check,
  CircleAlert,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProductsView from "./ProductsView";
import SettingsView from "./SettingsView";

const SESSION_KEY = "pd_admin_session";
export const DEMO_USER = "admin";
export const DEMO_PASS = "pharma2026";

export type View = "dashboard" | "productos" | "ajustes";
export type Notify = (message: string, type?: "success" | "error") => void;

const nav: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Resumen", icon: LayoutDashboard },
  { id: "productos", label: "Productos", icon: Package },
  { id: "ajustes", label: "Ajustes", icon: Settings },
];

export default function AdminApp() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    setReady(true);
  }, []);

  const notify: Notify = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  const login = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setAuthed(true);
    notify("Bienvenido de nuevo 👋");
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  if (!ready) return <div className="min-h-screen bg-cream" />;

  if (!authed) return <Login onLogin={login} />;

  return (
    <div className="min-h-screen bg-cream-deep text-ink">
      {/* Sidebar (desktop) / topbar (móvil) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sand bg-forest p-5 text-cream lg:flex">
        <div className="px-2 py-3">
          <Logo variant="light" />
        </div>
        <p className="mb-6 mt-1 px-2 text-[0.65rem] uppercase tracking-[0.2em] text-cream/50">
          Panel administrativo
        </p>

        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                view === item.id
                  ? "bg-cream/15 text-cream"
                  : "text-cream/70 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-cream/15 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <ExternalLink className="h-5 w-5" />
            Ver tienda
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream"
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Topbar móvil */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-sand bg-forest px-4 py-3 text-cream lg:hidden">
        <Logo variant="light" />
        <button onClick={logout} className="text-cream/70" aria-label="Salir">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
      <nav className="sticky top-[57px] z-20 flex gap-1 overflow-x-auto border-b border-sand bg-cream px-4 py-2 lg:hidden">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm ${
              view === item.id ? "bg-forest text-cream" : "text-forest"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Contenido */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-5 py-8 lg:px-10 lg:py-10">
          {view === "dashboard" && (
            <Dashboard onGoToProducts={() => setView("productos")} />
          )}
          {view === "productos" && <ProductsView notify={notify} />}
          {view === "ajustes" && <SettingsView notify={notify} />}
        </div>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium text-cream shadow-card ${
              toast.type === "error" ? "bg-red-600" : "bg-forest"
            }`}
          >
            {toast.type === "error" ? (
              <CircleAlert className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4 text-gold-soft" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
