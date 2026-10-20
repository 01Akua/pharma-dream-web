<?php
/* Webhook de Bold. Verifica HMAC-SHA256(base64(cuerpo crudo)) contra x-bold-signature
   y marca el pedido como pagado. Equivalente a la Cloud Function `boldWebhook`. */
require __DIR__ . '/_lib.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { http_response_code(405); exit('method-not-allowed'); }

$raw = file_get_contents('php://input');
$expected = hash_hmac('sha256', base64_encode($raw), pd_config()['bold_secret_key']);
$received = $_SERVER['HTTP_X_BOLD_SIGNATURE'] ?? '';
if (!hash_equals($expected, $received)) { http_response_code(401); exit('invalid-signature'); }

$event = json_decode($raw, true) ?: [];
$data = $event['data'] ?? [];
$orderId = $data['orderId'] ?? $data['order_id'] ?? $data['metadata']['reference'] ?? $data['reference'] ?? null;
$paymentId = $data['payment_id'] ?? $event['subject'] ?? null;

if (is_string($orderId) && $orderId !== '' && pd_get_order($orderId) !== null) {
    if (($event['type'] ?? '') === 'SALE_APPROVED') {
        pd_update_order($orderId, ['status' => 'pagado', 'boldPaymentId' => $paymentId]);
    } elseif (($event['type'] ?? '') === 'SALE_REJECTED') {
        pd_update_order($orderId, ['boldPaymentFailed' => true, 'boldPaymentId' => $paymentId]);
    }
}
http_response_code(200);
echo 'ok';
