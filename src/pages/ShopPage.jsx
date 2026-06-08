import { useState, useMemo } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { ProductSkeletonGrid } from "../components/ProductSkeleton";
import { useApp } from "../context/AppContext";
import { CATEGORIES, SORT_OPTIONS, PRODUCTS_PER_PAGE } from "../constants/categories";

function ShopPage() {
  const {
    products,
    loading,
    searchTerm,
    activeCategory,
    setActiveCategory,
    sortOrder,
    setSortOrder,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortOrder === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating") {
      result = [...result].sort(
        (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)
      );
    }

    return result;
  }, [products, searchTerm, activeCategory, sortOrder]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleCategoryChange = (value) => {
    setActiveCategory(value);
    setVisibleCount(PRODUCTS_PER_PAGE);
  };

  return (
    <Layout>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <span className="hero-badge">Exclusive Collection 2026</span>
        <h2>
          Curated for the
          <em> Discerning</em>
        </h2>
        <p>Handpicked products. Exceptional quality. Delivered with care.</p>
      </section>

      {!loading && (
        <>
          <div className="category-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`filter-btn ${activeCategory === cat.value ? "filter-btn--active" : ""}`}
                onClick={() => handleCategoryChange(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="toolbar">
            <span className="toolbar-count">
              {filteredProducts.length} products
            </span>
            <select
              className="sort-select"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setVisibleCount(PRODUCTS_PER_PAGE);
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {loading ? (
        <ProductSkeletonGrid count={8} />
      ) : (
        <>
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={isInWishlist(product.id)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="load-more-wrap">
              <button
                type="button"
                className="btn-load-more"
                onClick={() => setVisibleCount((c) => c + PRODUCTS_PER_PAGE)}
              >
                Load More
              </button>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <p className="empty-state">No products found.</p>
          )}
        </>
      )}
    </Layout>
  );
}

export default ShopPage;
