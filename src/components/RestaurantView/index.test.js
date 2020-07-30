import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import moment from 'moment';

import RestaurantViewContainer from './container';
import RestaurantView from './presentational';
import { AUTHENTICATED_USER_STORE, STORE } from '../__mocks__/stores';
import { MOCK_RESTAURANT, MOCK_RESTAURANT_WITH_USER_REVIEW } from '../__mocks__/restaurants';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { MOCK_REGULAR_USER } from '../__mocks__/users';

jest.mock('../../services/ApiService');

const wrapTestComponents = (path, components) => (
  <MemoryRouter initialEntries={[path]}>
    <Switch>
      <Route path={ROUTES.restaurant}>
        {components}
      </Route>
    </Switch>
  </MemoryRouter>
);

describe('Restaurant view', () => {
  it('should render the restaurant data', () => {
    const { getByText, getByTestId } = render(wrapTestComponents(
      `${ROUTES.restaurants}/${MOCK_RESTAURANT.id}`,
      <Provider store={STORE}>
        <RestaurantView restaurant={MOCK_RESTAURANT} user={MOCK_REGULAR_USER} />
      </Provider>
    ));

    getByText(MOCK_RESTAURANT.name);
    getByText(MOCK_RESTAURANT.address);
    getByText(MOCK_RESTAURANT.description);
    const imgElement = getByText((_, element) => element.tagName.toLowerCase() === 'img');
    expect(imgElement.src).toContain(MOCK_RESTAURANT.image);
    const ratingElement = getByTestId('rating');
    expect(Number(ratingElement.dataset.rating)).toBe(MOCK_RESTAURANT.averageRating);
  });

  it('should render the reviews', () => {
    const { getByText, getByTestId } = render(wrapTestComponents(
      `${ROUTES.restaurants}/${MOCK_RESTAURANT.id}`,
      <Provider store={STORE}>
        <RestaurantView restaurant={MOCK_RESTAURANT} user={MOCK_REGULAR_USER} />
      </Provider>
    ));

    let i = 0;

    for (const review of MOCK_RESTAURANT.reviews) {
      getByText(moment(review.visitDate).format('ddd DD MMM YYYY'));
      getByText(review.comment);
      const ratingElement = getByTestId(`review-${review.id}-rating`);
      expect(Number(ratingElement.dataset.rating)).toBe(review.rating);
      i++;
    }
  });

  it('should render a form to submit a review when authenticated as a regular user', async () => {
    {
      const { getByText, getByTestId } = render(wrapTestComponents(
        `${ROUTES.restaurants}/${MOCK_RESTAURANT.id}`,
        (
          <Provider store={STORE}>
            <RestaurantViewContainer />
          </Provider>
        )
      ));

      await wait(() => {
        expect(() => getByText('Leave a review')).toThrow();
        expect(() => getByTestId('review-form-rating')).toThrow();
        expect(() => getByTestId('review-form-comment')).toThrow();
        expect(() => getByTestId('review-form-visit-date')).toThrow();
        expect(() => getByTestId('review-form-submit')).toThrow();
      });
    }
    {
      const { getByText, getByTestId, debug } = render(wrapTestComponents(
        `${ROUTES.restaurants}/${MOCK_RESTAURANT.id}`,
        (
          <Provider store={AUTHENTICATED_USER_STORE}>
            <RestaurantViewContainer />
          </Provider>
        )
      ));

      await wait(() => {
        getByText('Leave a review');
        getByTestId('review-form-rating');
        getByTestId('review-form-comment');
        getByText((_, el) => el.classList.contains('react-datepicker-wrapper'));
        getByTestId('review-form-submit');
      });
    }
  });

  it('should trigger the onSubmit function when the review form is submitted', () => {
    let submitted = false;
    function onReviewSubmitSuccess() {
      submitted = true;
    }

    const { getByTestId, debug } = render(wrapTestComponents(
      `${ROUTES.restaurants}/${MOCK_RESTAURANT.id}`,
      (
        <Provider store={AUTHENTICATED_USER_STORE}>
          <RestaurantView
            restaurant={MOCK_RESTAURANT}
            shouldRenderReviewForm={true}
            onReviewSubmitSuccess={onReviewSubmitSuccess}
          />
        </Provider>
      )
    ));

    const submitButton = getByTestId('review-form-submit');

    fireEvent.click(submitButton);

    wait(() => {
      expect(submitted).toBeTruthy();
    });
  });

  it('should not render a form to submit a review when the user has already reviewed the restaurant', async () => {
    const { getByText, getByTestId } = render(wrapTestComponents(
      `${ROUTES.restaurants}/${MOCK_RESTAURANT_WITH_USER_REVIEW.id}`,
      (
        <Provider store={AUTHENTICATED_USER_STORE}>
          <RestaurantViewContainer restaurant={MOCK_RESTAURANT_WITH_USER_REVIEW} />
        </Provider>
      )
    ));

    await wait(() => {
      expect(() => getByText('Leave a review')).toThrow();
      expect(() => getByTestId('review-form-rating')).toThrow();
      expect(() => getByTestId('review-form-comment')).toThrow();
      expect(() => getByTestId('review-form-visit-date')).toThrow();
      expect(() => getByTestId('review-form-submit')).toThrow();
    });
  });
});
