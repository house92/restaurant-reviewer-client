import React, { useState } from 'react';
import { connect } from 'react-redux';

import ReviewForm from './presentational';
import ApiService from '../../services/ApiService';

function ReviewFormContainer({
  review,
  restaurantId,
  onSuccess,
  user,
}) {
  const [rating, setRating] = useState(review ? review.rating : 3);
  const [comment, setComment] = useState(review && review.comment || '');
  const [visitDate, setVisitDate] = useState(review ? new Date(review.visitDate) : new Date());

  return <ReviewForm
    rating={rating}
    onRatingChange={(event) => setRating(event.target.value)}
    comment={comment}
    onCommentChange={(event) => setComment(event.target.value)}
    visitDate={visitDate}
    onVisitDateChange={(date) => setVisitDate(date)}
    onSubmit={() => {
      if (review && review.id) {
        ApiService.patchReview({
          id: review.id,
          restaurantId,
          userId: user.id,
          rating: rating,
          comment: comment,
          visitDate: visitDate,
        }).then((res) => onSuccess(res));
      } else {
        ApiService.postReview({
          restaurantId,
          userId: user.id,
          rating: rating,
          comment: comment,
          visitDate: visitDate,
        }).then((res) => onSuccess(res));
      }
    }}
  />
}

export default connect((state) => ({ user: state.user.user }), null)(ReviewFormContainer);
