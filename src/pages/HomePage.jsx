import { useState } from "react";
import { FLAVORS } from "../data/flavors";
import ItemDetailSheet from "../components/ItemDetailSheet";

export default function HomePage({ onNav, addToCart }) {
  const [detail, setDetail] = useState(null);
  const featured = FLAVORS.filter(f => f.rating >= 4.8);

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-tag">🐧 Pengu's Picks Today</div>
        <h1>Scoop your <em>mood</em> into a cone.</h1>
        <p>AI-powered ice cream recommendations crafted by Pengu, our expert penguin.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => onNav("mood")}>Ask Pengu 🐧</button>
          <button className="btn-secondary" onClick={() => onNav("menu")}>Browse Menu</button>
        </div>
        <div className="hero-penguin">🐧</div>
      </div>

      {/* Fan Favourites */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Fan Favourites</div>
          <button className="see-all" onClick={() => onNav("menu")}>See all →</button>
        </div>
        <div className="featured-scroll">
          {featured.map(f => (
            <div
              key={f.id}
              className="featured-card"
              style={{ background: `linear-gradient(135deg, ${f.color}dd, ${f.color})` }}
              onClick={() => setDetail(f)}
            >
              <span className="card-emoji">{f.emoji}</span>
              <div className="card-name">{f.name}</div>
              <div className="card-price">${f.price}</div>
              <button
                className="card-add"
                onClick={e => { e.stopPropagation(); addToCart(f); }}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Teaser */}
      <div className="mood-teaser" onClick={() => onNav("mood")}>
        <span className="mood-teaser-emoji">🐧</span>
        <div className="mood-teaser-text">
          <h3>What's your vibe today?</h3>
          <p>Pengu will find your perfect scoop</p>
        </div>
        <span className="mood-teaser-arrow">→</span>
      </div>

      <div style={{ height: 24 }} />

      {detail && (
        <ItemDetailSheet
          item={detail}
          onClose={() => setDetail(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}