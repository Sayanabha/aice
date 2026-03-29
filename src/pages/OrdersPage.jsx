export default function OrdersPage({ orders }) {
  if (orders.length === 0) return (
    <div>
      <div className="page-title">Your Orders</div>
      <div className="empty-state">
        <span className="empty-emoji">📋</span>
        <h3>No orders yet</h3>
        <p>Your order history will appear here</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-title">Your Orders</div>
      <div className="page-sub">
        {orders.length} order{orders.length !== 1 ? "s" : ""} placed
      </div>

      <div style={{ padding: "0 20px" }}>
        {[...orders].reverse().map((order, i) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <span className="order-id-small">{order.id}</span>
              <span className={`order-status ${i === 0 ? "status-preparing" : "status-delivered"}`}>
                {i === 0 ? "Preparing 🍦" : "Delivered ✓"}
              </span>
            </div>

            <div className="order-items">
              {order.items.map(item => (
                <span key={item.id} className="order-item-pill">
                  {item.emoji} {item.name} ×{item.qty}
                </span>
              ))}
            </div>

            <div className="order-card-footer">
              <span className="order-date">{order.date}</span>
              <span className="order-total">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}