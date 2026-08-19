<!-- PHARMA-DREAM.md — Web Pharma Dream (dermocosmética) -->
<!-- last_updated: 2026-08-19 | status: activo -->

# Pharma Dream

## Descripción
Web de e-commerce para Pharma Dream, marca de dermocosmética. Home + tienda + producto + blog + panel admin completo (productos, blog, CRM ventas, CMS contenido). Deploy estático en GitHub Pages vía `output: export`.

## Stack
- Lang: Next.js 16 (App Router), TypeScript, Tailwind
- Repo: `Empresa/pharma-dream-web/`
- Deploy: GitHub Pages (`https://01akua.github.io/pharma-dream-web/`), sin backend — 100% estático.

## Estado actual
- Fase: Front + contenido completo (productos, blog, ingredientes, nosotros) con datos reales extraídos del sitio original y fichas técnicas. **Pedidos (Ventas/CRM) ya migrados a Firebase real** (localStorage sigue solo para productos, blog y contenido del home).
- Done:
  - Home, tienda (por categoría), producto (ficha completa: ingredientes, INCI, modo de empleo, advertencias), blog real (7 artículos + CRUD admin), /ingredientes, /nosotros.
  - Panel admin `/admin`: productos (todos los campos), blog (crear/editar/eliminar con editor de bloques), CRM de ventas, CMS de contenido del home.
  - CheckoutModal con selector de método de pago (`src/lib/crm.ts` → `PAYMENT_METHODS`): contraentrega, transferencia bancaria, tarjeta, PSE, Nequi/Daviplata.
  - [2026-07-23] Correcciones del cliente (doc "Pharma dream correcciones.docx") aplicadas: slogan del hero ("Tu belleza brilla de adentro hacia afuera"), reorden de nav (Nosotros antes de Blog), sección "¿Qué es el HEMP?" movida de /nosotros al home (antes de elegir productos) con imagen representativa nueva (aceite + semillas + hoja, no la foto de persona con gotero), banner "Conoce nuestros ingredientes" en el home, "Productos destacados" fijo a 4 productos específicos (sin filtros redundantes con las categorías de arriba), badge "Libre de crueldad animal" agrandado y destacado, fix de bug real en `blogStore.ts` (imagen de post podía quedar vacía si localStorage tenía datos viejos), campo de correo electrónico agregado al checkout y al CRM admin.
  - [2026-07-23] **Firebase (Firestore + Authentication) conectado en real para Pedidos/CRM**, como demo previa a que Diana apruebe el cobro del núcleo obligatorio:
    - Proyecto Firebase creado bajo el Gmail personal de Luis (temporal — Firebase permite transferir el proyecto completo a la cuenta del negocio después, sin rehacer nada).
    - Firestore en `southamerica-east1` (São Paulo), colección `orders` + contador atómico en `meta/orderCounter` (sigue la numeración PD-1052 en adelante).
    - `src/lib/crm.ts` reescrito: `createOrder`, `updateOrderStatus`, `deleteOrder`, `resetOrders` ahora son async contra Firestore; `useOrders()` usa `onSnapshot` (tiempo real). `CheckoutModal.tsx` actualizado a `await` con estado de carga ("Guardando pedido…").
    - **Firebase Authentication agregado** (no estaba en el alcance original de hoy, pero era necesario): el panel `/admin` ya no usa la clave hardcodeada `admin`/`pharma2026` — ahora hace login real contra Firebase Auth (`src/lib/auth.ts`, `Login.tsx`, `AdminApp.tsx`). Usuario creado: `admin@pharmadreamweb.com` (contraseña generada, guardada por Luis).
    - Reglas de Firestore: `orders` — cualquiera puede `create` (checkout público, valida que traiga los campos mínimos), pero `read/update/delete` exigen `request.auth != null` (solo el admin logueado). Se evitó dejar la base abierta a todo el público, que habría expuesto nombres/teléfonos/correos de clientes.
    - Probado extremo a extremo: compra real desde `/producto/serum-hidratante` → pedido `PD-1052` aparece al instante en `/admin` (Resumen y Ventas) → cambio de estado y borrado desde el admin se reflejan en Firestore. Pedido de prueba eliminado al terminar.
    - Productos, blog y contenido del home **siguen en localStorage** — no migrados hoy, fuera del alcance de esta sesión.
