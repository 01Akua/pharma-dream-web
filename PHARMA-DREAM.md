<!-- PHARMA-DREAM.md — Web Pharma Dream (dermocosmética) -->
<!-- last_updated: 2026-07-10 | status: activo -->

# Pharma Dream

## Descripción
Web de e-commerce para Pharma Dream, marca de dermocosmética. Home + tienda + producto + blog + panel admin completo (productos, blog, CRM ventas, CMS contenido). Deploy estático en GitHub Pages vía `output: export`.

## Stack
- Lang: Next.js 16 (App Router), TypeScript, Tailwind
- Repo: `Empresa/pharma-dream-web/`
- Deploy: GitHub Pages (`https://01akua.github.io/pharma-dream-web/`), sin backend — 100% estático.

## Estado actual
- Fase: Front + contenido completo (productos, blog, ingredientes, nosotros) con datos reales extraídos del sitio original y fichas técnicas. Panel admin completo pero en modo demo (localStorage).
- Done:
  - Home, tienda (por categoría), producto (ficha completa: ingredientes, INCI, modo de empleo, advertencias), blog real (7 artículos + CRUD admin), /ingredientes, /nosotros.
  - Panel admin `/admin`: productos (todos los campos), blog (crear/editar/eliminar con editor de bloques), CRM de ventas, CMS de contenido del home.
  - CheckoutModal con selector de método de pago (`src/lib/crm.ts` → `PAYMENT_METHODS`): contraentrega, transferencia bancaria, tarjeta, PSE, Nequi/Daviplata.
- En progreso: —
- Pendiente:
  - Conectar pasarela de pago real (`CheckoutModal.tsx` línea ~36 tiene el punto de integración marcado). Opciones enviadas al cliente por WhatsApp: **Wompi** (~2.65%+IVA), **PayU** (~3.49%+IVA), **ePayco** (~2.99%+IVA), **Mercado Pago** (~3.49%+IVA), **Bold** (~1.99%+IVA). Falta respuesta del cliente.
  - **Migración a backend real** (decisión del cliente, 2026-07-10): mientras el cliente aprueba el sitio, el panel admin sigue en localStorage (por navegador, no sincroniza entre dispositivos ni se ve reflejado para visitantes reales). Cuando apruebe, migrar a base de datos real (ej. Supabase) + hosting con servidor (Vercel/Railway en vez de GitHub Pages) para que los cambios del admin se vean en vivo. La capa de datos (`src/lib/store.ts`, `blogStore.ts`, `content.ts`, `crm.ts`) ya está diseñada para migrar sin tocar los componentes (solo cambiar read/write).

## Limitación conocida (mientras siga en localStorage)
Productos o posts de blog **nuevos** creados desde el admin no tienen ruta estática (`generateStaticParams` solo conoce los que existían en el último build) — su URL da 404 hasta el próximo build+deploy. **Editar** un producto/post existente sí funciona bien (overlay en el navegador de quien edita). Esto es esperado y aceptado por el cliente hasta la migración a backend real.

## Decisiones
<!-- Append-only. [FECHA] Decisión — Razón -->
- [2026-07-09] Archivo iniciado — proyecto no estaba registrado en el sistema.
- [2026-07-09] Fix overlap header/logo — Navbar fixed independiente pisaba el AnnouncementBar. Solución: wrapper fixed único en layout.tsx.
- [2026-07-09] Se presentaron 4 opciones de pasarela de pago colombiana al cliente (Wompi, PayU, ePayco, Mercado Pago) vía WhatsApp para que elija — pendiente de decisión antes de integrar.
- [2026-07-09] Bold agregada como 5ta opción de pasarela (comisión más baja, ~1.99%+IVA, soporta Addi).
- [2026-07-10] Contenido real extraído del sitio original (pharma-dream.com) y de fichas técnicas 2026: logo oficial, fotos reales (hero, categorías, nosotros, blog), ficha completa de los 14 productos (ingredientes/INCI/modo de empleo/advertencias), página /ingredientes, blog con los 7 artículos reales, /nosotros complementado.
- [2026-07-10] Panel admin ampliado a control completo: blog editable (CRUD + editor de bloques) y ficha de producto completa editable. Cliente decidió mantenerlo en localStorage por ahora; migrar a backend real (Supabase + hosting con servidor) recién cuando apruebe el sitio para lanzamiento oficial.
- [2026-07-10] Fix bug de layout en tabla de blog/productos del admin (columnas Fecha/Estado/Acciones se veían cortadas) — causa: al grid-item flex le faltaba `min-w-0`, el texto largo forzaba el ancho de la columna. Se agregó importador de artículos externos (`src/lib/blogImport.ts`): el cliente escribe el post en cualquier editor de texto siguiendo un formato con encabezado `---` + markdown simple (`##`/`###`/`-`/`>`), lo sube como `.md`/`.txt` desde "Importar artículo" y se autocompleta el editor (título, categoría, fecha, autor, extracto, bloques). Botón "Formato para redactar externo" muestra las reglas y una plantilla descargable/copiable.

## Notas
- —
