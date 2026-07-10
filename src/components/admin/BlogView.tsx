"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, EyeOff, Newspaper, ExternalLink } from "lucide-react";
import {
  useAllBlogPosts,
  deleteBlogPost,
  toggleBlogPublished,
  type StoredBlogPost,
} from "@/lib/blogStore";
import { formatBlogDate } from "@/lib/blog";
import type { Notify } from "./AdminApp";
import BlogEditor from "./BlogEditor";

export default function BlogView({ notify }: { notify: Notify }) {
  const posts = useAllBlogPosts();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<StoredBlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  const filtered = useMemo(
    () => posts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
    [posts, query],
  );

  const closeEditor = () => {
    setEditing(null);
    setCreating(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-forest">Blog</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {posts.length} artículos publicados en el sitio.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-gold hover:text-forest"
        >
          <Plus className="h-4 w-4" />
          Nuevo artículo
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-sand bg-white px-4">
        <Search className="h-4 w-4 text-ink-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artículo…"
          className="w-full bg-transparent py-2.5 text-sm text-forest outline-none"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-forest/5">
        <div className="hidden grid-cols-[1fr_140px_140px_110px_130px] gap-4 border-b border-sand px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-soft lg:grid">
          <span>Artículo</span>
          <span>Categoría</span>
          <span>Fecha</span>
          <span>Estado</span>
          <span className="text-right">Acciones</span>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-ink-soft">
            <Newspaper className="h-8 w-8" />
            <p>No hay artículos que coincidan.</p>
          </div>
        ) : (
          filtered.map((p) => (
            <div
              key={p.slug}
              className="grid grid-cols-1 gap-3 border-b border-sand px-5 py-4 last:border-0 lg:grid-cols-[1fr_140px_140px_110px_130px] lg:items-center lg:gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-cream-deep ring-1 ring-forest/10">
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt="" className="h-full w-full object-cover" />
                  )}
                </span>
                <div className="min-w-0">
                  <div className="truncate font-medium text-forest">{p.title}</div>
                  <div className="truncate text-xs text-ink-soft">{p.excerpt}</div>
                </div>
              </div>

              <div className="text-sm text-ink-soft">
                <span className="lg:hidden">Categoría: </span>
                {p.tag}
              </div>

              <div className="text-sm text-ink-soft">
                <span className="lg:hidden">Fecha: </span>
                {formatBlogDate(p.date)}
              </div>

              <div>
                <button
                  onClick={() => {
                    toggleBlogPublished(p.slug);
                    notify(p.published ? `"${p.title}" ocultado` : `"${p.title}" publicado`);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold transition ${
                    p.published
                      ? "bg-sage/20 text-forest hover:bg-sage/30"
                      : "bg-sand text-ink-soft hover:bg-sand/70"
                  }`}
                >
                  {p.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  {p.published ? "Publicado" : "Oculto"}
                </button>
              </div>

              <div className="flex items-center gap-2 lg:justify-end">
                <a
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-deep text-forest transition hover:bg-forest hover:text-cream"
                  aria-label="Ver artículo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setEditing(p)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-deep text-forest transition hover:bg-forest hover:text-cream"
                  aria-label="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setConfirmSlug(p.slug)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream-deep text-red-600 transition hover:bg-red-600 hover:text-cream"
                  aria-label="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {(editing || creating) && (
        <BlogEditor post={editing} onClose={closeEditor} notify={notify} />
      )}

      {confirmSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={() => setConfirmSlug(null)} />
          <div className="relative w-full max-w-sm rounded-2xl bg-cream p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-forest">¿Eliminar artículo?</h3>
            <p className="mt-2 text-sm text-ink-soft">Esta acción no se puede deshacer.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmSlug(null)}
                className="flex-1 rounded-full border border-sand py-2.5 text-sm font-semibold text-forest hover:bg-sand"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const p = posts.find((x) => x.slug === confirmSlug);
                  deleteBlogPost(confirmSlug);
                  setConfirmSlug(null);
                  notify(`"${p?.title ?? "Artículo"}" eliminado`);
                }}
                className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-semibold text-cream hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
