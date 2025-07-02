import { useEffect, useState } from "react";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import { CartProvider, useCart } from "./CartContext";
import { ShoppingCart } from "lucide-react";

function AppInner() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
   fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, []);

  if (error)
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  if (products === null)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );

  return (
    <>
      {/* Cart Icon */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center gap-1"
      >
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <span className="bg-white text-blue-600 text-xs font-bold rounded-full px-2">
            {totalItems}
          </span>
        )}
      </button>

      {/* Main page */}
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <ProductGrid items={products} />
      </main>

      {/* Cart Drawer */}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
