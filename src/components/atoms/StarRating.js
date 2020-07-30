import React, { useEffect, useState } from 'react';

const SIZE_TO_WIDTH_FACTOR = 5.15; // NOTE: this isn't exact, but will work for the current ranges

const baseStyles = {
  ratingBackground: {
    color: '#e7e7e7',
    fontWeight: 300,
  },
  rating: {
    position: 'relative',
    top: -18,
    marginBottom: -18,
    color: '#fecb00',
    overflow: 'hidden',
    fontWeight: 300,
  },
};

function generateStyles(rating, size) {
  const styles = JSON.parse(JSON.stringify(baseStyles));

  styles.rating.width = (size * SIZE_TO_WIDTH_FACTOR) * (rating / 5);
  styles.ratingBackground.fontSize = size;
  styles.rating.fontSize = size;
  styles.rating.top = - (size + Math.floor(size / 6));
  styles.rating.marginBottom = - (size + Math.floor(size / 6));

  return styles;
}

export default function StarRating({ rating = 0, size = 16, style, ...props }) {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles(generateStyles(rating, size));
  }, [rating, size]);

  return (
    <div data-rating={`${rating}`} style={{ ...styles.container, ...style }} {...props}>
      <div style={styles.ratingBackground}>★★★★★</div>
      <div style={styles.rating}>★★★★★</div>
    </div>
  );
}