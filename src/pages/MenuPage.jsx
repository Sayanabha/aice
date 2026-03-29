import { useState } from "react";
import { FLAVORS, CATEGORIES, TAGS } from "../data/flavors";
import ItemDetailSheet from "../components/ItemDetailSheet";

export default function MenuPage({ addToCart }) {
  const [cat, setCat] = useState("All");
  const [tag, setTag] = useState("All");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);

  const filtered = FLAVORS.filter(f => {
    const catOk = cat === "All" || f.category === cat;
    const tagOk = tag === "All" || f.tags.includes(tag);
    const searchOk = !search || f.name.toLowerCase().includes(search.toLowerCase());
    return catOk && tagOk && searchOk;
  });

  return (
    <div>
      <div className="page-title">Our Menu</div>
      <div className="page-sub">{FLAVORS.length} dreamy flavours</div>

      {/* Search */}
      <div style={{ padding: "0 20px 8px" }}>
        <input
          className="form-input"
          placeholder="🔍 Search flavours..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 12 }}
        />
      </div>

      {/* Filters */}
      <div style={{ padding: "0 20px" }}>
        <div className="filter-row">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`filter-chip ${cat === c ? "active" : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="filter-row">
          {TAGS.map(t => (
            <button
              key={t}
              className={`filter-chip ${tag === t ? "active" : ""}`}
              onClick={() => setTag(t)}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: "0 20px" }}>
        <div className="menu-grid">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-emoji">🔍</span>
              <h3>No flavours found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            filtered.map(f => (
              <div key={f.id} className="menu-card" onClick={() => setDetail(f)}>
                <div
                  className="menu-card-emoji-wrap"
                  style={{ background: `${f.color}22` }}
                >
                  {f.emoji}
                </div>
                <div className="menu-card-info">
                  <div className="menu-card-name">{f.name}</div>
                  <div className="menu-card-cat">
                    {f.category} · <span className="rating" style={{ display: "inline-flex" }}>
                      <span className="star">★</span>{f.rating}
                    </span>
                  </div>
                  <div className="menu-card-tags">
                    {f.tags.slice(0, 2).map(t => (
                      <span key={t} className="tag-pill">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="menu-card-right">
                  <div className="menu-card-price">${f.price}</div>
                  <button
                    className="add-btn"
                    onClick={e => { e.stopPropagation(); addToCart(f); }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div style={{ height: 12 }} />
      </div>

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