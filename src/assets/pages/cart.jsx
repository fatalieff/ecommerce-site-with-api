import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useApp } from "../../context/AppContext";

function CartPage() {
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart } = useApp();

  if (cart.length === 0) {
    return (
      <Layout showSearch={false}>
        <div className="cart-empty">
          <div className="cart-empty-icon" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M6 6h15l-1.5 9H7.5L6 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9.5" cy="19" r="1" fill="currentColor" />
              <circle cx="16.5" cy="19" r="1" fill="currentColor" />
            </svg>
          </div>
          <h2>Your basket is empty</h2>
          <p>Discover our curated collection and add your favorites.</p>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showSearch={false}>
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-header">
            <h2>Your Basket</h2>
            <span className="cart-count-label">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>

          <ul className="cart-list">
            {cart.map((item) => (
              <li className="cart-item" key={item.id}>
                <Link to={`/product/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className="cart-item-details">
                  <span className="cart-item-category">{item.category}</span>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="cart-item-title">{item.title}</h3>
                  </Link>
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button type="button" className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button type="button" className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button type="button" className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="summary-free">Free</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-checkout">Proceed to Checkout</Link>
          <Link to="/" className="btn-continue">← Continue Shopping</Link>
        </aside>
      </div>
    </Layout>
  );
}

export default CartPage;
