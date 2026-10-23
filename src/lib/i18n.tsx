"use client";

/* ============================================================
   Idiomas del sitio (es / en / fr).

   El español es el idioma de origen: todos los textos del código y del
   panel admin se escriben en español. Para en/fr, <PageTranslator />
   reemplaza al vuelo los textos visibles del DOM:
     1. diccionario estático (src/lib/translations/*.ts),
     2. caché local de traducciones automáticas anteriores,
     3. endpoint PHP (traducción automática) para texto nuevo, p. ej. lo
        que el cliente edite en /admin. Si falla, se muestra en español.
   Así productos, blog, testimonios y avisos editados en el CMS quedan
   traducidos sin tocar cada componente.
   ============================================================ */

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Lang = "es" | "en" | "fr";
export const LANGS: Lang[] = ["es", "en", "fr"];
export const LANG_LABEL: Record<Lang, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
};

const STORAGE_KEY = "pd_lang";
const CACHE_PREFIX = "pd_tr_v1_";
const TRANSLATE_ENDPOINT =
  process.env.NEXT_PUBLIC_TRANSLATE_URL ||
  "https://pharmadream.com.co/api/translate.php";

const isLang = (v: unknown): v is Lang => v === "es" || v === "en" || v === "fr";

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {}
  const nav = (navigator.language || "es").slice(0, 2).toLowerCase();
  return isLang(nav) ? nav : "es";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "es", setLang: () => {} });

export const useLang = () => useContext(LangContext);

/* Idioma actual como store externo: el servidor (y la hidratación) usan "es" y el
   navegador lo corrige después con lo guardado o el idioma del navegador. */
let current: Lang | null = null;
const subscribers = new Set<() => void>();
const getSnapshot = (): Lang => (current ??= detectLang());
const getServerSnapshot = (): Lang => "es";
const subscribe = (cb: () => void) => {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
};

function setLang(l: Lang) {
  current = l;
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {}
  subscribers.forEach((cb) => cb());
}

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <PageTranslator lang={lang} />
      {children}
    </LangContext.Provider>
  );
}

/* ---------- Traductor del DOM ---------- */

type Dict = Record<string, string>;
const dicts: Partial<Record<Lang, Dict>> = {};
const autoCache: Partial<Record<Lang, Dict>> = {};
const pending: Partial<Record<Lang, Set<string>>> = {};
const failed = new Set<string>();

const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const hasLetters = (s: string) => /\p{L}/u.test(s);
// Correos, teléfonos y números se sustituyen por "{#}" para que "5 días" y
// "7 días", o un texto con el correo de contacto, compartan una sola entrada.
const CONTACT_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+?\d[\d ]{6,}\d/g;
const NUM_RE = new RegExp(CONTACT_RE.source + "|\\d+(?:[.,]\\d+)*", "g");

