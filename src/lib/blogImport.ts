/* ============================================================
   Importador de artículos de blog desde un archivo de texto (.md)
   escrito siguiendo el formato Pharma Dream. Permite al cliente
   redactar artículos por fuera del panel (en cualquier editor de
   texto) y subirlos para que se conviertan automáticamente en un
   artículo con título, categoría, fecha, autor, extracto y el
   cuerpo completo ya formateado.
   ============================================================ */

import type { BlogBlock } from "./blog";
import { slugify } from "./store";

export type ParsedBlogPost = {
  title: string;
  slug: string;
  tag: string;
  author: string;
  date: string;
  excerpt: string;
  image: string;
  body: BlogBlock[];
};

export type ParseResult = {
  post: ParsedBlogPost | null;
  warnings: string[];
  errors: string[];
};

const FRONTMATTER_KEYS = [
  "titulo",
  "categoria",
  "autor",
  "fecha",
  "extracto",
  "imagen",
  "slug",
] as const;

function parseFrontmatter(block: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of block.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();
    if ((FRONTMATTER_KEYS as readonly string[]).includes(key)) {
      out[key] = value;
    }
  }
  return out;
}

function parseBody(text: string): BlogBlock[] {
  const lines = text.split("\n");
  const blocks: BlogBlock[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    if (line === "") {
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith("- ") || l.startsWith("* ")) {
          items.push(l.slice(2).trim());
          i++;
        } else if (l === "") {
          break;
        } else {
          break;
        }
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (line.startsWith("> ") || line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith(">")) {
          quoteLines.push(l.replace(/^>\s?/, ""));
          i++;
        } else {
          break;
        }
      }
      let cite: string | undefined;
      let textLines = quoteLines;
      const last = quoteLines[quoteLines.length - 1] ?? "";
      if (/^[—-]{1,2}\s*/.test(last)) {
        cite = last.replace(/^[—-]{1,2}\s*/, "").trim();
        textLines = quoteLines.slice(0, -1);
      }
      blocks.push({
        type: "quote",
        text: textLines.join(" ").trim(),
        ...(cite ? { cite } : {}),
      });
      continue;
    }

    // Párrafo: junta líneas seguidas hasta la próxima línea en blanco
    const paraLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i].trim();
      if (
        l === "" ||
        l.startsWith("## ") ||
        l.startsWith("### ") ||
        l.startsWith("- ") ||
        l.startsWith("* ") ||
        l.startsWith(">")
      ) {
        break;
      }
      paraLines.push(l);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "p", text: paraLines.join(" ").trim() });
    }
  }

  return blocks;
}

/** Parsea el texto completo de un archivo .md de artículo Pharma Dream. */
export function parseBlogMarkdown(raw: string): ParseResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  let text = raw.replace(/\r\n/g, "\n").trim();

  let meta: Record<string, string> = {};
  if (text.startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    if (end !== -1) {
      const frontmatterBlock = text.slice(3, end).trim();
      meta = parseFrontmatter(frontmatterBlock);
      text = text.slice(end + 4).trim();
    } else {
      warnings.push(
        "No se encontró el cierre '---' del encabezado; se ignoró el encabezado.",
      );
    }
  } else {
    warnings.push(
      "El archivo no empieza con un encabezado '---'. Se usarán valores por defecto para título, categoría, etc.",
    );
  }

  const title = meta.titulo?.trim() || "";
  if (!title) errors.push("Falta el campo 'titulo' en el encabezado.");

  const body = parseBody(text);
  if (body.length === 0) errors.push("El artículo no tiene contenido en el cuerpo.");

  if (!meta.extracto) warnings.push("Falta 'extracto' — se generó uno automático.");
  if (!meta.categoria) warnings.push("Falta 'categoria' — se usó 'Rutina' por defecto.");
  if (!meta.imagen)
    warnings.push("Falta 'imagen' — deberás subir la imagen destacada manualmente.");

  if (errors.length > 0) return { post: null, warnings, errors };

  const excerpt =
    meta.extracto?.trim() ||
    (body.find((b) => b.type === "p") as { text: string } | undefined)?.text.slice(
      0,
      140,
    ) ||
    "";

  const post: ParsedBlogPost = {
    title,
    slug: meta.slug?.trim() ? slugify(meta.slug) : slugify(title),
    tag: meta.categoria?.trim() || "Rutina",
    author: meta.autor?.trim() || "Pharma Dream",
    date: /^\d{4}-\d{2}-\d{2}$/.test(meta.fecha ?? "")
      ? meta.fecha
      : new Date().toISOString().slice(0, 10),
    excerpt,
    image: meta.imagen?.trim() || "",
    body,
  };

  return { post, warnings, errors };
}

export const BLOG_TEMPLATE = `---
titulo: Título del artículo
categoria: Rutina
autor: Pharma Dream
fecha: ${new Date().toISOString().slice(0, 10)}
extracto: Resumen corto de 1-2 líneas que aparece en la tarjeta del blog.
imagen:
---

Escribe aquí el párrafo de introducción, normal, sin símbolos delante.

## Un título de sección

Otro párrafo debajo del título de sección.

### Un subtítulo más chico

- Primer punto de una lista
- Segundo punto
- Tercer punto

> Una cita textual destacada, si aplica.
> — Nombre de quien la dijo (opcional)

Párrafo de cierre del artículo.
`;
