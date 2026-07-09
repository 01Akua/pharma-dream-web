<!-- PHARMA-DREAM.md — Web Pharma Dream (dermocosmética) -->
<!-- last_updated: 2026-07-09 | status: activo -->

# Pharma Dream

## Descripción
Web de e-commerce para Pharma Dream, marca de dermocosmética. Home + tienda + producto + panel admin (CRM ventas + CMS contenido).

## Stack
- Lang: Next.js 15 (App Router), TypeScript, Tailwind
- Repo: `Empresa/pharma-dream-web/`

## Estado actual
- Fase: Front construido, checkout con métodos de pago modelados pero sin pasarela real conectada.
- Done:
  - Home, tienda, producto, panel admin `/admin` (gestión de productos, CRM de ventas, CMS de contenido)
  - CheckoutModal con selector de método de pago (`src/lib/crm.ts` → `PAYMENT_METHODS`): contraentrega, transferencia bancaria, tarjeta, PSE, Nequi/Daviplata
  - Fix header: `AnnouncementBar` y `Navbar` se superponían (Navbar tenía `position: fixed` independiente, tapando el logo). Se unificaron en un solo wrapper `fixed` en `layout.tsx`; ajustado `pt-[68px]` → `pt-[110px]` en `/tienda` y `/producto/[id]` para la nueva altura del header combinado.
- En progreso: —
- Pendiente:
  - Conectar pasarela de pago real (`CheckoutModal.tsx` línea ~36 tiene el punto de integración marcado). Opciones enviadas al cliente por WhatsApp para que elija: **Wompi** (Bancolombia, ~2.65%+IVA), **PayU** (~3.49%+IVA), **ePayco** (~2.99%+IVA), **Mercado Pago** (~3.49%+IVA). Falta respuesta del cliente.

## Decisiones
<!-- Append-only. [FECHA] Decisión — Razón -->
- [2026-07-09] Archivo iniciado — proyecto no estaba registrado en el sistema.
- [2026-07-09] Fix overlap header/logo — Navbar fixed independiente pisaba el AnnouncementBar. Solución: wrapper fixed único en layout.tsx.
- [2026-07-09] Se presentaron 4 opciones de pasarela de pago colombiana al cliente (Wompi, PayU, ePayco, Mercado Pago) vía WhatsApp para que elija — pendiente de decisión antes de integrar.

## Notas
- —
