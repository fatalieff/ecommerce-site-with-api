function ProductSkeleton() {
  return (
    <div className="product-card product-card--skeleton">
      <div className="skeleton skeleton-image" />
      <div className="product-body">
        <div className="skeleton skeleton-text skeleton-text--short" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" />
      </div>
      <div className="product-footer">
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <div className="products-grid">
      {Array.from({ length: count }, (_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export default ProductSkeleton;
