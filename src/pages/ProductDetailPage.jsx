import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import StarRating from "../components/StarRating";
import { useApp } from "../context/AppContext";

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch {
        setProduct(null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Layout showSearch={false}>
        <div className="product-detail product-detail--loading">
          <div className="skeleton skeleton-detail-image" />
          <div className="product-detail-info">
            <div className="skeleton skeleton-text skeleton-text--short" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout showSearch={false}>
        <div className="empty-state">
          <p>Product not found.</p>
          <Link to="/" className="btn-primary">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const wishlisted = isInWishlist(product.id);

  return (
    <Layout showSearch={false}>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>
          {product.rating && (
            <StarRating
              rate={product.rating.rate}
              count={product.rating.count}
              size={18}
            />
          )}
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-desc">{product.description}</p>

          <div className="product-detail-actions">
            <button
              type="button"
              className="btn-primary btn-primary--large"
              onClick={() => addToCart(product)}
            >
              Add to Basket
            </button>
            <button
              type="button"
              className={`wishlist-btn wishlist-btn--large ${wishlisted ? "wishlist-btn--active" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlisted ? "In Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <Link to="/" className="btn-continue">← Back to Shop</Link>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetailPage;
