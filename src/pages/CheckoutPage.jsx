import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useApp } from "../context/AppContext";

function CheckoutPage() {
  const { cart, cartTotal, cartCount, placeOrder } = useApp();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
  });

  if (cart.length === 0 && !orderPlaced) {
    return (
      <Layout showSearch={false}>
        <div className="cart-empty">
          <h2>Nothing to checkout</h2>
          <p>Add items to your basket first.</p>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  if (orderPlaced) {
    return (
      <Layout showSearch={false}>
        <div className="order-success">
          <div className="order-success-icon" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Order Placed Successfully!</h2>
          <p>Order #{orderPlaced.id} — Total: ${orderPlaced.total.toFixed(2)}</p>
          <p className="order-success-detail">
            Thank you, {orderPlaced.fullName}. We'll send a confirmation to {orderPlaced.email}.
          </p>
          <Link to="/" className="btn-primary">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = placeOrder(form);
    setOrderPlaced(order);
  };

  return (
    <Layout showSearch={false}>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p className="checkout-subtitle">Enter your delivery details</p>

          <label>
            Full Name
            <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="John Doe" />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@email.com" />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+994 12 345 67 89" />
          </label>
          <label>
            Address
            <input name="address" value={form.address} onChange={handleChange} required placeholder="Street, building, apt" />
          </label>
          <label>
            City
            <input name="city" value={form.city} onChange={handleChange} required placeholder="Baku" />
          </label>

          <button type="submit" className="btn-checkout">Place Order — ${cartTotal.toFixed(2)}</button>
          <button type="button" className="btn-continue" onClick={() => navigate("/cart")}>
            ← Back to Basket
          </button>
        </form>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <p className="checkout-items-count">{cartCount} items</p>
          {cart.map((item) => (
            <div key={item.id} className="checkout-item-row">
              <span>{item.title.slice(0, 30)}... × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export default CheckoutPage;
