"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  upsertBlogPost,
  emptyBlogPost,
  slugifyBlog,
  type StoredBlogPost,
} from "@/lib/blogStore";
import type { Notify } from "./AdminApp";
import ImageField from "./ImageField";
import BlogBlockEditor from "./BlogBlockEditor";

const TAGS = ["Rutina", "Ciencia", "Ingredientes"];

type Props = {
  post: StoredBlogPost | null; // null = crear
  initialDraft?: Partial<StoredBlogPost>; // valores iniciales al crear (ej. importados de un .md)
  onClose: () => void;
  notify: Notify;
};

export default function BlogEditor({ post, initialDraft, onClose, notify }: Props) {
  const isNew = !post;
  const [form, setForm] = useState<StoredBlogPost>(
    post ?? { ...emptyBlogPost(), ...initialDraft },
  );

  const set = <K extends keyof StoredBlogPost>(key: K, value: StoredBlogPost[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = () => {
    if (!form.title.trim()) return notify("Ponle un título al artículo", "error");
    if (!form.image.trim())
      return notify("Sube una imagen destacada", "error");
    if (!form.excerpt.trim()) return notify("Escribe un extracto", "error");
    if (form.body.length === 0)
      return notify("Agrega al menos un bloque de contenido", "error");

    const slug = form.slug || slugifyBlog(form.title) || `post-${Date.now()}`;
    const toSave: StoredBlogPost = {
      ...form,
      slug,
      published: form.published ?? true,
    };
    try {
      upsertBlogPost(toSave);
      notify(isNew ? "Artículo creado" : "Cambios guardados");
      onClose();
    } catch (e) {
      notify(e instanceof Error ? e.message : "Error al guardar", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-8 w-full max-w-3xl rounded-3xl bg-cream shadow-card"
      >
        <div className="flex items-center justify-between border-b border-sand px-6 py-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-forest">
              {isNew ? "Nuevo artículo" : "Editar artículo"}
            </h2>
            {initialDraft && (
              <p className="mt-0.5 text-xs text-gold-deep">
                Importado del archivo — revisa el contenido y sube la imagen antes de publicar.
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-ink-soft hover:text-forest" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <Field label="Imagen destacada">
            <ImageField
              value={form.image}
              aspect="aspect-[16/9]"
              onError={(m) => notify(m, "error")}
              onChange={(v) => set("image", v)}
            />
          </Field>

          <Field label="Título">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Guía Completa para Aplicar Cremas Cosméticas Naturales"
              className="input"
            />
          </Field>

          <Field label="URL (slug)">
            <input
              value={form.slug}
              onChange={(e) => set("slug", slugifyBlog(e.target.value))}
              placeholder="se genera automático del título si lo dejas vacío"
              className="input"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Categoría">
              <select
                value={form.tag}
                onChange={(e) => set("tag", e.target.value)}
                className="input"
              >
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Fecha">
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className="input"
              />
            </Field>
          </div>

          <Field label="Autor">
            <input
              value={form.author}
              onChange={(e) => set("author", e.target.value)}
              className="input"
            />
          </Field>

          <Field label="Extracto (resumen corto para las tarjetas)">
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              rows={2}
              className="input resize-none"
            />
          </Field>

          <Field label="Contenido del artículo">
            <BlogBlockEditor
              blocks={form.body}
              onChange={(v) => set("body", v)}
            />
          </Field>

          {/* Publicado */}
          <label className="flex items-center justify-between rounded-xl bg-cream-deep px-4 py-3">
            <div>
              <div className="text-sm font-medium text-forest">Publicado en el blog</div>
              <div className="text-xs text-ink-soft">
                {form.published ? "Visible para los visitantes" : "Oculto (borrador)"}
              </div>
            </div>
            <button
              type="button"
              onClick={() => set("published", !form.published)}
              className={`relative h-6 w-11 rounded-full transition ${
                form.published ? "bg-olive" : "bg-sand"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  form.published ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-sand px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-full border border-sand px-5 py-2.5 text-sm font-semibold text-forest hover:bg-sand"
          >
            Cancelar
          </button>
          <button
            onClick={save}
            className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold hover:text-forest"
          >
            {isNew ? "Publicar artículo" : "Guardar cambios"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
