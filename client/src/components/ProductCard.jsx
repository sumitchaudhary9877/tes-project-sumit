import { useState } from "react";
import { useCart } from "../CartContext";
import { Minus, Plus } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  function handleAdd() {
    addToCart(product, qty);
    onAdd();            // 👈 open drawer right after adding
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-md flex flex-col">
      <img src={product.image} alt={product.name} className="object-cover aspect-video" />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-medium text-lg">{product.name}</h2>
        <p className="text-gray-600 font-semibold mt-1 mb-3">
          ₹{(product.price / 100).toFixed(2)}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <button onClick={dec} className="p-1.5 border rounded disabled:opacity-40" disabled={qty === 1}>
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{qty}</span>
          <button onClick={inc} className="p-1.5 border rounded">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white rounded py-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
