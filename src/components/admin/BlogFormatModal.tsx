"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Download, Copy, Check } from "lucide-react";

export default function BlogFormatModal({
  template,
  onClose,
}: {
  template: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const download = () => {
    const blob = new Blob([template], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla-articulo-pharma-dream.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-8 w-full max-w-2xl rounded-3xl bg-cream shadow-card"
      >
        <div className="flex items-center justify-between border-b border-sand px-6 py-4">
          <h2 className="font-display text-xl font-semibold text-forest">
            Formato para redactar artículos por fuera
          </h2>
          <button onClick={onClose} className="text-ink-soft hover:text-forest" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div className="text-sm leading-relaxed text-ink">
            Puedes escribir el artículo en cualquier editor de texto plano
            (Bloc de notas, TextEdit, VS Code…) y guardarlo como{" "}
            <strong>.md</strong> o <strong>.txt</strong>. Al subirlo con el
            botón <strong>&ldquo;Importar artículo&rdquo;</strong>, se
            convierte automáticamente en un artículo del blog.
          </div>

          <div className="rounded-2xl bg-white p-4 text-sm leading-relaxed text-ink shadow-soft ring-1 ring-forest/5">
            <h3 className="font-display text-base font-semibold text-forest">
              Reglas del formato
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <strong>Encabezado</strong> (arriba de todo, entre dos líneas{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">---</code>):{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">titulo</code>,{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">categoria</code>{" "}
                (Rutina, Ciencia o Ingredientes),{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">autor</code>,{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">fecha</code>{" "}
                (AAAA-MM-DD) y{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">extracto</code>.
              </li>
              <li>
                Una línea con <code className="rounded bg-cream-deep px-1 py-0.5">## </code>{" "}
                delante se convierte en un título de sección.
              </li>
              <li>
                Una línea con <code className="rounded bg-cream-deep px-1 py-0.5">### </code>{" "}
                delante se convierte en un subtítulo.
              </li>
              <li>
                Líneas seguidas con{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">- </code> delante
                forman una lista con viñetas.
              </li>
              <li>
                Líneas con{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">&gt; </code> delante
                forman una cita destacada (la última línea puede empezar con{" "}
                <code className="rounded bg-cream-deep px-1 py-0.5">—</code> para indicar
                la fuente).
              </li>
              <li>Cualquier otro texto se convierte en un párrafo normal.</li>
              <li>
                La <strong>imagen destacada</strong> siempre se sube a mano
                dentro del panel después de importar (un archivo de texto no
                puede llevar la foto adentro).
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Plantilla de ejemplo
              </span>
              <div className="flex gap-2">
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-deep hover:underline"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copiado" : "Copiar"}
                </button>
                <button
                  onClick={download}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-deep hover:underline"
                >
                  <Download className="h-3.5 w-3.5" />
                  Descargar .md
                </button>
              </div>
            </div>
            <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-forest p-4 text-xs leading-relaxed text-cream/90">
              {template}
            </pre>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-sand px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold hover:text-forest"
          >
            Entendido
          </button>
        </div>
      </motion.div>
    </div>
  );
}
