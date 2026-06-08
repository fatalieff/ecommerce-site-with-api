import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img className="brand-logo" src="/logo.svg" alt="" />
          <h3>Ecommerce Site</h3>
          <p>Premium products, exceptional service. Your trusted destination for quality.</p>
        </div>
        <div className="footer-links">
          <h4>Shop</h4>
          <Link to="/">All Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Basket</Link>
        </div>
        <div className="footer-links">
          <h4>Account</h4>
          <Link to="/login">Sign In</Link>
          <Link to="/login">Register</Link>
        </div>
        <div className="footer-links">
          <h4>Contact</h4>
          <span>hello@ecommerce.com</span>
          <span>+994 12 345 67 89</span>
          <span>Baku, Azerbaijan</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Ecommerce Site. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
