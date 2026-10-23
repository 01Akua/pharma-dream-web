<?php
/* Traducción automática de textos del sitio (es -> en/fr) con caché en disco.
   Solo se llama para texto que no está en el diccionario estático del sitio
   (p. ej. productos o artículos nuevos creados desde /admin).

   Requiere en ~/pharmadream-secrets/config.json:  "translate_api_key": "<API key de Google Cloud Translation>"
   La caché vive en ~/pharmadream-secrets/translate-cache/ (fuera de public_html). */

require_once __DIR__ . '/_lib.php';

pd_cors();
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') pd_fail(405, 'method-not-allowed');

$body = json_decode((string) file_get_contents('php://input'), true);
$target = $body['target'] ?? '';
$texts = $body['texts'] ?? [];
if (!in_array($target, ['en', 'fr'], true) || !is_array($texts) || count($texts) === 0 || count($texts) > 40) {
    pd_fail(400, 'bad-request');
}

$secrets = dirname(__DIR__, 2) . '/pharmadream-secrets';
$cfg = json_decode((string) @file_get_contents("$secrets/config.json"), true) ?: [];
$apiKey = $cfg['translate_api_key'] ?? '';
if ($apiKey === '') pd_fail(500, 'translate-not-configured');

$cacheDir = "$secrets/translate-cache";
if (!is_dir($cacheDir)) @mkdir($cacheDir, 0700, true);

$out = array_fill(0, count($texts), '');
$missing = []; // índice => texto
foreach ($texts as $i => $t) {
    if (!is_string($t) || $t === '' || mb_strlen($t) > 4000) continue;
    $file = "$cacheDir/" . sha1($target . "\n" . $t) . '.txt';
    if (is_file($file)) {
        $out[$i] = (string) file_get_contents($file);
    } else {
        $missing[$i] = $t;
    }
}

/* Límite diario de textos nuevos para acotar el gasto si alguien abusa del endpoint. */
if ($missing) {
    $counter = "$cacheDir/_count-" . date('Ymd') . '.txt';
    $used = (int) @file_get_contents($counter);
    if ($used + count($missing) > 3000) pd_fail(429, 'daily-limit');
    @file_put_contents($counter, (string) ($used + count($missing)));

    $ch = curl_init('https://translation.googleapis.com/language/translate/v2?key=' . rawurlencode($apiKey));
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode([
            'q' => array_values($missing),
            'source' => 'es',
            'target' => $target,
            'format' => 'text',
        ]),
    ]);
    $res = json_decode((string) curl_exec($ch), true);
    $tr = $res['data']['translations'] ?? null;
    if (!is_array($tr) || count($tr) !== count($missing)) pd_fail(502, 'translate-failed');

    $j = 0;
    foreach ($missing as $i => $orig) {
        $text = (string) ($tr[$j++]['translatedText'] ?? '');
        $out[$i] = $text;
        if ($text !== '') {
            @file_put_contents("$cacheDir/" . sha1($target . "\n" . $orig) . '.txt', $text);
        }
    }
}

echo json_encode(['translations' => $out], JSON_UNESCAPED_UNICODE);
