import { useCart } from "@components/CartContext";

export default function CartPage() {
  const { items, total, removeItem, clearCart } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Carrito</h1>

      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {items.map(item => (
              <li
                key={item.productId}
                className="flex items-center justify-between border border-slate-700 rounded p-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
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

          <p className="text-xl font-bold mb-2">Total: ${total.toFixed(2)}</p>

          <div className="flex gap-2">
            <button
              onClick={clearCart}
              className="border border-slate-700 px-3 py-1 rounded"
            >
              Vaciar carrito
            </button>

            {/* Aquí podría ir el botón de PayPal */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
              Pagar (PayPal demo)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
