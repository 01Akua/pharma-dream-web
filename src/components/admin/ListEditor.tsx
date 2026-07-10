"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";

/** Editor de una lista de strings (beneficios, pasos, advertencias…). */
export function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, value: string) => {
    const next = [...items];
    next[i] = value;
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {label}
        </span>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:underline"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {items.length === 0 && (
          <p className="text-xs italic text-ink-soft">Sin elementos.</p>
        )}
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <GripVertical className="mt-2.5 h-4 w-4 shrink-0 text-sand" />
            <textarea
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              rows={1}
              className="input resize-none"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-600 hover:text-cream"
              aria-label="Quitar"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export type Pair = { name: string; benefit: string };

/** Editor de lista de pares nombre + beneficio (ingredientes clave). */
export function PairListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: Pair[];
  onChange: (next: Pair[]) => void;
}) {
  const update = (i: number, key: keyof Pair, value: string) => {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, { name: "", benefit: "" }]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
          {label}
        </span>
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gold-deep hover:underline"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-3">
        {items.length === 0 && (
          <p className="text-xs italic text-ink-soft">Sin elementos.</p>
        )}
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 rounded-xl bg-cream-deep p-3">
            <div className="flex-1 space-y-2">
              <input
                value={item.name}
                onChange={(e) => update(i, "name", e.target.value)}
                placeholder="Nombre del ingrediente"
                className="input"
              />
              <textarea
                value={item.benefit}
                onChange={(e) => update(i, "benefit", e.target.value)}
                placeholder="Beneficio / función"
                rows={2}
                className="input resize-none"
              />
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-600 hover:text-cream"
              aria-label="Quitar"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
