import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { removeError } from '../../slices/error';

const mapDispatchToProps = { removeError };

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    position: 'absolute',
    top: 20,
    opacity: 0,
    zIndex: 15,
    transition: 'opacity 1s ease-in-out 0s',
  },
  error: {
    padding: '20px 40px',
    backgroundColor: '#f90909',
    borderRadius: 5,
    color: '#fff',
    fontWeight: 500,
    WebkitBoxShadow: '0px 0px 6px 2px rgba(249,9,9,1)',
    MozBoxShadow: '0px 0px 6px 2px rgba(249,9,9,1)',
    boxShadow: '0px 0px 6px 2px rgba(249,9,9,1)',
  },
};

const VISIBLITY_VALUES = {
  hidden: 0,
  visible: 1,
};

function ErrorMessage({ error, removeError }) {
  const [visibility, setVisibility] = useState(VISIBLITY_VALUES.hidden);

  const appliedStyle = JSON.parse(JSON.stringify(styles));

  appliedStyle.container.opacity = visibility;

  useEffect(() => {
    if (error && error.error) {
      setVisibility(VISIBLITY_VALUES.visible);
      setTimeout(() => {
        setVisibility(VISIBLITY_VALUES.hidden);
        setTimeout(() => {
          removeError();
        }, 8000);
      }, 6000);
    } else {
      setVisibility(VISIBLITY_VALUES.hidden);
    }
  }, [error]);

  return (
    <div style={appliedStyle.container}>
      <div>
        <div style={appliedStyle.error}>{error.error}</div>
      </div>
    </div>
  );
}

export default connect(({ error }) => ({ error }), mapDispatchToProps)(ErrorMessage);
