"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import {
  useCart,
  useCartDrawerOpen,
  useCartTotal,
  closeCartDrawer,
  updateCartQty,
  removeFromCart,
  clearCart,
} from "@/lib/cart";
import { formatCOP } from "@/lib/data";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const open = useCartDrawerOpen();
  const items = useCart();
  const total = useCartTotal();
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[80]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
              onClick={closeCartDrawer}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-card"
            >
              <div className="flex items-center justify-between border-b border-sand px-6 py-5">
                <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-forest">
                  <ShoppingBag className="h-5 w-5" />
                  Tu carrito
                </h2>
                <button
                  onClick={closeCartDrawer}
                  aria-label="Cerrar carrito"
                  className="text-ink-soft hover:text-forest"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-ink-soft">
                    <ShoppingBag className="h-10 w-10 text-sand" />
                    <p className="mt-3 text-sm">Tu carrito está vacío.</p>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {items.map((it) => (
                      <li
                        key={it.productId}
                        className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream-deep">
                          {it.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={it.image}
                              alt={it.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-forest">
                            {it.name}
                          </p>
                          <p className="text-sm text-ink-soft">
                            {formatCOP(it.price)}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <div className="flex items-center rounded-full border border-sand bg-white">
                              <button
                                onClick={() =>
                                  updateCartQty(it.productId, it.qty - 1)
                                }
                                className="flex h-7 w-7 items-center justify-center text-forest hover:text-gold"
                                aria-label="Disminuir"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold text-forest">
                                {it.qty}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartQty(it.productId, it.qty + 1)
                                }
                                className="flex h-7 w-7 items-center justify-center text-forest hover:text-gold"
                                aria-label="Aumentar"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(it.productId)}
                              aria-label={`Quitar ${it.name}`}
                              className="text-ink-soft hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-forest">
                          {formatCOP(it.price * it.qty)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-sand px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink-soft">Total</span>
                    <span className="font-display text-xl font-semibold text-forest">
                      {formatCOP(total)}
                    </span>
                  </div>
                  <button
                    onClick={() => setCheckout(true)}
                    className="mt-4 w-full rounded-full bg-gold py-3.5 text-sm font-semibold text-forest transition hover:bg-gold-soft"
                  >
                    Proceder al pago
                  </button>
                  <button
                    onClick={clearCart}
                    className="mt-2 w-full text-center text-xs text-ink-soft hover:text-forest"
                  >
                    Vaciar carrito
                  </button>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {checkout && (
        <CheckoutModal
          items={items.map((it) => ({
            productId: it.productId,
            name: it.name,
            price: it.price,
            qty: it.qty,
          }))}
          onClose={() => setCheckout(false)}
          onSuccess={() => {
            clearCart();
            closeCartDrawer();
          }}
        />
      )}
    </>
  );
}
