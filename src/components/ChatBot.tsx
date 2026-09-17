"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Leaf } from "lucide-react";
import { CHAT_FAQS, CHAT_GREETING, CHAT_FALLBACK } from "@/lib/chatbot";

const WHATSAPP_URL = "https://wa.me/573009979933";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

export default function ChatBot() {
  const [tip, setTip] = useState(false);
  const [open, setOpen] = useState(false);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", from: "bot", text: CHAT_GREETING },
  ]);

  useEffect(() => {
    const t = setTimeout(() => setTip(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const askFaq = (id: string) => {
    const faq = CHAT_FAQS.find((f) => f.id === id);
    if (!faq) return;
    setAnsweredIds((prev) => [...prev, id]);
    setMessages((prev) => [
      ...prev,
      { id: `${id}-q`, from: "user", text: faq.question },
      { id: `${id}-a`, from: "bot", text: faq.answer },
    ]);
  };

  const remainingFaqs = CHAT_FAQS.filter((f) => !answeredIds.includes(f.id));

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="flex h-[28rem] w-[20rem] flex-col overflow-hidden rounded-3xl bg-white shadow-card sm:w-[22rem]"
          >
            <div className="flex items-center justify-between bg-forest px-4 py-3.5 text-cream">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-gold-soft" />
                <span className="font-display text-sm font-semibold">
                  Asistente Pharma Dream
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                className="rounded-full p-1 text-cream/80 hover:bg-cream/10 hover:text-cream"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.from === "bot"
                      ? "max-w-[85%] rounded-2xl rounded-tl-sm bg-sand px-3.5 py-2.5 text-sm text-ink"
                      : "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-forest px-3.5 py-2.5 text-sm text-cream"
                  }
                >
                  {m.text}
                </div>
              ))}

              {remainingFaqs.length === 0 && (
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-sand px-3.5 py-2.5 text-sm text-ink">
                  {CHAT_FALLBACK}
                </div>
              )}
            </div>

            <div className="border-t border-sand px-3 py-3">
              {remainingFaqs.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {remainingFaqs.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => askFaq(faq.id)}
                      className="rounded-full border border-forest/20 px-3 py-1.5 text-xs font-medium text-forest transition-colors hover:bg-forest hover:text-cream"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              )}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" /> Hablar con un asesor por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {tip && !open && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative hidden rounded-2xl bg-white px-4 py-2.5 text-sm text-forest shadow-card sm:block"
            >
              ¿Necesitas ayuda? Pregúntale a nuestro asistente 💬
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

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar asistente" : "Abrir asistente"}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-105"
        >
          {!open && (
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          )}
          {open ? (
            <X className="relative h-7 w-7" />
          ) : (
            <MessageCircle className="relative h-7 w-7" />
          )}
        </button>
      </div>
    </div>
  );
}
