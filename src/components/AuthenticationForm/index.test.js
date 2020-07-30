import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import AuthenticationForm from './presentational';
import AuthenticationFormContainer from './container';
import { MOCK_REGULAR_USER } from '../__mocks__/users';
import { STORE } from '../__mocks__/stores';

describe('Registration form', () => {
  test('should render the expected fields', () => {
    const { getByText, getByTestId } = render(
      <Provider store={STORE}>
        <MemoryRouter>
          <AuthenticationForm />
        </MemoryRouter>
      </Provider>
    );

    getByTestId('authentication-form-email');
    getByTestId('authentication-form-password');
    getByText('Sign in');
  });

  test('should return an object with the entered values', () => {
    const data = {
      email: MOCK_REGULAR_USER.email,
      password: MOCK_REGULAR_USER.password,
    };
    let submittedData = {};;

    const { getByTestId } = render(
      <Provider store={STORE}>
        <MemoryRouter>
          <AuthenticationForm
            email={data.email}
            onEmailChange={() => null}
            password={data.password}
            onPasswordChange={() => null}
            onSubmit={(data) => {
              submittedData = data;
            }}
          />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = getByTestId('authentication-form-email');
    const passwordInput = getByTestId('authentication-form-password');

    expect(emailInput.value).toBe(data.email);
    expect(passwordInput.value).toBe(data.password);

    const signInButton = getByTestId('authentication-form-submit');
    fireEvent.click(signInButton);

    expect(submittedData).toEqual(data);
  });

  test('should validate the submitted data', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={STORE}>
        <AuthenticationFormContainer />
      </Provider>
    );

    const emailInput = getByTestId('authentication-form-email');
    const passwordInput = getByTestId('authentication-form-password');
    const submitButton = getByTestId('authentication-form-submit');

    fireEvent.click(submitButton);

    await waitForElement(() => getByText('E-mail address required'));
    getByText('Password required');

    fireEvent.change(emailInput, { target: { value: 'thorasgard.gov' } });
    fireEvent.change(passwordInput, { target: { value: 'mjolnir' } });

    fireEvent.click(submitButton);

    getByText('Invalid e-mail address');
  });
});
