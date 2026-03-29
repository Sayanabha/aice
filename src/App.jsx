import { useState, useEffect } from "react";
import "./styles/global.css";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Toast from "./components/Toast";

import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import MoodPage from "./pages/MoodPage";
import CartSheet from "./pages/CartSheet";
import CheckoutSheet from "./pages/CheckoutSheet";
import OrdersPage from "./pages/OrdersPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode to <body>
  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addToCart = (flavor) => {
    setCart(c => {
      const existing = c.find(i => i.id === flavor.id);
      if (existing)
        return c.map(i =>
          i.id === flavor.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...c, { ...flavor, qty: 1 }];
    });
    setToast(`${flavor.name} added!`);
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) setCart(c => c.filter(i => i.id !== id));
    else setCart(c => c.map(i => i.id === id ? { ...i, qty } : i));
  };

  const handleCheckout = (total) => {
    setCartOpen(false);
    setCheckoutTotal(total);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderId) => {
    const order = {
      id: orderId,
      items: [...cart],
      total: checkoutTotal,
      date: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setOrders(o => [...o, order]);
    setCart([]);
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="app">
      <Header
        onCartClick={() => setCartOpen(true)}
        cartCount={totalItems}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
      />

      {page === "home"   && <HomePage  onNav={setPage} addToCart={addToCart} />}
      {page === "menu"   && <MenuPage  addToCart={addToCart} />}
      {page === "mood"   && <MoodPage  addToCart={addToCart} />}
      {page === "orders" && <OrdersPage orders={orders} />}

      <BottomNav page={page} onNav={setPage} />

      {cartOpen && (
        <CartSheet
          cart={cart}
          onClose={() => setCartOpen(false)}
          onQtyChange={updateQty}
          onCheckout={handleCheckout}
        />
      )}

      {checkoutOpen && (
        <CheckoutSheet
          total={checkoutTotal}
          onClose={() => {
            setCheckoutOpen(false);
            setPage("orders");
          }}
          onSuccess={handleOrderSuccess}
        />
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}