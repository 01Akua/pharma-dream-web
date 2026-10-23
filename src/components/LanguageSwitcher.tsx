"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { LANGS, LANG_LABEL, useLang } from "@/lib/i18n";

export default function LanguageSwitcher({
  light = false,
  inline = false,
}: {
  light?: boolean;
  inline?: boolean;
}) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  // Versión en línea (menú móvil): tres botones visibles.
  if (inline) {
    return (
      <div data-notranslate className="flex gap-2 py-3">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              lang === l
                ? "border-forest bg-forest text-cream"
                : "border-forest/25 text-forest hover:bg-forest/10"
            }`}
          >
            {LANG_LABEL[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} data-notranslate className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        aria-expanded={open}
        className={`flex items-center gap-1 text-xs font-semibold uppercase transition-colors hover:text-gold ${
          light ? "text-cream" : "text-forest"
        }`}
      >
        <Globe className="h-5 w-5" />
        <span className="hidden sm:inline">{lang}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-36 overflow-hidden rounded-2xl bg-white py-1 shadow-card">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-sand ${
                lang === l ? "font-semibold text-forest" : "text-ink-soft"
              }`}
            >
              {LANG_LABEL[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
