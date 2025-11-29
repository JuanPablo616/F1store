import { useCart } from "@components/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function CartPage() {
  const { items, total, removeItem, clearCart } = useCart();
  const [paid, setPaid] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Carrito</h1>

      {items.length === 0 ? (
        <p className="text-slate-300">Tu carrito está vacío.</p>
      ) : (
        <>
          {/* LISTA DE ITEMS */}
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between border border-slate-700 rounded-lg p-3 bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-slate-400">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          {/* TOTAL */}
          <p className="text-2xl font-bold mb-4">Total: ${total.toFixed(2)}</p>

          {/* BOTÓN DE VACIAR */}
          <button
            onClick={clearCart}
            className="border border-slate-700 w-full py-2 rounded mb-6 hover:bg-slate-800"
          >
            Vaciar carrito
          </button>

          {/* BOTÓN PAYPAL */}
          <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg">
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "paypal",
              }}
              createOrder={(data, actions) => {
                return actions.order.create({
                   intent: "CAPTURE",
                   purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: total.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                await actions.order?.capture();
                setPaid(true);
                clearCart();
              }}
            />
          </div>

          {paid && (
            <p className="text-green-400 text-lg font-bold mt-4">
              ✔ Pago completado. ¡Gracias por tu compra!
            </p>
          )}
        </>
      )}
    </div>
  );
}
