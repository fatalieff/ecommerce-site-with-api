import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Navbar({ showSearch = true }) {
  const location = useLocation();
  const {
    searchTerm,
    setSearchTerm,
    cartCount,
    wishlist,
    user,
    theme,
    toggleTheme,
    logout,
  } = useApp();

  const isActive = (path) => location.pathname === path;
  const showSearchBar = showSearch && location.pathname === "/";

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <img className="brand-logo" src="/logo.svg" alt="Ecommerce Site logo" />
          <div className="brand-text">
            <h1>Ecommerce Site</h1>
            <span className="brand-tagline">Premium Collection</span>
          </div>
        </Link>
      </div>

      {showSearchBar && (
        <div className="navbar-center">
          <div className="search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="navbar-right">
        <button type="button" className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <Link to="/wishlist" className={`icon-btn ${isActive("/wishlist") ? "icon-btn--active" : ""}`} aria-label="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlist.length > 0 && <span className="cart-badge">{wishlist.length}</span>}
        </Link>

        {user ? (
          <>
            <span className="user-greeting">Hi, {user.username}</span>
            <button type="button" className="icon-btn" onClick={logout} aria-label="Logout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </>
        ) : (
          <Link to="/login" className={`icon-btn ${isActive("/login") ? "icon-btn--active" : ""}`} aria-label="Login">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        )}

        <Link to="/cart" className={`cart-btn ${isActive("/cart") ? "cart-btn--active" : ""}`} aria-label="Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6h15l-1.5 9H7.5L6 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
