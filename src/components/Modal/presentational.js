import React, { useEffect, useState } from 'react';

import Button from '../atoms/Button';
import { TABS } from './container';
import { useHistory } from 'react-router-dom';
import { NAV_HEIGHT, NAV_VERTICAL_PADDING } from '../Nav/presentational';
import { ROUTES } from '../../constants';

export const BORDER_WIDTH = 1;
const MODAL_WIDTH = 320;

const baseStyles = {
  backgroundComponent: {},
  background: {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    visibility: 'hidden',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: `#e7e7e7 solid ${BORDER_WIDTH}px`,
    backgroundColor: '#fff',
    borderRadius: '5px',
    position: 'absolute',
    top: 'calc(50vh - 191px)',
    left: `calc(50vw - ${MODAL_WIDTH / 2 + BORDER_WIDTH}px)`,
    visibility: 'hidden',
    zIndex: 11,
    width: MODAL_WIDTH,
  },
  tabsRow: {
    display: 'flex',
    width: `calc(100% + ${BORDER_WIDTH * 2}px)`,
  },
  tab: {
    width: '100%',
    position: 'relative',
    top: -BORDER_WIDTH,
    border: `#e7e7e7 solid ${BORDER_WIDTH}px`,
    borderBottom: `#e3e3e3 solid ${BORDER_WIDTH}px`,
    padding: 12,
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  tabLeft: {
    borderRadius: '5px 0 0 0',
  },
  tabRight: {
    borderRadius: '0 5px 0 0',
  },
};

function generateStyles(isModalVisible) {
  const styles = JSON.parse(JSON.stringify(baseStyles));

  if (isModalVisible) {
    styles.backgroundComponent = {
      filter: 'blur(1px)',
      overflow: 'hidden',
      height: `calc(100vh - ${(NAV_HEIGHT * 2) + (NAV_VERTICAL_PADDING * 2)}px)`,
    };
    styles.background.visibility = 'visible';
    styles.container.visibility = 'visible';
  }

  return styles;
}

export default function Modal({
  isModalVisible = false,
  backgroundComponent,
  childComponent,
  onTabClick,
}) {
  const BackgroundComponent = backgroundComponent;
  const ChildComponent = childComponent;

  const [styles, setStyles] = useState(baseStyles);
  const history = useHistory();

  useEffect(() => {
    setStyles(generateStyles(isModalVisible));
  }, [isModalVisible]);
  return (
    <div>
      {
        backgroundComponent ?
          <BackgroundComponent style={styles.backgroundComponent} /> :
          null
      }
      <div onClick={() => history.push(ROUTES.restaurants)} style={styles.background} />
      <div style={styles.container}>
        <div style={styles.tabsRow}>
          <Button
            text="Sign in"
            style={{ ...styles.tab, ...styles.tabLeft }}
            onClick={() => onTabClick(TABS.signIn)}
            data-testid="modal-tab-sign-in"
          />
          <Button
            text="Sign up"
            style={{ ...styles.tab, ...styles.tabRight }}
            onClick={() => onTabClick(TABS.signUp)}
            data-testid="modal-tab-sign-up"
          />
        </div>
        {
          childComponent ?
            <ChildComponent />:
            null
        }
      </div>
    </div>
  );
}