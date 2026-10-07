"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Clock, X } from "lucide-react";

function Resultado() {
  const params = useSearchParams();
  const orderId = params.get("order") || params.get("bold-order-id");
  const status = params.get("bold-tx-status");

  const approved = status === "approved";
  const rejected = status === "rejected" || status === "failed";

  return (
    <main className="flex min-h-[60vh] flex-1 items-center justify-center px-5 pt-[110px]">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-card">
        <span
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            approved
              ? "bg-sage/25"
              : rejected
                ? "bg-red-100"
                : "bg-gold/15"
          }`}
        >
          {approved ? (
            <Check className="h-8 w-8 text-forest" />
          ) : rejected ? (
            <X className="h-8 w-8 text-red-600" />
          ) : (
            <Clock className="h-8 w-8 text-gold-deep" />
          )}
        </span>

        <h1 className="mt-5 font-display text-2xl font-semibold text-forest">
          {approved
            ? "¡Pago aprobado!"
            : rejected
              ? "El pago no se pudo procesar"
              : "Estamos confirmando tu pago"}
        </h1>

        {orderId && (
          <p className="mt-2 text-sm text-ink-soft">
            Pedido <strong className="text-forest">{orderId}</strong>
          </p>
        )}

        <p className="mt-3 text-sm text-ink-soft">
          {approved
            ? "Gracias por tu compra. Te contactaremos pronto para coordinar el envío."
            : rejected
              ? "Puedes intentar de nuevo con otro medio de pago, o escribirnos por WhatsApp si el problema persiste."
              : "Esto puede tardar unos segundos. Si el pago ya se descontó de tu cuenta, tu pedido quedará confirmado automáticamente."}
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/tienda"
            className="rounded-full bg-forest py-3 text-sm font-semibold text-cream transition hover:bg-gold hover:text-forest"
          >
            Seguir comprando
          </Link>
          <a
            href="https://wa.me/573009979933"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-sand py-3 text-sm font-semibold text-forest transition hover:border-sage"
          >
            Hablar con un asesor
          </a>
        </div>
      </div>
    </main>
  );
}

export default function PedidoConfirmadoPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[60vh] flex-1 items-center justify-center pt-[110px]">
          <p className="text-ink-soft">Cargando…</p>
        </main>
      }
    >
      <Resultado />
    </Suspense>
  );
}
