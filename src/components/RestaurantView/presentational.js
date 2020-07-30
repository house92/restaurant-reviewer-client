import React from 'react';

import StarRating from '../atoms/StarRating';
import { ROUTES } from '../../constants';
import Review from '../Review';
import ReviewForm from '../ReviewForm';
import EditButton from '../atoms/EditButton';
import { NAV_HEIGHT } from '../Nav';

const BORDER_WIDTH = 1;

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
  },
  textContainer: {
    padding: '20px 0',
    width: '80vw',
  },
  titleLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 30,
  },
  description: {
    margin: '12px 0',
  },
  reviewsContainer: {
    padding: 12,
  },
  editButton: {
    position: 'absolute',
    top: NAV_HEIGHT + 20,
    right: 20,
  },
};

function sortByVisitDate(a, b) {
  if (a.visitDate > b.visitDate) {
    return -1;
  }
  if (a.visitDate < b.visitDate) {
    return 1;
  }
  return 0;
}

export default function RestaurantView({
  restaurant,
  onReviewSubmitSuccess,
  isOwner,
  shouldRenderEditButton,
  shouldRenderReviewForm,
  style = {},
}) {
  let reviews = JSON.parse(JSON.stringify(restaurant.reviews));

  if (reviews.length > 2) {
    const bestRating = Math.max(...reviews.map((review) => review.rating));
    const worstRating = Math.min(...reviews.map((review) => review.rating));

    const bestReview = reviews.filter(review => review.rating === bestRating)
      .sort(sortByVisitDate)[0];

    const worstReview = reviews.filter(review => review.rating === worstRating)
      .sort(sortByVisitDate)[0];

    const indexOfBestReview = reviews.indexOf(bestReview);
    reviews = reviews.slice(0, indexOfBestReview)
      .concat(reviews.slice(indexOfBestReview + 1));

    const indexOfWorstReview = reviews.indexOf(worstReview);
    reviews = reviews.slice(0, indexOfWorstReview)
      .concat(reviews.slice(indexOfWorstReview + 1));

    reviews = [{ ...bestReview, isBest: true }, { ...worstReview, isWorst: true }, ...reviews];
  }

  const reviewsJSX = reviews.map((review) => <Review
    review={review}
    isOwner={isOwner}
    key={`review-${review.id}`}
  />);

  return (
    <div className="restaurant-view" style={{ ...styles.container, ...style }}>
      {
        shouldRenderEditButton ?
          <EditButton linkTo={`${ROUTES.restaurants}/${restaurant.id}/edit`} style={styles.editButton} /> :
          null
      }
      <img
        src={`https://images.weserv.nl/?url=${restaurant.image}&fit=cover&a=smart&h=400&w=${window.innerWidth}`}
        alt="Restaurant"
      />
      <div style={styles.textContainer}>
        <div style={styles.titleLine}>
          <h1>{restaurant.name}</h1>
          <StarRating rating={restaurant.averageRating} size={30} data-testid="rating" />
        </div>
        <div style={styles.address}>{restaurant.address}</div>
        <div style={styles.description}>{restaurant.description}</div>
        <div style={styles.reviewsContainer}>
          {reviewsJSX}
        </div>
        {
          shouldRenderReviewForm ?
            <ReviewForm
              restaurantId={restaurant.id}
              onSuccess={onReviewSubmitSuccess} 
            /> :
            null
        }
      </div>
    </div>
  );
}