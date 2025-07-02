import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../CartContext";

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, totalPrice } = useCart();

  return (
    <div
      className={`fixed inset-0 z-40 transition-all ${
        open ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
    >
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <header className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-center text-gray-500 mt-10">Cart is empty 🛒</p>
          )}

          {items.map((p) => (
            <div key={p.id} className="flex gap-3">
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-sm text-gray-500">
                  ₹{(p.price / 100).toFixed(2)} each
                </p>

                {/* qty buttons */}
                <div className="mt-1 flex items-center gap-2">
                  <button
                    onClick={() => updateQty(p.id, Math.max(1, p.qty - 1))}
                    className="p-1 border rounded disabled:opacity-40"
                    disabled={p.qty === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{p.qty}</span>
                  <button
                    onClick={() => updateQty(p.id, p.qty + 1)}
                    className="p-1 border rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => updateQty(p.id, 0)}
                    className="ml-4 text-xs text-red-600"
                  >
                    remove
                  </button>
                </div>
              </div>

              <div className="font-semibold">
                ₹{((p.qty * p.price) / 100).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        <footer className="border-t p-4">
          <p className="font-semibold flex justify-between">
            <span>Total</span>
            <span>₹{(totalPrice / 100).toFixed(2)}</span>
          </p>
          <button
            disabled={items.length === 0}
            onClick={() => alert("Checkout flow here")}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50"
          >
            Checkout
          </button>
        </footer>
      </aside>
    </div>
  );
}