- En progreso: —
- Pendiente:
  - Conectar pasarela de pago real (`CheckoutModal.tsx` línea ~36 tiene el punto de integración marcado). Opciones enviadas al cliente por WhatsApp: **Wompi** (~2.65%+IVA), **PayU** (~3.49%+IVA), **ePayco** (~2.99%+IVA), **Mercado Pago** (~3.49%+IVA), **Bold** (~1.99%+IVA). Falta respuesta del cliente.
  - Migrar productos, blog y contenido del home de localStorage a Firestore (Pedidos/CRM ya migrado, ver arriba).
  - **Transferir el proyecto Firebase** de la cuenta personal de Luis a una cuenta Google del negocio (o agregar a Diana como propietaria) antes de considerar esto "en producción" — pendiente de que Diana confirme el cobro del núcleo obligatorio.
  - **Base de datos dividida en dos ítems de cobro (2026-07-23):**
    1. **Núcleo obligatorio** (pedidos + productos + integración con la pasarela de pago) — no es opcional si el cliente quiere pasarela real, porque la confirmación de pago llega por webhook a un servidor, no al navegador. Ya se avanzó la parte de pedidos como demo (ver Done); cotización formal aún no enviada a Diana (estimado interno: ~26-39h combinando pasarela + BD base).
    2. **Addon de marketing** (captura de correos en checkout + newsletter, estructurado para conectar después con Mailchimp/Brevo) — propuesta ya enviada a Diana por **$900.000 COP**.

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
- [2026-07-23] Correcciones del cliente aplicadas desde "Pharma dream correcciones.docx" (conversación de WhatsApp con Diana) — ver detalle en "Pendiente"/"Done" arriba.
- [2026-07-23] Análisis de precio: el cliente paga $400.000 COP por el sitio completo + chatbot, lo cual es una tarifa muy por debajo de mercado para el alcance ya construido (catálogo, carrito, checkout, blog con CMS, panel admin, CRM) — se le recomendó a Luis no meter desarrollos nuevos (BD, pasarela) dentro de esa misma tarifa y cobrarlos aparte.
- [2026-07-23] Decisión de alcance: la base de datos se divide en dos ítems de cobro separados — (1) núcleo obligatorio para que pedidos/pasarela funcionen (cotización pendiente de enviar) y (2) addon de marketing/email (correos + estructura para Mailchimp/Brevo), propuesto a $900.000 COP. Razón: aunque técnicamente pasarela+BD van pegadas (no se pueden separar en la construcción), sí se pueden facturar como líneas distintas; el addon de marketing en cambio sí es genuinamente independiente y aplazable.
- [2026-07-23] Recomendación de arquitectura de cuentas: Firebase debe crearse bajo un correo Google del negocio (no el Gmail personal de Luis), con Luis como colaborador — evita que Luis quede como dueño único de datos de clientes de un tercero, y protege la continuidad del cliente si cambia de desarrollador. (Nota: por pedido explícito de Luis se creó igual bajo su cuenta personal para poder mostrar la demo funcionando hoy mismo; queda pendiente transferirlo antes de producción.)
- [2026-07-23] Proyecto Firebase "pharma-dream-web" creado (Firestore + Authentication) y conectado en código para Pedidos/CRM. Se agregó Firebase Authentication (fuera del pedido original de la sesión) porque dejar Firestore abierto sin login real habría expuesto los datos de clientes a cualquiera que inspeccionara el sitio — el bloqueo de seguridad automático del harness impidió publicar reglas abiertas, y en su lugar se preguntó al usuario, quien confirmó agregar autenticación real. Ver detalle técnico completo en "Done" arriba.

## Notas
- —
