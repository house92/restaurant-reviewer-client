import React, { useState } from 'react';

import Modal from './presentational';
import AuthenticationForm from '../AuthenticationForm';
import RegistrationForm from '../RegistrationForm';

export const TABS = {
  signIn: 'signIn',
  signUp: 'signUp',
};

export default function ModalContainer({ backgroundComponent, isModalVisible }) {
  const [tab, setTab] = useState(TABS.signIn);
  let component;

  if (isModalVisible) {
    if (tab === TABS.signIn) {
      component = AuthenticationForm;
    } else if (tab === TABS.signUp) {
      component = RegistrationForm;
    }
  }

  return <Modal
    isModalVisible={isModalVisible}
    childComponent={component}
    backgroundComponent={backgroundComponent}
    onTabClick={(tab) => setTab(tab)}
  />;
}