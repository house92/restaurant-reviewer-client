import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import RestaurantGrid from './presentational';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { MOCK_RESTAURANTS } from '../__mocks__/restaurants';
import { ROUTES } from '../../constants';
import { STORE } from '../__mocks__/stores';

const wrapTestComponents = (path, components) => (
  <MemoryRouter initialEntries={[path]}>
    <Switch>
      <Route path={ROUTES.restaurants}>
        {components}
      </Route>
    </Switch>
  </MemoryRouter>
);

describe('Restaurant Grid', () => {
  test('should render the expected elements', () => {
    const { getByText, getAllByText } = render(
      wrapTestComponents(
        `${ROUTES.restaurants}`,
        <Provider store={STORE}>
          <RestaurantGrid restaurants={MOCK_RESTAURANTS} onRatingFilterChange={() => null} />
        </Provider>
      )
    );

    const imgElements = getAllByText((_, element) => element.tagName.toLowerCase() === 'img');
    expect(imgElements.length).toEqual(MOCK_RESTAURANTS.length);

    for (const restaurant of MOCK_RESTAURANTS) {
      getByText(restaurant.name);
    }
  });
});
