import React from 'react';

import { styles as viewStyles } from '../RestaurantView/presentational';
import Button from '../atoms/Button';

const styles = {
  ...viewStyles,
  input: {
    padding: 8,
    borderRadius: 5,
  },
  imageInput: {
    marginTop: 2,
  },
  nameInput: {
    margin: '0.67em 0',
    fontSize: '2em',
  },
  descriptionTextarea: {
    width: '100%',
    minHeight: 200,
    fontSize: 16,
    resize: 'vertical',
    outline: 'none',
  },
  button: {
    height: 40,
    width: 100,
    margin: '12px 20px',
    fontSize: 16,
    borderRadius: 5,
  },
  saveButton: {
    hoverBackgroundColor: '#0ecc08',
  },
};

export default function EditRestaurant({
  name,
  onNameChange,
  address,
  onAddressChange,
  description,
  onDescriptionChange,
  image,
  onImageChange,
  onSave,
  onDelete,
  style = {},
}) {
  return (
    <div className="restaurant-view" style={{ ...styles.container, ...style }}>
      <img
        src={`https://images.weserv.nl/?url=${image}&fit=cover&a=smart&h=400&w=${window.innerWidth}`}
        alt="Restaurant"
      />
      <input
        type="text"
        value={image}
        placeholder="Image URL"
        onChange={onImageChange}
        style={{ ...styles.input, ...styles.imageInput }}
      />
      <div style={styles.textContainer}>
        <div style={styles.titleLine}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={onNameChange}
            style={{ ...styles.input, ...styles.nameInput }}
          />
        </div>
        <div style={styles.address}>
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={onAddressChange}
            style={{ ...styles.input, ...styles.address }}
          />
        </div>
        <div style={styles.description}>
          <textarea
            value={description}
            placeholder="Write a description"
            onChange={onDescriptionChange}
            style={{ ...styles.input, ...styles.descriptionTextarea }}
          />
        </div>
      </div>
      <div>
        <Button
          text="Save"
          onClick={onSave}
          hoverBackgroundColor={styles.saveButton.hoverBackgroundColor}
          style={styles.button}
        />
        <Button
          text="Delete"
          onClick={onDelete}
          style={styles.button}
        />
      </div>
    </div>
  );
}