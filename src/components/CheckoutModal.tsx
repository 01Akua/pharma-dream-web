"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { createOrder } from "@/lib/crm";
import { formatCOP, type Product } from "@/lib/data";

export default function CheckoutModal({
  product,
  qty,
  onClose,
}: {
  product: Product;
  qty: number;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [done, setDone] = useState<string | null>(null);

  const total = product.price * qty;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim()) return;
    const orderCreated = createOrder({
      customer: { name: name.trim(), phone: phone.trim(), city: city.trim() },
      items: [
        { productId: product.id, name: product.name, price: product.price, qty },
      ],
    });
    setDone(orderCreated.id);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
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
            <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3 text-sm">
              <span className="text-ink">
                {qty}× {product.name}
              </span>
              <span className="font-semibold text-forest">
                {formatCOP(total)}
              </span>
            </div>

            <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
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
              <button
                type="submit"
                className="mt-1 rounded-full bg-gold py-3 text-sm font-semibold text-forest transition hover:bg-gold-soft"
              >
                Confirmar pedido · {formatCOP(total)}
              </button>
            </form>
            <p className="mt-3 text-center text-[0.7rem] text-ink-soft">
              Pago contra entrega o transferencia. Demo de registro de ventas.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
