import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const BORDER_WIDTH = 1;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: 80,
    height: 80,
    fontSize: 18,
    border: `#e7e7e7 solid ${BORDER_WIDTH}px`,
    borderRadius: 50,
    textTransform: 'uppercase',
  },
}

export default function EditButton({
  content,
  linkTo,
  onClick,
  style = {},
  buttonStyle = {},
}) {
  if (linkTo) {
    return (
      <div style={{ ...styles.container, ...style }}>
        <Link to={linkTo}>
          <Button text={content || "Edit"} style={{ ...styles.button, ...buttonStyle }} />
        </Link>
      </div>
    );
  } else if (onClick) {
    return (
      <div style={{ ...styles.container, ...style }}>
        <Button text={content || "Edit"} onClick={onClick} style={{ ...styles.button, ...buttonStyle }} />
      </div>
    );
  }
  return null;
}