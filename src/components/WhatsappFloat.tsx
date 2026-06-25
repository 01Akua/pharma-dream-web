"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsappFloat() {
  const [tip, setTip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTip(true), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative hidden rounded-2xl bg-white px-4 py-2.5 text-sm text-forest shadow-card sm:block"
          >
            ¿Necesitas ayuda? Escríbenos 💬
            <button
              onClick={() => setTip(false)}
              className="absolute -right-2 -top-2 rounded-full bg-sand p-0.5 text-ink-soft"
              aria-label="Cerrar"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/573217450695"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="relative h-7 w-7" />
      </a>
    </div>
  );
}
