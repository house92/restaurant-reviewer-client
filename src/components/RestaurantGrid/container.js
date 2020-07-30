import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import RestaurantGrid from './presentational';
import ApiService from '../../services/ApiService';

function RestaurantGridContainer({ user, style = {} }) {
  const [restaurants, setRestaurants] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const isOwner = user && user.isOwner;

  useEffect(() => {
    const requestData = { filters: { rating: ratingFilter } };
    if (isOwner) {
      requestData.ownerId = user.ownerId;
    }
    ApiService.getRestaurants(requestData).then(res => setRestaurants(res));
  }, [ratingFilter, user]);

  return <RestaurantGrid
    restaurants={restaurants}
    ratingFilter={ratingFilter}
    onRatingFilterChange={(event) => setRatingFilter(event.target.value)}
    isOwner={isOwner}
    style={style}
  />;
}

export default connect((state) => ({ user: state.user.user }), null)(RestaurantGridContainer);