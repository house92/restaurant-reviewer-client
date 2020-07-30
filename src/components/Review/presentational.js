import React from 'react';
import moment from 'moment';
import StarRating from '../atoms/StarRating';
import Button from '../atoms/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import EditButton from '../atoms/EditButton';
import ReviewForm from '../ReviewForm';

const MARGIN = 20;

const styles = {
  reviewContainer: {
    width: '40vw',
    minWidth: 480,
    margin: `${MARGIN}px 0`,
  },
  reviewRow: {
    marginBottom: 5,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
  },
  reviewUserName: {
    fontWeight: 500,
    textDecoration: 'none',
    color: 'inherit',
  },
  replyContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 12,
  },
  replyLabel: {
    fontSize: 14,
    fontWeight: 500,
    marginRight: 8,
  },
  replyFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    maxWidth: 480,
  },
  replyTextarea: {
    width: 'calc(100% - 18px)',
    margin: '12px 0',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    resize: 'vertical',
    outline: 'none',
  },
  replyButton: {
    height: 40,
    width: 100,
    margin: '12px 20px',
    fontSize: 16,
    borderRadius: 5,
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    position: 'relative',
    top: MARGIN,
    width: 50,
    height: 50,
    fontSize: 14,
    marginBottom: -MARGIN,
    marginRight: 12,
  },
  deleteIcon: {
    width: '60%',
    opacity: 0.8,
  },
  editButton: {
    position: 'relative',
    top: MARGIN,
    width: 50,
    height: 50,
    fontSize: 14,
    marginBottom: -MARGIN,
  },
  bestReview: {
    marginLeft: 12,
    fontSize: 12,
    background: '#ffd701',
    padding: '4px 8px',
    borderRadius: 5,
  },
  worstReview: {
    marginLeft: 12,
    fontSize: 12,
    background: '#f90909',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: 5,
  },
};

export default function Review({
  review,
  reply,
  onReplyChange,
  onReplySubmit,
  isOwner,
  isAdmin,
  canEdit,
  onDeleteButtonClick,
  onEditButtonClick,
  isEditing,
  onReviewEditSuccess,
}) {
  const specificStyle = {};
  if (isOwner && !review.seen) {
    specificStyle.backgroundColor = '#ff8a16';
    specificStyle.padding = 12;
    specificStyle.borderRadius = 5;
  }

  return (
    <div style={{ ...styles.reviewContainer, ...specificStyle }}>
      {
        isEditing ?
          <div style={styles.buttonRow}>
            <EditButton
              onClick={onDeleteButtonClick}
              style={{ width: null }}
              buttonStyle={styles.deleteButton}
              content={<img src="/dustbin.png" style={styles.deleteIcon} />}
            />
            <EditButton
              onClick={onEditButtonClick}
              style={{ width: null }}
              buttonStyle={styles.editButton}
              content={'X'}
            />
          </div>:
          canEdit ?
            <EditButton
              onClick={onEditButtonClick}
              buttonStyle={styles.editButton}
            /> :
            null
      }
      <div style={{ ...styles.reviewRow, ...styles.titleRow }}>
        {
          isAdmin && !isEditing ?
            <Link to={`${ROUTES.users}/${review.userId}`} style={styles.reviewUserName}>{review.userName}</Link> :
            <div style={styles.reviewUserName}>{review.userName}</div>
        }
        {
          review.isBest ?
            <span style={styles.bestReview}>Best Review</span> :
            null
        }
        {
          review.isWorst ?
            <span style={styles.worstReview}>Worst Review</span> :
            null
        }
      </div>
      {
        isEditing ?
          <ReviewForm review={review} onSuccess={onReviewEditSuccess} /> :
          <div>
            <StarRating rating={review.rating} style={styles.reviewRow} data-testid={`review-${review.id}-rating`} />
            <div style={styles.reviewRow}>{review.comment}</div>
            <div style={styles.reviewRow}><i>Visited:</i> {moment(review.visitDate).format('ddd DD MMM YYYY')}</div>
          </div>
      }

      {
        review.reply ?
          <div style={styles.replyContainer}>
            <div style={styles.replyLabel}>Reply:</div>
            <div>{review.reply}</div>
          </div> :
          isOwner ?
            <div style={styles.replyFormContainer}>
              <textarea
                value={reply}
                onChange={onReplyChange}
                style={styles.replyTextarea}
              />
              <Button
                text="Reply"
                onClick={onReplySubmit}
                style={styles.replyButton}
              />
            </div> :
            null
      }
    </div>
  );
}
