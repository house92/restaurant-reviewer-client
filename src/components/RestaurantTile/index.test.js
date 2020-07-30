import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import RestaurantTile from '.';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import { MOCK_RESTAURANTS } from '../__mocks__/restaurants';
import { ROUTES } from '../../constants';
import { STORE } from '../__mocks__/stores';

const MOCK_RESTAURANT = MOCK_RESTAURANTS[0];

const wrapTestComponents = (path, components) => (
  <MemoryRouter initialEntries={[path]}>
    <Switch>
      <Route path={ROUTES.restaurant}>
        {components}
      </Route>
    </Switch>
  </MemoryRouter>
);

describe('Restaurant tile', () => {
  test('should render the expected elements', () => {
    const { getByText, getByTestId } = render(
      wrapTestComponents(
        `${ROUTES.restaurants}/${MOCK_RESTAURANT.id}`,
        <Provider store={STORE}>
          <RestaurantTile restaurant={MOCK_RESTAURANT} />
        </Provider>,
      )
    );

    getByText(MOCK_RESTAURANT.name);
    const anchorElement = getByText((_, element) => element.tagName.toLowerCase() === 'a');
    expect(anchorElement.href).toContain(MOCK_RESTAURANT.id);
    const imgElement = getByText((_, element) => element.tagName.toLowerCase() === 'img');
    expect(imgElement.src).toBe(MOCK_RESTAURANT.image);
    const ratingElement = getByTestId('rating');
    expect(Number(ratingElement.dataset.rating)).toBe(MOCK_RESTAURANT.averageRating);
  });
});
