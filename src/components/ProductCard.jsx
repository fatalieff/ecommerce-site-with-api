import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image">
        <img src={product.image} alt={product.title} />
        <span className="product-category">{product.category}</span>
      </Link>
      <button
        type="button"
        className={`wishlist-btn ${isWishlisted ? "wishlist-btn--active" : ""}`}
        onClick={() => onToggleWishlist(product)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      <div className="product-body">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>
        {product.rating && (
          <StarRating rate={product.rating.rate} count={product.rating.count} size={14} />
        )}
        <p className="product-desc">{product.description.slice(0, 90)}...</p>
      </div>
      <div className="product-footer">
        <span className="product-price">${product.price.toFixed(2)}</span>
        <button className="add-to-cart-btn" type="button" onClick={() => onAddToCart(product)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add to Basket
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
