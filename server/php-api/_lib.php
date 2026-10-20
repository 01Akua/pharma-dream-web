<?php
/* Utilidades compartidas de los endpoints Bold (alternativa a las Cloud Functions,
   que exigen plan Blaze). La configuración y secretos viven FUERA de public_html:
   ~/pharmadream-secrets/config.json  (ver README.md). */

function pd_config(): array {
    static $cfg = null;
    if ($cfg !== null) return $cfg;
    $path = dirname(__DIR__, 2) . '/pharmadream-secrets/config.json';
    $raw = @file_get_contents($path);
    $cfg = $raw ? json_decode($raw, true) : null;
    if (!is_array($cfg) || empty($cfg['bold_secret_key']) || empty($cfg['service_account'])) {
        pd_fail(500, 'server-not-configured');
    }
    return $cfg;
}

function pd_fail(int $code, string $error): void {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode(['error' => $error]);
    exit;
}

function pd_cors(): void {
    $allowed = [
        'https://pharmadream.com.co',
        'https://www.pharmadream.com.co',
        'https://01akua.github.io',
        'http://localhost:3000',
    ];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function b64url(string $s): string {
    return rtrim(strtr(base64_encode($s), '+/', '-_'), '=');
}

/* Token OAuth2 de la cuenta de servicio (JWT RS256 -> access_token). */
function pd_access_token(): string {
    $sa = pd_config()['service_account'];
    $now = time();
    $header = b64url(json_encode(['alg' => 'RS256', 'typ' => 'JWT']));
    $claims = b64url(json_encode([
        'iss' => $sa['client_email'],
        'scope' => 'https://www.googleapis.com/auth/datastore',
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now,
        'exp' => $now + 3600,
    ]));
    $sig = '';
    if (!openssl_sign("$header.$claims", $sig, $sa['private_key'], OPENSSL_ALGO_SHA256)) {
        pd_fail(500, 'sign-failed');
    }
    $ch = curl_init('https://oauth2.googleapis.com/token');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_POSTFIELDS => http_build_query([
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion' => "$header.$claims." . b64url($sig),
        ]),
    ]);
    $res = json_decode((string) curl_exec($ch), true);
    curl_close($ch);
    if (empty($res['access_token'])) pd_fail(502, 'auth-failed');
    return $res['access_token'];
}

function pd_order_url(string $orderId): string {
    $project = pd_config()['service_account']['project_id'];
    return "https://firestore.googleapis.com/v1/projects/$project/databases/(default)/documents/orders/" . rawurlencode($orderId);
}

/* Devuelve ['status'=>..., 'total'=>...] o null si el pedido no existe. */
function pd_get_order(string $orderId): ?array {
    $ch = curl_init(pd_order_url($orderId));
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . pd_access_token()],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code === 404) return null;
    if ($code !== 200) pd_fail(502, 'firestore-error');
    $f = json_decode($body, true)['fields'] ?? [];
    $t = $f['total'] ?? [];
    return [
        'status' => $f['status']['stringValue'] ?? '',
        'total' => isset($t['integerValue']) ? (float) $t['integerValue'] : (float) ($t['doubleValue'] ?? 0),
    ];
}

/* Actualiza solo los campos dados (strings o bool). */
function pd_update_order(string $orderId, array $fields): void {
    $mask = '';
    $out = [];
    foreach ($fields as $k => $v) {
        $mask .= 'updateMask.fieldPaths=' . rawurlencode($k) . '&';
        if (is_bool($v)) $out[$k] = ['booleanValue' => $v];
        elseif ($v === null) $out[$k] = ['nullValue' => null];
        else $out[$k] = ['stringValue' => (string) $v];
    }
    $ch = curl_init(pd_order_url($orderId) . '?' . rtrim($mask, '&'));
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => 'PATCH',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . pd_access_token(),
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode(['fields' => $out]),
    ]);
    curl_exec($ch);
    curl_close($ch);
}
