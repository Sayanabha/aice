import { useState } from "react";

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function CheckoutSheet({ total, onClose, onSuccess }) {
  const [step, setStep] = useState("form"); // form | success
  const [orderId] = useState(
    "AICE-" + Math.random().toString(36).substr(2, 8).toUpperCase()
  );
  const [form, setForm] = useState({
    name: "", email: "", address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setError("");

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      setError("Please fill in all fields before paying.");
      return;
    }

    setLoading(true);

    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(total * 100), // Razorpay expects paise (INR cents)
      currency: "INR",
      name: "Aice 🍦",
      description: "Your ice cream order",
      image: "https://emojicdn.elk.sh/🍦",
      order_id: "", // In production, generate this from your backend
      prefill: {
        name: form.name,
        email: form.email,
      },
      notes: {
        address: form.address,
        order_ref: orderId,
      },
      theme: {
        color: "#FF6B9D",
      },
      handler: function (response) {
        // Payment successful
        console.log("Razorpay payment success:", response);
        setStep("success");
        onSuccess(orderId);
        setLoading(false);
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      setError(`Payment failed: ${response.error.description}`);
      setLoading(false);
    });

    rzp.open();
  };

  if (step === "success") return (
    <div className="modal-overlay">
      <div className="modal-sheet">
        <div className="sheet-handle" />
        <div className="success-screen">
          <div className="success-circle">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Your scoops are on their way 🐧🍦</p>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            Estimated delivery: 20–30 mins
          </p>
          <div className="order-id">{orderId}</div>
          <button
            className="checkout-btn"
            style={{ margin: 0, width: "100%" }}
            onClick={onClose}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title">Checkout</div>

        <div className="payment-form">
          <div className="chat-label" style={{ marginBottom: 12 }}>
            Delivery Details
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              placeholder="Alex Johnson"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              placeholder="alex@example.com"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Delivery Address</label>
            <input
              className="form-input"
              placeholder="123 MG Road, Kolkata"
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            />
          </div>

          {error && (
            <div style={{
              background: "#FEE2E2",
              color: "#DC2626",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 13,
              marginBottom: 16,
              fontWeight: 500,
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{
            background: "var(--cream)",
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 8,
            border: "1.5px solid rgba(45,27,78,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontWeight: 700 }}>Total Due</span>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 900,
            }}>
              ₹{total.toFixed(2)}
            </span>
          </div>

          <p style={{
            fontSize: 12,
            color: "var(--muted)",
            textAlign: "center",
            marginBottom: 16,
          }}>
            🔒 Test mode — use card 4111 1111 1111 1111
          </p>

          <button
            className="checkout-btn"
            style={{ margin: "0 0 12px", width: "100%" }}
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? "Opening Payment... ⏳" : `Pay ₹${total.toFixed(2)} with Razorpay`}
          </button>
        </div>
      </div>
    </div>
  );
}