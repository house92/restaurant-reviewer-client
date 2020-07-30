import React from 'react';

import RestaurantTile, { TILE_WIDTH, BORDER_WIDTH } from '../RestaurantTile';
import { NAV_HORIZONTAL_PADDING } from '../Nav';
import { ROUTES } from '../../constants';

const TILE_MARGIN = 10;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  ratingFilterContainer: {
    width: `calc(100vw - ${NAV_HORIZONTAL_PADDING * 2}px)`,
    padding: `12px ${NAV_HORIZONTAL_PADDING}px 6px`,
  },
  ratingFilterLabel: {
    fontSize: 14,
  },
  ratingFilterInput: {
    marginLeft: 6,
    padding: 2,
    outline: 'none',
    borderRadius: 5,
    fontSize: 14,
    textAlign: 'center',
  },
};

export default function RestaurantGrid({
  restaurants,
  ratingFilter = 0,
  onRatingFilterChange,
  isOwner,
  style = {},
}) {
  const restaurantTiles = [];

  if (isOwner) {
    const linkObject = {
      to: ROUTES.restaurantNew,
      image: '/add-icon.png',
      text: 'Add restaurant',
    };

    restaurantTiles.push(<RestaurantTile
      linkObject={linkObject}
      style={{ margin: TILE_MARGIN }}
      key={`restaurantTile-new`}
    />);
  }

  restaurants.sort((a, b) => {
    if (!isOwner) {
      return 0;
    }
    if (a.hasUnseenReviews) {
      return -1;
    }
    if (b.hasUnseenReviews) {
      return 1;
    }
    return 0;
  })
    .forEach((restaurant, i) => {
    restaurantTiles.push(<RestaurantTile
      restaurant={restaurant}
      style={{ margin: TILE_MARGIN }}
      key={`restaurantTile-${i}`}
    />);
  });

  const totalTileWidth = TILE_WIDTH + (BORDER_WIDTH * 2) + (TILE_MARGIN * 2);
  const tilesPerRow = Math.floor(window.innerWidth / totalTileWidth);
  const dummyTileCount = tilesPerRow - (restaurantTiles.length % tilesPerRow);

  for (let i = 0; i < dummyTileCount; i++) {
    restaurantTiles.push(<RestaurantTile style={{ margin: TILE_MARGIN, opacity: 0 }} key={`dummyTile-${i}`} />);
  }

  return (
    <div>
      <div style={styles.ratingFilterContainer}>
        <label style={styles.ratingFilterLabel}>Min star rating: </label>
        <input
          type="number"
          min={0}
          max={5}
          step={1}
          value={ratingFilter}
          onChange={onRatingFilterChange}
          style={styles.ratingFilterInput}
        />
      </div>
      <div className="restaurant-grid" style={{ ...styles.container, ...style }}>
        {restaurantTiles}
      </div>
    </div>
  );
}