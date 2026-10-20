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
