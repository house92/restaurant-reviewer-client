import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Modal from '.';
import userSlice from '../../slices/user';

const store = configureStore({
  reducer: userSlice.reducer,
});

describe('Modal', () => {
  it('should render as expected', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <Modal isModalVisible={true} />
      </Provider>
    );

    getByTestId('modal-tab-sign-in');
    const signUpTab = getByTestId('modal-tab-sign-up');

    // AuthenticationForm

    getByTestId('authentication-form-email');
    getByTestId('authentication-form-password');
    getByTestId('authentication-form-submit');

    fireEvent.click(signUpTab);

    // RegistrationForm

    getByTestId('registration-form-email');
    getByTestId('registration-form-password');
    getByTestId('registration-form-confirm-password');
    getByText('Are you a restaurant owner?');
    getByTestId('registration-form-owner');
    getByTestId('registration-form-submit');
  });
});
