import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import StarRating from '../atoms/StarRating';
import Button from '../atoms/Button';

const BORDER_WIDTH = 1;

const styles = {
  container: {
    maxWidth: 480,
    marginTop: 12,
    background: '#fff',
    border: `#e7e7e7 solid ${BORDER_WIDTH}px`,
    borderRadius: '5px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
  },
  title: {
    fontWeight: 500,
    marginBottom: 12,
  },
  input: {
    borderRadius: 5,
    margin: '4px 0',
  },
  ratingComponent: {
    display: 'flex',
    alignItems: 'center',
  },
  rating: {
    width: 25,
    padding: 4,
    marginRight: 12,
  },
  comment: {
    minHeight: 200,
    padding: 12,
    fontSize: 16,
    resize: 'vertical',
  },
  datePickerWrapper: {
    width: 80,
  },
  visitDate: {
    height: 40,
    width: 100,
    fontSize: 12,
  },
  submitButton: {
    width: `calc(100% + ${BORDER_WIDTH * 2}px)`,
    position: 'relative',
    top: BORDER_WIDTH,
    left: -BORDER_WIDTH,
    border: `#e7e7e7 solid ${BORDER_WIDTH}px`,
    borderTop: `#e3e3e3 solid ${BORDER_WIDTH}px`,
    borderRadius: '0 0 5px 5px',
    padding: 12,
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'uppercase',
  },
};

const CustomDatePickerInput = ({ value, onClick }) => <Button
  text={value}
  onClick={onClick}
  style={{ ...styles.input, ...styles.visitDate }}
/>;

export default function ReviewForm({
  rating,
  onRatingChange,
  comment,
  onCommentChange,
  visitDate,
  onVisitDateChange,
  onSubmit,
  style = {},
}) {
  return (
    <div style={{ ...styles.container, ...style }}>
      <div style={styles.contentContainer}>
        <div style={styles.title}>Leave a review</div>
        <div style={styles.ratingComponent}>
          <input
            type="number"
            min={1}
            max={5}
            step={1}
            value={rating}
            onChange={onRatingChange}
            style={{ ...styles.input, ...styles.rating }}
            data-testid="review-form-rating"
          />
          <StarRating rating={rating} />
        </div>
        <textarea
          value={comment}
          onChange={onCommentChange}
          style={{ ...styles.input, ...styles.comment }}
          data-testid="review-form-comment"
        />
        <div style={{ ...styles.input, ...styles.datePickerWrapper }}>
          <DatePicker
            selected={visitDate}
            onChange={onVisitDateChange}
            customInput={< CustomDatePickerInput />}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      <Button
        text="Submit"
        onClick={onSubmit}
        style={styles.submitButton}
        data-testid="review-form-submit"
      />
    </div>
  );
}