export default function ItemDetailSheet({ item, onClose, onAddToCart }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-sheet"
        style={{ padding: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>✕</button>

        <div
          className="item-detail-hero"
          style={{
            background: `linear-gradient(135deg, ${item.color}33, ${item.color}88)`,
          }}
        >
          <span style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.2))" }}>
            {item.emoji}
          </span>
        </div>

        <div className="item-detail-body">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="item-detail-name">{item.name}</div>
              <div className="item-detail-cat">{item.category}</div>
            </div>
            <div className="rating">
              <span className="star">★</span>{item.rating}
            </div>
          </div>

          <p className="item-detail-desc">{item.desc}</p>

          <div className="item-detail-meta">
            <div className="meta-chip">
              <div className="meta-value">${item.price}</div>
              <div className="meta-label">Price</div>
            </div>
            <div className="meta-chip">
              <div className="meta-value">{item.calories}</div>
              <div className="meta-label">Calories</div>
            </div>
            <div className="meta-chip">
              <div className="meta-value">🧡</div>
              <div className="meta-label">{item.tags[0]}</div>
            </div>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={() => { onAddToCart(item); onClose(); }}
          >
            Add to Cart · ${item.price}
          </button>
        </div>
      </div>
    </div>
  );
}