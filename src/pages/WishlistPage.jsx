import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { useApp } from "../context/AppContext";

function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist, isInWishlist } = useApp();

  return (
    <Layout showSearch={false}>
      <div className="page-header">
        <h2>My Wishlist</h2>
        <span className="page-header-sub">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite products for later.</p>
          <Link to="/" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isWishlisted={isInWishlist(product.id)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}

export default WishlistPage;
