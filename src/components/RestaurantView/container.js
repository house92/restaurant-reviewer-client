import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import RestaurantView from './presentational';
import ApiService from '../../services/ApiService';
import { useParams } from 'react-router-dom';

function sortByVisitDate(a, b) {
  if (a.visitDate > b.visitDate) {
    return -1;
  }
  if (a.visitDate < b.visitDate) {
    return 1;
  }
  return 0;
}

function RestaurantViewContainer({ user, style = {} }) {
  const [restaurant, setRestaurant] = useState();

  const { id } = useParams();

  const isOwner = restaurant && user && restaurant.ownerId === user.ownerId;
  const isAdmin = user && user.isAdmin;

  const shouldRenderEditButton = isAdmin || isOwner;

  const shouldRenderReviewForm = user &&
    restaurant &&
    !isOwner &&
    !restaurant.reviews.some(review => review.userId === user.id);

  useEffect(() => {
    ApiService.getRestaurantById(id).then(res => setRestaurant(res));
  }, [id]);

  if (restaurant) {
    return <RestaurantView
      restaurant={restaurant}
      onReviewSubmitSuccess={(newReview) => {
        setRestaurant({
          ...restaurant,
          reviews: restaurant.reviews.concat({
            ...newReview,
            userName: user.name,
          }).sort(sortByVisitDate),
        });
      }}
      isOwner={isOwner}
      shouldRenderEditButton={shouldRenderEditButton}
      shouldRenderReviewForm={shouldRenderReviewForm}
      style={style}
    />;
  } else {
    return null;
  }
}

export default connect((state) => ({ user: state.user.user }), null)(RestaurantViewContainer);