function StarRating({ rate = 0, count, size = 16 }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.round(rate);
    return (
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  });

  return (
    <div className="star-rating">
      <span className="star-rating-stars">{stars}</span>
      {count !== undefined && (
        <span className="star-rating-count">({count})</span>
      )}
    </div>
  );
}

export default StarRating;
