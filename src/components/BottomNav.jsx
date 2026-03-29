const NAV = [
  { id: "home",   emoji: "🏠", label: "Home" },
  { id: "menu",   emoji: "🍨", label: "Menu" },
  { id: "mood",   emoji: "🐧", label: "Ask Pengu" },
  { id: "orders", emoji: "📋", label: "Orders" },
];

export default function BottomNav({ page, onNav }) {
  return (
    <div className="bottom-nav">
      {NAV.map(n => (
        <button
          key={n.id}
          className={`nav-item ${page === n.id ? "active" : ""}`}
          onClick={() => onNav(n.id)}
        >
          <span className="nav-emoji">{n.emoji}</span>
          {n.label}
        </button>
      ))}
    </div>
  );
}