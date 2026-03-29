import { useState, useRef, useEffect } from "react";
import { FLAVORS, MOOD_TILES } from "../data/flavors";
import { askGroq } from "../api/ai";

export default function MoodPage({ addToCart }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Waddle waddle! 🐧 I'm Pengu, your personal ice cream penguin. Pick your mood below, then tell me more — I'll find your perfect scoop!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recos, setRecos] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() && !selectedMood) return;

    const userMsg = input.trim() || `I'm feeling ${selectedMood}`;
    setMessages(m => [...m, { type: "user", text: userMsg }]);
    setInput("");
    setLoading(true);
    setRecos([]);

    try {
      const result = await askGroq(selectedMood, userMsg, FLAVORS);
      const aiRecos = (result.recommendations || [])
        .map(r => {
          const flavor = FLAVORS.find(f => f.id === r.id);
          return flavor ? { ...flavor, reason: r.reason } : null;
        })
        .filter(Boolean);

      setMessages(m => [
        ...m,
        {
          type: "ai",
          text: result.message || "Here are my top picks for you! 🍦",
        },
      ]);
      setRecos(aiRecos);
    } catch (e) {
      console.error(e);
      setMessages(m => [
        ...m,
        {
          type: "ai",
          text: "Brrrr! My ice-cold brain froze for a second 🧊 — try again?",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="mood-header">
        <span className="penguin-big">🐧</span>
        <h2>Tell Pengu your mood</h2>
        <p>Your personal ice cream sommelier</p>
      </div>

      <div className="mood-tiles">
        {MOOD_TILES.map(m => (
          <button
            key={m.id}
            className={`mood-tile ${selectedMood === m.label ? "selected" : ""}`}
            onClick={() =>
              setSelectedMood(selectedMood === m.label ? null : m.label)
            }
          >
            <span className="tile-emoji">{m.emoji}</span>
            <span className="tile-label">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="chat-section">
        <div className="chat-box" ref={chatRef}>
          {messages.map((m, i) =>
            m.type === "ai" ? (
              <div key={i} className="ai-message">
                <div className="ai-avatar">🐧</div>
                <div className="ai-bubble">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="user-message">
                <div className="user-bubble">{m.text}</div>
              </div>
            )
          )}

          {loading && (
            <div className="ai-message">
              <div className="ai-avatar">🐧</div>
              <div className="ai-bubble">
                <div className="typing-dots">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          )}
        </div>

        {recos.length > 0 && (
          <div>
            <div className="chat-label">Pengu's Picks for You ✨</div>
            <div className="reco-cards">
              {recos.map(r => (
                <div key={r.id} className="reco-card">
                  <span className="reco-emoji">{r.emoji}</span>
                  <div className="reco-info">
                    <div className="reco-name">{r.name}</div>
                    <div className="reco-reason">{r.reason}</div>
                  </div>
                  <button className="add-btn" onClick={() => addToCart(r)}>
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-row">
          <textarea
            className="chat-input"
            placeholder={
              selectedMood
                ? `Tell Pengu more about feeling ${selectedMood}...`
                : "Pick a mood above, or just type how you feel..."
            }
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={loading || (!input.trim() && !selectedMood)}
          >
            {loading ? "⏳" : "→"}
          </button>
        </div>
      </div>
    </div>
  );
}