const fill = (tpl: string, vals: string[]) => {
  let i = 0;
  return tpl.replace(/\{#\}/g, () => vals[i++] ?? "");
};

const MONTHS_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const MONTHS: Record<"en" | "fr", string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
};

/* "22 de septiembre de 2025" -> "September 22, 2025" / "22 septembre 2025" */
function translateDate(lang: Lang, key: string): string | undefined {
  if (lang === "es") return undefined;
  const m = key.match(/^(\d{1,2}) de ([a-záéíóú]+) de (\d{4})$/i);
  const mi = m ? MONTHS_ES.indexOf(m[2].toLowerCase()) : -1;
  if (!m || mi < 0) return undefined;
  return lang === "en"
    ? `${MONTHS.en[mi]} ${Number(m[1])}, ${m[3]}`
    : `${Number(m[1])} ${MONTHS.fr[mi]} ${m[3]}`;
}

/* Búsqueda por plantillas: primero el texto exacto; luego con correos/teléfonos
   sustituidos; luego con todos los números sustituidos. */
function lookupPlain(lang: Lang, key: string): string | undefined {
  const d = dicts[lang];
  const a = autoCache[lang];
  const direct = d?.[key] ?? a?.[key];
  if (direct) return direct;
  for (const re of [CONTACT_RE, NUM_RE]) {
    const vals = key.match(re);
    if (!vals) continue;
    const tpl = key.replace(re, "{#}");
    const hit = d?.[tpl] ?? a?.[tpl];
    if (hit) return fill(hit, vals);
  }
  return translateDate(lang, key);
}

/* Frases con un nombre dentro ("Ver {n}", "Añadir {n} al carrito"): las entradas
   del diccionario con "{n}" se comparan como patrones y el nombre se traduce aparte. */
const frames: Partial<Record<Lang, { re: RegExp; value: string; strict: boolean }[]>> = {};

function lookupFrame(lang: Lang, key: string): string | undefined {
  const d = dicts[lang];
  if (!d) return undefined;
  frames[lang] ??= Object.keys(d)
    .filter((k) => k.includes("{n}"))
    .map((k) => ({
      re: new RegExp(
        "^" +
          k
            .replace(/[.*+?^$()|[\]\\]/g, "\\$&")
            .replace(/\{n\}/g, "(.+?)")
            .replace(/\{#\}/g, "(\\d+(?:[.,]\\d+)*)") +
          "$",
      ),
      value: d[k],
      // "{n} 1" o "{n} — Pharma Dream": solo si el nombre ya es conocido.
      strict: k.startsWith("{n}"),
    }));
  for (const f of frames[lang]!) {
    const m = key.match(f.re);
    if (!m) continue;
    const name = lookupPlain(lang, m[1]);
    if (f.strict && !name) continue;
    const nums = m.slice(2);
    return fill(f.value.replace(/\{n\}/g, name ?? m[1]), nums);
  }
  return undefined;
}

function lookup(lang: Lang, key: string): string | undefined {
  return lookupPlain(lang, key) ?? lookupFrame(lang, key);
}

function loadCache(lang: Lang) {
  if (autoCache[lang]) return;
  try {
    autoCache[lang] = JSON.parse(localStorage.getItem(CACHE_PREFIX + lang) || "{}");
  } catch {
    autoCache[lang] = {};
  }
}

function saveCache(lang: Lang) {
  try {
    const c = autoCache[lang] ?? {};
    const keys = Object.keys(c);
    // Tope para no llenar localStorage: se descartan las más antiguas.
    if (keys.length > 1500) for (const k of keys.slice(0, keys.length - 1500)) delete c[k];
    localStorage.setItem(CACHE_PREFIX + lang, JSON.stringify(c));
  } catch {}
}

async function loadDict(lang: Lang) {
  if (lang === "es" || dicts[lang]) return;
  dicts[lang] =
    lang === "en"
      ? (await import("./translations/en")).default
      : (await import("./translations/fr")).default;
}

let flushTimer: ReturnType<typeof setTimeout> | null = null;

function queueRemote(lang: Lang, key: string, onDone: () => void) {
  if (failed.has(lang + key) || key.length > 4000) return;
  (pending[lang] ??= new Set()).add(key);
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(async () => {
    const batch = Array.from(pending[lang] ?? []);
    pending[lang] = new Set();
    for (let i = 0; i < batch.length; i += 40) {
      const chunk = batch.slice(i, i + 40);
      try {
        const res = await fetch(TRANSLATE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ target: lang, texts: chunk }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const { translations } = (await res.json()) as { translations: string[] };
        const c = (autoCache[lang] ??= {});
        chunk.forEach((k, j) => {
          if (translations[j]) c[k] = translations[j];
          else failed.add(lang + k);
        });
      } catch {
        chunk.forEach((k) => failed.add(lang + k));
      }
    }
    saveCache(lang);
    onDone();
  }, 200);
}

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "IFRAME"]);
const ATTRS = ["placeholder", "title", "aria-label", "alt"];

type Rec = { orig: string; shown: string };

function PageTranslator({ lang }: { lang: Lang }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const texts = new Map<Node, Rec>();
    const attrs = new Map<Element, Map<string, Rec>>();
    let raf = 0;
    let observer: MutationObserver | null = null;
    let alive = true;
    const titleRec: { current: Rec | null } = { current: null };

    const skip = (el: Element | null) =>
      !!el?.closest("[data-notranslate],.notranslate") ||
      (location.pathname.includes("/admin") && !!el?.closest("body"));

    const translate = (raw: string): string | null => {
      const key = norm(raw);
      if (!key || !hasLetters(key)) return null;
      const hit = lookup(lang, key);
      if (hit) return hit;
      if (process.env.NODE_ENV !== "production")
        ((window as unknown as { __pdMissing?: Set<string> }).__pdMissing ??= new Set()).add(key);
      queueRemote(lang, key, schedule);
      return null;
    };

    const withSpaces = (raw: string, tr: string) =>
      (raw.match(/^\s*/)?.[0] ?? "") + tr + (raw.match(/\s*$/)?.[0] ?? "");

    const pass = () => {
      raf = 0;
      if (!alive) return;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n: Node | null;
      while ((n = walker.nextNode())) {
        const el = n.parentElement;
        if (!el || SKIP_TAGS.has(el.tagName) || skip(el)) continue;
        const value = n.nodeValue ?? "";
        const rec = texts.get(n);
        if (rec && value === rec.shown) continue;
        const tr = translate(value);
        if (tr === null) {
          texts.delete(n);
          continue;
        }
        const shown = withSpaces(value, tr);
        texts.set(n, { orig: value, shown });
        n.nodeValue = shown;
      }
      document.body.querySelectorAll<HTMLElement>(
        ATTRS.map((a) => `[${a}]`).join(","),
      ).forEach((el) => {
        if (skip(el)) return;
        let m = attrs.get(el);
        for (const a of ATTRS) {
          const value = el.getAttribute(a);
          if (value === null) continue;
          if (m?.get(a)?.shown === value) continue;
          const tr = translate(value);
          if (tr === null) continue;
          if (!m) attrs.set(el, (m = new Map()));
          m.set(a, { orig: value, shown: tr });
          el.setAttribute(a, tr);
        }
      });
      const title = document.title;
      if (title && title !== titleRec.current?.shown) {
        const tr = translate(title);
        if (tr) {
          titleRec.current = { orig: title, shown: tr };
          document.title = tr;
        }
      }
    };

    function schedule() {
      if (!raf && alive) raf = requestAnimationFrame(pass);
    }

    const restore = () => {
      texts.forEach((rec, node) => {
        if (node.isConnected && node.nodeValue === rec.shown) node.nodeValue = rec.orig;
      });
      attrs.forEach((m, el) =>
        m.forEach((rec, a) => {
          if (el.getAttribute(a) === rec.shown) el.setAttribute(a, rec.orig);
        }),
      );
      if (titleRec.current && document.title === titleRec.current.shown)
        document.title = titleRec.current.orig;
      texts.clear();
      attrs.clear();
      titleRec.current = null;
    };

    if (lang === "es") {
      return;
    }

    loadCache(lang);
    loadDict(lang).then(() => {
      if (!alive) return;
      pass();
      observer = new MutationObserver(schedule);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ATTRS,
      });
    });

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      observer?.disconnect();
      restore();
    };
  }, [lang]);

  return null;
}
