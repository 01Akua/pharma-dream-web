<?php
/* POST { orderId } -> { orderId, amount, currency, signature }
   Equivalente a la Cloud Function `boldSignature`: el monto se lee del pedido
   en Firestore, nunca del navegador. */
require __DIR__ . '/_lib.php';

pd_cors();
header('Content-Type: application/json');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') pd_fail(405, 'method-not-allowed');

$orderId = json_decode(file_get_contents('php://input'), true)['orderId'] ?? '';
if (!is_string($orderId) || $orderId === '' || strlen($orderId) > 64) pd_fail(400, 'missing-orderId');

$order = pd_get_order($orderId);
if ($order === null) pd_fail(404, 'order-not-found');
if ($order['status'] !== 'nuevo') pd_fail(409, 'order-not-payable');

$amount = (string) round($order['total']);
$currency = 'COP';
$signature = hash('sha256', $orderId . $amount . $currency . pd_config()['bold_secret_key']);

echo json_encode(compact('orderId', 'amount', 'currency', 'signature'));
