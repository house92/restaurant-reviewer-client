import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Nav from '.';
import { STORE, AUTHENTICATED_USER_STORE } from '../__mocks__/stores';

describe('Nav', () => {
  it('should render as expected when anonymous', () => {
    const { getByText } = render(
      <Provider store={STORE}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </Provider>
    );

    getByText('Restaurant Reviewer');
    getByText('Sign in')
  });

  it('should render as expected when authenticated as a regular user', () => {
    const { getByText } = render(
      <Provider store={AUTHENTICATED_USER_STORE}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </Provider>
    );

    getByText('Restaurant Reviewer');
    getByText('Sign out')
  });
});
