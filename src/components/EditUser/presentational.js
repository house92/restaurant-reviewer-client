import React from 'react';
import Button from '../atoms/Button';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 280,
    width: '22vw',
  },
  input: {
    margin: 12,
    padding: 8,
    width: '100%',
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

export default function EditUser({
  user,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSave,
  onDelete,
}) {
  return (
    <div style={styles.container}>
      <h1>Edit account</h1>
      <div style={styles.inputContainer}>
        <input
          value={user.name}
          onChange={onNameChange}
          placeholder="Name"
          style={styles.input}
        />
        <input
          type="email"
          value={user.email}
          onChange={onEmailChange}
          placeholder="E-mail"
          style={styles.input}
        />
        <input
          type="password"
          value={user.password || ''}
          onChange={onPasswordChange}
          placeholder="Password"
          style={styles.input}
        />
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