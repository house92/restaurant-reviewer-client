import React, { useState } from 'react';
import { connect } from 'react-redux';

import StarRating from '../atoms/StarRating';
import { Link } from 'react-router-dom';

export const TILE_WIDTH = 200;
export const BORDER_WIDTH = 1;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: `#e7e7e7 solid ${BORDER_WIDTH}px`,
    backgroundColor: '#fff',
    borderRadius: '5px',
    width: TILE_WIDTH,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: TILE_WIDTH,
    height: TILE_WIDTH,
    objectFit: 'cover',
    background: '#fff',
  },
  details: {
    width: TILE_WIDTH,
  },
  name: {
    margin: 5,
  },
  rating: {
    margin: 5,
  },
  linkImageContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  linkImage: {
    width: '100%',
  },
  linkText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: TILE_WIDTH,
    height: 50,
    textTransform: 'uppercase',
  },
};

function RestaurantTile({ user, restaurant, linkObject, style = {} }) {
  const [isHover, setIsHover] = useState(false);

  const isOwner = user && restaurant && user.ownerId === restaurant.ownerId;

  if (isHover) {
    style.backgroundColor = '#f90909';
    style.color = '#fff';
    style.fontWeight = 500;
  } else {
    delete style.backgroundColor;
    delete style.color;
    delete style.fontWeight;
  }

  if (isOwner && restaurant.hasUnseenReviews) {
    style.backgroundColor = '#ff8a16'; 
  }

  return (
    <div className="restaurant-tile" style={{ ...styles.container, ...style }}>
      {
        restaurant ?
          <Link to={`/restaurants/${restaurant.id}`} style={styles.link} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
            <img
              src={restaurant.image}
              style={styles.image}
              alt="Restaurant"
            />
            <div style={styles.details}>
              <div style={styles.name}>{restaurant.name}</div>
              <StarRating rating={restaurant.averageRating} style={styles.rating} data-testid="rating" />
            </div>
          </Link> :
          null
      }
      {
        linkObject ?
          <Link to={linkObject.to} style={styles.link} onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)}>
            <div style={styles.linkImageContainer}>
              <img
                src={linkObject.image}
                style={styles.linkImage}
                alt={linkObject.alt}
              />
            </div>
            <div style={styles.linkText}>{linkObject.text}</div>
          </Link> :
          null
      }
    </div>
  );
}

export default connect((state) => ({ user: state.user.user }), null)(RestaurantTile);
