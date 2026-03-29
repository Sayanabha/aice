export default function Header({ onCartClick, cartCount, darkMode, onToggleDark }) {
  return (
    <div className="header">
      <div className="logo">A<span>i</span>ce</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={onToggleDark}
          style={{
            background: "none",
            border: "1.5px solid rgba(45,27,78,0.15)",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 18,
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </div>
  );
}