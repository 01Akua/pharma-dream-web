"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { createOrder, PAYMENT_METHODS, type PaymentMethod } from "@/lib/crm";
import { formatCOP } from "@/lib/data";

export type CheckoutItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
};

export default function CheckoutModal({
  items,
  onClose,
  onSuccess,
}: {
  items: CheckoutItem[];
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("contraentrega");
  const [done, setDone] = useState<string | null>(null);

  const total = items.reduce((s, it) => s + it.price * it.qty, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim() || items.length === 0) return;
    // NOTE: aquí es donde se conecta una pasarela real (Wompi, PayU, Mercado
    // Pago, ePayco...): antes de createOrder(), crear el intento de pago con
    // la pasarela elegida y esperar su confirmación/redirección.
    const orderCreated = createOrder({
      customer: { name: name.trim(), phone: phone.trim(), city: city.trim() },
      items,
      paymentMethod,
    });
    setDone(orderCreated.id);
    onSuccess?.();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-forest/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-md rounded-3xl bg-cream p-7 shadow-card"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-ink-soft hover:text-forest"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="py-6 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/25">
              <Check className="h-8 w-8 text-forest" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-semibold text-forest">
              ¡Pedido confirmado!
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Tu pedido <strong className="text-forest">{done}</strong> quedó
              registrado. Te contactaremos para coordinar el pago y envío.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-forest py-3 text-sm font-semibold text-cream hover:bg-gold hover:text-forest"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-display text-2xl font-semibold text-forest">
              Finalizar compra
            </h3>

            <div className="mt-3 flex max-h-40 flex-col gap-2 overflow-y-auto">
              {items.map((it) => (
                <div
                  key={it.productId}
                  className="flex items-center justify-between rounded-xl bg-white p-3 text-sm"
                >
                  <span className="text-ink">
                    {it.qty}× {it.name}
                  </span>
                  <span className="font-semibold text-forest">
                    {formatCOP(it.price * it.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between px-1 text-sm">
              <span className="text-ink-soft">Total</span>
              <span className="font-display text-lg font-semibold text-forest">
                {formatCOP(total)}
              </span>
            </div>

            <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                required
                className="input"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono / WhatsApp"
                required
                className="input"
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ciudad"
                required
                className="input"
              />

              <div>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Método de pago
                </span>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                        paymentMethod === m.id
                          ? "border-gold bg-gold/10 text-forest"
                          : "border-sand bg-white text-ink-soft hover:border-sage"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="h-3.5 w-3.5 accent-forest"
                      />
                      {m.label}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 rounded-full bg-gold py-3 text-sm font-semibold text-forest transition hover:bg-gold-soft"
              >
                Confirmar pedido · {formatCOP(total)}
              </button>
            </form>
            <p className="mt-3 text-center text-[0.7rem] text-ink-soft">
              Demo de registro de ventas. La integración con la pasarela de
              pago real se conecta en este paso.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
