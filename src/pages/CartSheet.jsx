export default function CartSheet({ cart, onClose, onQtyChange, onCheckout }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 1.99;
  const total = subtotal + delivery;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-title">Your Cart 🛒</div>

        {cart.length === 0 ? (
          <>
            <div className="empty-state">
              <span className="empty-emoji">🛒</span>
              <h3>Cart's empty!</h3>
              <p>Add some scoops to get started</p>
            </div>
            <button className="checkout-btn" onClick={onClose}>
              Browse Menu →
            </button>
          </>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-emoji">{item.emoji}</span>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => onQtyChange(item.id, item.qty - 1)}
                  >
                    −
                  </button>
                  <span className="qty-num">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => onQtyChange(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <div className="cart-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-row">
                <span>Delivery</span>
                <span>${delivery.toFixed(2)}</span>
              </div>
              <div className="cart-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={() => onCheckout(total)}>
              Proceed to Checkout →
            </button>
          </>
        )}
      </div>
    </div>
  );
}