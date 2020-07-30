import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Provider } from 'react-redux';

import RegistrationForm from '.';
import { MOCK_REGULAR_USER } from '../__mocks__/users';
import { STORE } from '../__mocks__/stores';

describe('Registration form', () => {
  test('should render the expected fields', () => {
    const { getByText, getByTestId } = render(
      <Provider store={STORE}>
        <RegistrationForm />
      </Provider>
    );

    getByTestId('registration-form-name');
    getByTestId('registration-form-email');
    getByTestId('registration-form-password');
    getByTestId('registration-form-confirm-password');
    getByText('Are you a restaurant owner?');
    getByTestId('registration-form-owner');
    getByText('Sign up');
  });

  test('should validate the submitted data', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={STORE}>
        <RegistrationForm />
      </Provider>
    );

    const emailInput = getByTestId('registration-form-email');
    const passwordInput = getByTestId('registration-form-password');
    const confirmPasswordInput = getByTestId('registration-form-confirm-password');
    const ownerCheckbox = getByTestId('registration-form-owner');
    const submitButton = getByTestId('registration-form-submit');

    fireEvent.click(submitButton);

    await waitForElement(() => getByText('Name required'));
    getByText('E-mail address required');

    fireEvent.change(emailInput, { target: { value: MOCK_REGULAR_USER.email } });
    fireEvent.change(passwordInput, { target: { value: MOCK_REGULAR_USER.password } });

    fireEvent.click(submitButton);

    getByText('Passwords must match');

    fireEvent.change(confirmPasswordInput, { target: { value: MOCK_REGULAR_USER.password } });
    fireEvent.click(ownerCheckbox);

    expect(ownerCheckbox.checked).toBeTruthy();

    fireEvent.click(submitButton);
  });
});
