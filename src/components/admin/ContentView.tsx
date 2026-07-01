"use client";

import { useEffect, useState } from "react";
import { Save, ExternalLink, Plus, Trash2 } from "lucide-react";
import {
  useContent,
  patchContent,
  type SiteContent,
} from "@/lib/content";
import type { Notify } from "./AdminApp";
import ImageField from "./ImageField";

type Tab =
  | "anuncios"
  | "hero"
  | "categorias"
  | "ciencia"
  | "blog"
  | "newsletter"
  | "contacto";

const tabs: { id: Tab; label: string }[] = [
  { id: "hero", label: "Portada (Hero)" },
  { id: "anuncios", label: "Barra de anuncios" },
  { id: "categorias", label: "Categorías" },
  { id: "ciencia", label: "Sección Ciencia" },
  { id: "blog", label: "Blog" },
  { id: "newsletter", label: "Club / Newsletter" },
  { id: "contacto", label: "Contacto / Footer" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
      {children}
    </span>
  );
}

export default function ContentView({ notify }: { notify: Notify }) {
  const content = useContent();
  const [draft, setDraft] = useState<SiteContent>(content);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<Tab>("hero");

  // Sincroniza con el store hasta que el usuario empiece a editar
  useEffect(() => {
    if (!dirty) setDraft(content);
  }, [content, dirty]);

  const edit = (updater: (d: SiteContent) => SiteContent) => {
    setDirty(true);
    setDraft((d) => updater(structuredClone(d)));
  };

  const save = () => {
    try {
      patchContent(draft);
      setDirty(false);
      notify("Contenido actualizado");
    } catch (e) {
      notify(e instanceof Error ? e.message : "Error al guardar", "error");
    }
  };

  return (
    <div className="pb-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-forest">
            Contenido del sitio
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Edita los textos e imágenes de toda la página.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-forest px-4 py-2 text-sm font-semibold text-forest transition hover:bg-forest hover:text-cream"
        >
          <ExternalLink className="h-4 w-4" />
          Ver tienda
        </a>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-forest text-cream"
                : "bg-white text-forest hover:bg-sand"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-forest/5">
        {/* HERO */}
        {tab === "hero" && (
          <div className="flex flex-col gap-8">
            {draft.hero.map((slide, i) => (
              <div
                key={i}
                className="grid gap-5 border-b border-sand pb-8 last:border-0 last:pb-0 lg:grid-cols-[240px_1fr]"
              >
                <div>
                  <Label>Imagen del slide {i + 1}</Label>
                  <div className="mt-2">
                    <ImageField
                      value={slide.image}
                      aspect="aspect-[3/4]"
                      onError={(m) => notify(m, "error")}
                      onChange={(v) =>
                        edit((d) => {
                          d.hero[i].image = v;
                          return d;
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label>
                    <Label>Etiqueta superior</Label>
                    <input
                      className="input mt-1"
                      value={slide.eyebrow}
                      onChange={(e) =>
                        edit((d) => {
                          d.hero[i].eyebrow = e.target.value;
                          return d;
                        })
                      }
                    />
                  </label>
                  <label>
                    <Label>Título</Label>
                    <input
                      className="input mt-1"
                      value={slide.title}
                      onChange={(e) =>
                        edit((d) => {
                          d.hero[i].title = e.target.value;
                          return d;
                        })
                      }
                    />
                  </label>
                  <label>
                    <Label>Subtítulo</Label>
                    <textarea
                      className="input mt-1 resize-none"
                      rows={2}
                      value={slide.subtitle}
                      onChange={(e) =>
                        edit((d) => {
                          d.hero[i].subtitle = e.target.value;
                          return d;
                        })
                      }
                    />
                  </label>
                  <label>
                    <Label>Texto del botón</Label>
                    <input
                      className="input mt-1"
                      value={slide.cta}
                      onChange={(e) =>
                        edit((d) => {
                          d.hero[i].cta = e.target.value;
                          return d;
                        })
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ANUNCIOS */}
        {tab === "anuncios" && (
          <div className="flex flex-col gap-3">
            <Label>Mensajes de la barra superior</Label>
            {draft.announcement.map((msg, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="input"
                  value={msg}
                  onChange={(e) =>
                    edit((d) => {
                      d.announcement[i] = e.target.value;
                      return d;
                    })
                  }
                />
                <button
                  onClick={() =>
                    edit((d) => {
                      d.announcement.splice(i, 1);
                      return d;
                    })
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sand text-red-600 hover:bg-red-600 hover:text-cream"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                edit((d) => {
                  d.announcement.push("Nuevo mensaje");
                  return d;
                })
              }
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-forest px-4 py-2 text-sm font-semibold text-forest hover:bg-forest hover:text-cream"
            >
              <Plus className="h-4 w-4" /> Añadir mensaje
            </button>
          </div>
        )}

        {/* CATEGORIAS */}
        {tab === "categorias" && (
          <div className="grid gap-6 md:grid-cols-3">
            {draft.categories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-3">
                <ImageField
                  value={cat.image}
                  aspect="aspect-square"
                  onError={(m) => notify(m, "error")}
                  onChange={(v) =>
                    edit((d) => {
                      d.categories[i].image = v;
                      return d;
                    })
                  }
                />
                <label>
                  <Label>Nombre</Label>
                  <input
                    className="input mt-1"
                    value={cat.name}
                    onChange={(e) =>
                      edit((d) => {
                        d.categories[i].name = e.target.value;
                        return d;
                      })
                    }
                  />
                </label>
                <label>
                  <Label>Descripción</Label>
                  <textarea
                    className="input mt-1 resize-none"
                    rows={2}
                    value={cat.description}
                    onChange={(e) =>
                      edit((d) => {
                        d.categories[i].description = e.target.value;
                        return d;
                      })
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        {/* CIENCIA */}
        {tab === "ciencia" && (
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <div>
              <Label>Imagen de la sección</Label>
              <div className="mt-2">
                <ImageField
                  value={draft.science.image}
                  aspect="aspect-[4/5]"
                  onError={(m) => notify(m, "error")}
                  onChange={(v) =>
                    edit((d) => {
                      d.science.image = v;
                      return d;
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label>
                <Label>Etiqueta superior</Label>
                <input
                  className="input mt-1"
                  value={draft.science.eyebrow}
                  onChange={(e) =>
                    edit((d) => {
                      d.science.eyebrow = e.target.value;
                      return d;
                    })
                  }
                />
              </label>
              <label>
                <Label>Título</Label>
                <textarea
                  className="input mt-1 resize-none"
                  rows={2}
                  value={draft.science.title}
                  onChange={(e) =>
                    edit((d) => {
                      d.science.title = e.target.value;
                      return d;
                    })
                  }
                />
              </label>
              <label>
                <Label>Descripción</Label>
                <textarea
                  className="input mt-1 resize-none"
                  rows={3}
                  value={draft.science.description}
                  onChange={(e) =>
                    edit((d) => {
                      d.science.description = e.target.value;
                      return d;
                    })
                  }
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label>
                  <Label>Dato destacado</Label>
                  <input
                    className="input mt-1"
                    value={draft.science.statValue}
                    onChange={(e) =>
                      edit((d) => {
                        d.science.statValue = e.target.value;
                        return d;
                      })
                    }
                  />
                </label>
                <label>
                  <Label>Texto del dato</Label>
                  <input
                    className="input mt-1"
                    value={draft.science.statLabel}
                    onChange={(e) =>
                      edit((d) => {
                        d.science.statLabel = e.target.value;
                        return d;
                      })
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* BLOG */}
        {tab === "blog" && (
          <div className="grid gap-6 md:grid-cols-3">
            {draft.blog.map((post, i) => (
              <div key={i} className="flex flex-col gap-3">
                <ImageField
                  value={post.image}
                  aspect="aspect-[16/11]"
                  onError={(m) => notify(m, "error")}
                  onChange={(v) =>
                    edit((d) => {
                      d.blog[i].image = v;
                      return d;
                    })
                  }
                />
                <label>
                  <Label>Etiqueta</Label>
                  <input
                    className="input mt-1"
                    value={post.tag}
                    onChange={(e) =>
                      edit((d) => {
                        d.blog[i].tag = e.target.value;
                        return d;
                      })
                    }
                  />
                </label>
                <label>
                  <Label>Título</Label>
                  <textarea
                    className="input mt-1 resize-none"
                    rows={2}
                    value={post.title}
                    onChange={(e) =>
                      edit((d) => {
                        d.blog[i].title = e.target.value;
                        return d;
                      })
                    }
                  />
                </label>
                <label>
                  <Label>Extracto</Label>
                  <textarea
                    className="input mt-1 resize-none"
                    rows={3}
                    value={post.excerpt}
                    onChange={(e) =>
                      edit((d) => {
                        d.blog[i].excerpt = e.target.value;
                        return d;
                      })
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        {/* NEWSLETTER */}
        {tab === "newsletter" && (
          <div className="flex max-w-xl flex-col gap-3">
            <label>
              <Label>Título</Label>
              <input
                className="input mt-1"
                value={draft.newsletter.title}
                onChange={(e) =>
                  edit((d) => {
                    d.newsletter.title = e.target.value;
                    return d;
                  })
                }
              />
            </label>
            <label>
              <Label>Subtítulo</Label>
              <textarea
                className="input mt-1 resize-none"
                rows={3}
                value={draft.newsletter.subtitle}
                onChange={(e) =>
                  edit((d) => {
                    d.newsletter.subtitle = e.target.value;
                    return d;
                  })
                }
              />
            </label>
          </div>
        )}

        {/* CONTACTO */}
        {tab === "contacto" && (
          <div className="flex max-w-xl flex-col gap-3">
            <label>
              <Label>Descripción de marca</Label>
              <textarea
                className="input mt-1 resize-none"
                rows={3}
                value={draft.footer.blurb}
                onChange={(e) =>
                  edit((d) => {
                    d.footer.blurb = e.target.value;
                    return d;
                  })
                }
              />
            </label>
            <label>
              <Label>Ciudad</Label>
              <input
                className="input mt-1"
                value={draft.footer.city}
                onChange={(e) =>
                  edit((d) => {
                    d.footer.city = e.target.value;
                    return d;
                  })
                }
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label>
                <Label>Teléfono</Label>
                <input
                  className="input mt-1"
                  value={draft.footer.phone}
                  onChange={(e) =>
                    edit((d) => {
                      d.footer.phone = e.target.value;
                      return d;
                    })
                  }
                />
              </label>
              <label>
                <Label>Email</Label>
                <input
                  className="input mt-1"
                  value={draft.footer.email}
                  onChange={(e) =>
                    edit((d) => {
                      d.footer.email = e.target.value;
                      return d;
                    })
                  }
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Barra de guardado */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-sand bg-cream/95 px-5 py-3 backdrop-blur-md lg:pl-64">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-sm text-ink-soft">
            {dirty ? "Tienes cambios sin guardar" : "Todo guardado"}
          </span>
          <button
            onClick={save}
            disabled={!dirty}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-cream transition enabled:hover:bg-gold enabled:hover:text-forest disabled:opacity-40"
          >
            <Save className="h-4 w-4" />
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
