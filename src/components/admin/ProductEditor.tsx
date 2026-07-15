"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Upload, ImageOff, Star } from "lucide-react";
import {
  upsertProduct,
  emptyProduct,
  slugify,
  fileToDataURL,
  type StoredProduct,
} from "@/lib/store";
import {
  formatCOP,
  TONE_STYLES,
  TONE_NAMES,
  CATEGORY_NAMES,
  type Product,
} from "@/lib/data";
import type { Notify } from "./AdminApp";
import { StringListEditor, PairListEditor } from "./ListEditor";

const WARNINGS_ESTANDAR = [
  "Producto de uso exclusivamente externo.",
  "Evite el contacto directo con los ojos y mucosas. En caso de contacto accidental, enjuague con abundante agua.",
  "No ingerir.",
  "Suspenda su uso si presenta irritación, enrojecimiento o cualquier reacción desfavorable. Si la molestia persiste, consulte a su médico o dermatólogo.",
  "Manténgase fuera del alcance de los niños.",
];

type Props = {
  product: StoredProduct | null; // null = crear
  onClose: () => void;
  notify: Notify;
};

export default function ProductEditor({ product, onClose, notify }: Props) {
  const isNew = !product;
  const [form, setForm] = useState<StoredProduct>(product ?? emptyProduct());
  const [uploading, setUploading] = useState(false);

  const set = <K extends keyof StoredProduct>(key: K, value: StoredProduct[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setNum = (key: keyof StoredProduct, value: string) =>
    set(key, (value === "" ? undefined : Number(value)) as never);

  const handleImage = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("El archivo debe ser una imagen", "error");
      return;
    }
    try {
      setUploading(true);
      const dataUrl = await fileToDataURL(file);
      set("image", dataUrl);
    } catch {
      notify("No se pudo procesar la imagen", "error");
    } finally {
      setUploading(false);
    }
  };

  const save = () => {
    if (!form.name.trim()) return notify("Ponle un nombre al producto", "error");
    if (!form.price || form.price <= 0)
      return notify("Ingresa un precio válido", "error");

    const id = form.id || slugify(form.name) || `producto-${Date.now()}`;
    const toSave: StoredProduct = {
      ...form,
      id,
      label: form.label || form.name.split(" ")[0]?.toUpperCase() || "PHARMA",
      sub: form.sub || form.category,
      published: form.published ?? true,
    };
    try {
      upsertProduct(toSave);
      notify(isNew ? "Producto creado" : "Cambios guardados");
      onClose();
    } catch (e) {
      notify(e instanceof Error ? e.message : "Error al guardar", "error");
    }
  };

  const tone = TONE_STYLES[form.tone];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-8 w-full max-w-3xl rounded-3xl bg-cream shadow-card"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sand px-6 py-4">
          <h2 className="font-display text-xl font-semibold text-forest">
            {isNew ? "Nuevo producto" : "Editar producto"}
          </h2>
          <button
            onClick={onClose}
            className="text-ink-soft hover:text-forest"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[280px_1fr]">
          {/* Columna imagen + preview */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Imagen del producto
            </label>

            <div className="mt-2 aspect-[4/5] w-full overflow-hidden rounded-2xl">
              {form.image ? (
                <div
                  className="relative h-full w-full"
                  style={{ background: tone.bg }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image}
                    alt="Vista previa"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                /* Studio card de respaldo */
                <div
                  className="flex h-full w-full flex-col items-center justify-center text-center"
                  style={{ background: tone.bg }}
                >
                  <div className="flex h-32 w-20 flex-col items-center justify-end rounded-[1.5rem] rounded-t-md bg-white/15 pb-3 ring-1 ring-white/25">
                    <span
                      className="text-[0.5rem] font-bold tracking-[0.2em]"
                      style={{ color: tone.text }}
                    >
                      PHARMA
                    </span>
                  </div>
                  <h4
                    className="mt-3 font-display text-xl font-semibold"
                    style={{ color: tone.text }}
                  >
                    {form.label || "ETIQUETA"}
                  </h4>
                  <span
                    className="text-[0.65rem] uppercase tracking-[0.15em]"
                    style={{ color: tone.sub }}
                  >
                    {form.sub || form.category}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-forest px-3 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold hover:text-forest">
                <Upload className="h-4 w-4" />
                {uploading ? "Procesando…" : form.image ? "Cambiar" : "Subir imagen"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e.target.files?.[0])}
                />
              </label>
              {form.image && (
                <button
                  onClick={() => set("image", undefined)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-sand text-red-600 hover:bg-red-600 hover:text-cream"
                  aria-label="Quitar imagen"
                >
                  <ImageOff className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="mt-2 text-[0.7rem] leading-snug text-ink-soft">
              Opcional. Si no subes imagen, se usa la tarjeta de marca. Se
              optimiza automáticamente.
            </p>

            {/* Galería de fotos adicionales */}
            <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Más fotos del producto
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(form.images ?? []).map((src, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-forest/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Foto ${i + 2}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() =>
                      set(
                        "images",
                        (form.images ?? []).filter((_, idx) => idx !== i),
                      )
                    }
                    className="absolute inset-0 flex items-center justify-center bg-forest/60 text-cream opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Quitar foto"
                  >
                    <ImageOff className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-sand text-ink-soft transition hover:border-gold hover:text-forest">
                <Upload className="h-4 w-4" />
                <span className="text-[0.65rem] font-medium">Agregar</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files ?? []);
                    if (files.length === 0) return;
                    try {
                      setUploading(true);
                      const dataUrls = await Promise.all(
                        files.map((f) => fileToDataURL(f)),
                      );
                      set("images", [...(form.images ?? []), ...dataUrls]);
                    } catch {
                      notify("No se pudieron procesar las fotos", "error");
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
              </label>
            </div>
            <p className="mt-2 text-[0.7rem] leading-snug text-ink-soft">
              Fotos extra que se ven en la galería de la ficha del producto
              (otros ángulos, con modelo, empaque, etc).
            </p>
          </div>

          {/* Columna campos */}
          <div className="flex flex-col gap-4">
            <Field label="Nombre">
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Crema Hidratante Facial"
                className="input"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoría">
                <select
                  value={form.category}
                  onChange={(e) =>
                    set("category", e.target.value as Product["category"])
                  }
                  className="input"
                >
                  {CATEGORY_NAMES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Stock">
                <input
                  type="number"
                  value={form.stock ?? ""}
                  onChange={(e) => setNum("stock", e.target.value)}
                  placeholder="0"
                  className="input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Precio (COP)">
                <input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => setNum("price", e.target.value)}
                  placeholder="77900"
                  className="input"
                />
              </Field>
              <Field label="Precio tachado (opcional)">
                <input
                  type="number"
                  value={form.compareAt ?? ""}
                  onChange={(e) => setNum("compareAt", e.target.value)}
                  placeholder="—"
                  className="input"
                />
              </Field>
            </div>

            <Field label="Descripción corta">
              <textarea
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                rows={2}
                placeholder="Nutre, calma y revitaliza…"
                className="input resize-none"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Etiqueta empaque">
                <input
                  value={form.label}
                  onChange={(e) => set("label", e.target.value.toUpperCase())}
                  placeholder="CREMA"
                  className="input"
                />
              </Field>
              <Field label="Subtítulo empaque">
                <input
                  value={form.sub}
                  onChange={(e) => set("sub", e.target.value)}
                  placeholder="Hidratante Facial"
                  className="input"
                />
              </Field>
            </div>

            {/* Tono */}
            <Field label="Tono de marca">
              <div className="flex gap-2">
                {TONE_NAMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => set("tone", t)}
                    className={`h-9 w-9 rounded-full ring-2 transition ${
                      form.tone === t ? "ring-gold" : "ring-transparent"
                    }`}
                    style={{ background: TONE_STYLES[t].bg }}
                    aria-label={t}
                  />
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Valoración (0–5)">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={form.rating}
                    onChange={(e) => setNum("rating", e.target.value)}
                    className="input"
                  />
                </div>
              </Field>
              <Field label="N.º de reseñas">
                <input
                  type="number"
                  value={form.reviews}
                  onChange={(e) => setNum("reviews", e.target.value)}
                  className="input"
                />
              </Field>
            </div>

            {/* Publicado */}
            <label className="flex items-center justify-between rounded-xl bg-cream-deep px-4 py-3">
              <div>
                <div className="text-sm font-medium text-forest">
                  Publicado en la tienda
                </div>
                <div className="text-xs text-ink-soft">
                  {form.published
                    ? "Visible para los clientes"
                    : "Oculto (borrador)"}
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
        </div>

        {/* Ficha completa del producto */}
        <div className="flex flex-col gap-6 border-t border-sand p-6">
          <h3 className="font-display text-lg font-semibold text-forest">
            Ficha de producto (página de detalle)
          </h3>

          <Field label="Descripción larga">
            <textarea
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              placeholder="Descripción completa que aparece en la página del producto…"
              className="input resize-none"
            />
          </Field>

          <StringListEditor
            label="Beneficios clave"
            items={form.benefits ?? []}
            onChange={(v) => set("benefits", v)}
            placeholder="Hidratación profunda: …"
          />

          <PairListEditor
            label="Ingredientes principales"
            items={form.keyIngredients ?? []}
            onChange={(v) => set("keyIngredients", v)}
          />

          <Field label="Composición (INCI)">
            <textarea
              value={form.inci ?? ""}
              onChange={(e) => set("inci", e.target.value)}
              rows={3}
              placeholder="Aqua, Glycerin, Cannabis Sativa Seed Oil…"
              className="input resize-none"
            />
          </Field>

          <StringListEditor
            label="Modo de empleo"
            items={form.howToUse ?? []}
            onChange={(v) => set("howToUse", v)}
            placeholder="Aplicar sobre el rostro limpio…"
          />

          <div>
            <button
              type="button"
              onClick={() => set("warnings", WARNINGS_ESTANDAR)}
              className="text-xs font-semibold text-gold-deep hover:underline"
            >
              Usar advertencias estándar
            </button>
            <div className="mt-2">
              <StringListEditor
                label="Advertencias y precauciones"
                items={form.warnings ?? []}
                onChange={(v) => set("warnings", v)}
                placeholder="Evitar el contacto con los ojos…"
              />
            </div>
          </div>

          {form.category === "Kits" && (
            <StringListEditor
              label="Productos que incluye el kit"
              items={form.includes ?? []}
              onChange={(v) => set("includes", v)}
              placeholder="Agua Micelar con Extractos Naturales y HEMP"
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-sand px-6 py-4">
          <span className="text-sm text-ink-soft">
            Precio:{" "}
            <strong className="text-forest">
              {formatCOP(form.price || 0)}
            </strong>
          </span>
          <div className="flex gap-3">
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
              {isNew ? "Crear producto" : "Guardar cambios"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
