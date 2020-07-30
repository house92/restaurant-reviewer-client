import React, { useEffect, useState } from 'react';

import Button from '../atoms/Button';
import { BORDER_WIDTH } from '../Modal/presentational';

const styles = {
  container: {
    width: '100%',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px 25px 80px',
  },
  validationErrorsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 60,
  },
  validationError: {
    backgroundColor: '#ff8c8c',
    border: `#ff0000 solid ${BORDER_WIDTH}px`,
    borderRadius: 5,
    padding: '3px 8px',
    color: '#fff',
    marginBottom: 5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    width: '100%',
  },
  input: {
    margin: '5px 0',
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '5px 0',
    width: '100%',
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

export default function AuthenticationForm({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmit,
  validationErrors = [],
  style = {},
}) {
  const [currentInput, setCurrentInput] = useState();
  // Stupid workaround for auto-focus
  useEffect(() => {
    if (currentInput) {
      currentInput.focus();
    }
  }, [currentInput]);

  return (
    <div className="authentication-form" style={{ ...styles.container, ...style }}>
      <div style={styles.contentContainer}>
        <div className="validation-errors" style={styles.validationErrorsContainer}>
          {validationErrors.map((error, i) => <div style={styles.validationError} key={`error-${i}`}>{error}</div>)}
        </div>
        <form style={styles.form}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onEmailChange}
            placeholder="E-mail"
            data-testid="authentication-form-email"
            style={styles.input}
            autoFocus
            ref={el => setCurrentInput(el)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChange}
            placeholder="Password"
            data-testid="authentication-form-password"
            style={styles.input}
            onKeyDown={event => event.keyCode === 13 ? onSubmit() : null}
          />
        </form>
      </div>
      <Button
        text="Sign in"
        type="button"
        style={styles.submitButton}
        data-testid="authentication-form-submit"
        onClick={() => onSubmit({ email, password })}
      />
    </div>
  );
}