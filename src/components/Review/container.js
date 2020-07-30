import React, { useState } from 'react';
import { connect } from 'react-redux';

import Review from './presentational';
import ApiService from '../../services/ApiService';

function ReviewContainer({
  review: suppliedReview,
  isOwner,
  user,
}) {
  const [review, setReview] = useState(suppliedReview || {});
  const [reply, setReply] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const canEdit = review &&
    user && (
      user.isAdmin ||
      user.id === review.userId
    );

  if (review) {
    return <Review
      review={review}
      reply={reply}
      onReplyChange={(event) => setReply(event.target.value)}
      onReplySubmit={() => {
        ApiService.postReviewReply({
          reviewId: review.id,
          ownerId: user && user.ownerId,
          body: reply,
        }).then(res => {
          setReview(existingReview => ({
            ...existingReview,
            reply: res.body,
          }));
        });
      }}
      isOwner={isOwner}
      isAdmin={user && user.isAdmin}
      canEdit={canEdit}
      isEditing={isEditing}
      onDeleteButtonClick={() => {
        ApiService.deleteReview({ id: review.id }).then(() => {
          setReview(null);
          setIsEditing(false);
        });
      }}
      onEditButtonClick={() => setIsEditing(!isEditing)}
      onReviewEditSuccess={(updatedReview) => {
        setReview({
          ...review,
          ...updatedReview,
        });
        setIsEditing(false);
      }}
    />;
  } 

  return null;
}

export default connect((state) => ({ user: state.user.user }), null)(ReviewContainer);
