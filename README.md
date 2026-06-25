# Pharma Dream — Nueva web

Rediseño de [pharma-dream.com](https://pharma-dream.com) construido desde cero con foco en calidad visual, rendimiento y conversión.

**Demo en vivo:** https://01akua.github.io/pharma-dream-web/

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (sistema de diseño en `globals.css`)
- **Framer Motion** (animaciones de scroll y transiciones)
- **lucide-react** (iconografía)
- Export estático desplegado en **GitHub Pages**

## Páginas

- `/` — Home (hero animado, categorías, productos, ciencia, reseñas, blog, newsletter)
- `/tienda` — Catálogo con filtros y ordenamiento
- `/producto/[id]` — Detalle de producto con galería, ingredientes y relacionados

## Mejoras frente al sitio original

- Popup del Club con _delay_ + _exit-intent_ y memoria de cierre (no reaparece).
- Hero con overlay para legibilidad real del texto.
- Prueba social (reseñas) y sellos de confianza (INVIMA).
- Tarjetas de producto con estética de marca y micro-interacciones.
- Animaciones suaves respetando `prefers-reduced-motion`.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera ./out (export estático)
```

## Notas

Las imágenes son _placeholders_ de Unsplash. Reemplazar por fotografía real
de producto para producción.
