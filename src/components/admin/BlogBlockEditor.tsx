"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { BlogBlock } from "@/lib/blog";

const BLOCK_LABELS: Record<BlogBlock["type"], string> = {
  p: "Párrafo",
  h2: "Título (H2)",
  h3: "Subtítulo (H3)",
  ul: "Lista",
  quote: "Cita",
};

function emptyBlock(type: BlogBlock["type"]): BlogBlock {
  switch (type) {
    case "ul":
      return { type: "ul", items: [""] };
    case "quote":
      return { type: "quote", text: "", cite: "" };
    case "h2":
      return { type: "h2", text: "" };
    case "h3":
      return { type: "h3", text: "" };
    default:
      return { type: "p", text: "" };
  }
}

export default function BlogBlockEditor({
  blocks,
  onChange,
}: {
  blocks: BlogBlock[];
  onChange: (next: BlogBlock[]) => void;
}) {
  const update = (i: number, block: BlogBlock) => {
    const next = [...blocks];
    next[i] = block;
    onChange(next);
  };
  const remove = (i: number) => onChange(blocks.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = (type: BlogBlock["type"]) => onChange([...blocks, emptyBlock(type)]);

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, i) => (
        <div key={i} className="rounded-xl border border-sand bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-sage">
              {BLOCK_LABELS[block.type]}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-soft hover:bg-cream-deep disabled:opacity-30"
                aria-label="Subir"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === blocks.length - 1}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ink-soft hover:bg-cream-deep disabled:opacity-30"
                aria-label="Bajar"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-red-600 hover:bg-red-600 hover:text-cream"
                aria-label="Eliminar bloque"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-2">
            {(block.type === "p" || block.type === "h2" || block.type === "h3") && (
              <textarea
                value={block.text}
                onChange={(e) => update(i, { ...block, text: e.target.value })}
                rows={block.type === "p" ? 3 : 1}
                placeholder="Texto…"
                className="input resize-none"
              />
            )}

            {block.type === "ul" && (
              <div className="flex flex-col gap-2">
                {block.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-2">
                    <input
                      value={item}
                      onChange={(e) => {
                        const items = [...block.items];
                        items[ii] = e.target.value;
                        update(i, { ...block, items });
                      }}
                      placeholder="Ítem de la lista…"
                      className="input"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        update(i, {
                          ...block,
                          items: block.items.filter((_, x) => x !== ii),
                        })
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-600 hover:text-cream"
                      aria-label="Quitar ítem"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => update(i, { ...block, items: [...block.items, ""] })}
                  className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-gold-deep hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Agregar ítem
                </button>
              </div>
            )}

            {block.type === "quote" && (
              <div className="flex flex-col gap-2">
                <textarea
                  value={block.text}
                  onChange={(e) => update(i, { ...block, text: e.target.value })}
                  rows={2}
                  placeholder="Texto de la cita…"
                  className="input resize-none"
                />
                <input
                  value={block.cite ?? ""}
                  onChange={(e) => update(i, { ...block, cite: e.target.value })}
                  placeholder="Fuente (opcional)"
                  className="input"
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-2">
        {(Object.keys(BLOCK_LABELS) as BlogBlock["type"][]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => add(type)}
            className="inline-flex items-center gap-1.5 rounded-full border border-sand px-3 py-1.5 text-xs font-semibold text-forest hover:bg-sand"
          >
            <Plus className="h-3.5 w-3.5" />
            {BLOCK_LABELS[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
