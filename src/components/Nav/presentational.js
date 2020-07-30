import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

export const NAV_HEIGHT = 60;
export const NAV_VERTICAL_PADDING = 0;
export const NAV_HORIZONTAL_PADDING = 60;
const BORDER = '#e7e7e7 solid 1px';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: `calc(100% - ${NAV_HORIZONTAL_PADDING * 2}px)`,
    height: NAV_HEIGHT,
    position: 'sticky',
    top: 0,
    padding: `${NAV_VERTICAL_PADDING}px ${NAV_HORIZONTAL_PADDING}px`,
    borderBottom: BORDER,
    backgroundColor: '#f4f4f4',
    zIndex: 2,
  },
  title: {
    fontSize: 20,
  },
  actionsContainer: {
    display: 'flex',
    height: 'calc(100% + 2px)',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  action: {
    textDecoration: 'none',
    color: 'inherit',
    width: 100,
    height: '100%',
    top: -1,
  },
  button: {
    height: '100%',
    width: '100%',
    border: BORDER,
    borderRight: 'none',
    fontSize: 14,
    padding: 0,
  },
  lastButton: {
    borderRight: BORDER,
  },
};

export default function Nav({ actions }) {
  const actionsJSX = actions.map((action, i) => {
    let buttonStyle = styles.button;
    if (i === actions.length - 1) {
      buttonStyle = {
        ...buttonStyle,
        ...styles.lastButton,
      };
    }

    if (action.linkTo) {
      return (
        <Link to={action.linkTo} style={styles.action} key={`nav-action-${i}`}>
          <Button text={action.text} style={buttonStyle} />
        </Link>
      );
    } else if (action.onClick) {
      return <Button
        text={action.text}
        onClick={action.onClick}
        style={{ ...buttonStyle, ...styles.action }}
        key={`nav-action-${i}`}
      />;
    }

    return null;
  });

  return (
    <div style={styles.container}>
      <Link to="/" style={{ ...styles.link, ...styles.title }}>Restaurant Reviewer</Link>
      <div style={styles.actionsContainer}>{actionsJSX}</div>
    </div>
  );
}
