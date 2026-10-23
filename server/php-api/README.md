# Endpoints Bold en PHP (alternativa a Cloud Functions / plan Blaze)

Subir a `public_html/api/` en cPanel: `_lib.php`, `bold-signature.php`, `bold-webhook.php`.
Ojo: el deploy por .zip reemplaza `public_html`; conservar o re-subir la carpeta `api/`.

## Secretos (FUERA de public_html)
Crear `~/pharmadream-secrets/config.json` (mismo nivel que `public_html`):

    { "bold_secret_key": "<llave secreta de Bold>",
      "service_account": <contenido completo del JSON de la cuenta de servicio> }

Cuenta de servicio: Firebase > Configuración > Cuentas de servicio > "Generar nueva clave privada"
(no requiere Blaze). Rol suficiente: Cloud Datastore User.

## Bold
- Webhook en el panel de Bold: `https://pharmadream.com.co/api/bold-webhook.php`
- Sitio: `NEXT_PUBLIC_BOLD_SIGNATURE_URL=https://pharmadream.com.co/api/bold-signature.php`

## Traducción automática (translate.php)
Traduce al vuelo (es -> en/fr) solo el texto que no está en el diccionario del sitio, p. ej. lo que se edite en /admin.
- Subir también `translate.php` a `public_html/api/` (usa `_lib.php` solo para el CORS).
- Google Cloud: activar "Cloud Translation API" en el proyecto y crear una API key (restringida a esa API).
- En `~/pharmadream-secrets/config.json` agregar `"translate_api_key": "<API key>"`.
- La caché queda en `~/pharmadream-secrets/translate-cache/` (un archivo por texto) y hay un tope de 3.000 textos nuevos por día.
- Sitio: `NEXT_PUBLIC_TRANSLATE_URL` (por defecto `https://pharmadream.com.co/api/translate.php`).
- Sin la llave el sitio sigue funcionando: ese texto nuevo simplemente se queda en español.
