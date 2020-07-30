import { MOCK_RESTAURANT, MOCK_RESTAURANT_WITH_USER_REVIEW } from '../../components/__mocks__/restaurants';
import { MOCK_REGULAR_USER } from '../../components/__mocks__/users';

export default {
  async getRestaurantById(id) {
    if (Number(id) === MOCK_RESTAURANT_WITH_USER_REVIEW.id) {
      return MOCK_RESTAURANT_WITH_USER_REVIEW;
    }
    return MOCK_RESTAURANT;
  },

  async getRestaurants() {
    return MOCK_RESTAURANTS;
  },

  async postReview(reviewData) {
    return reviewData;
  },

  async patchReview(reviewData) {
    return reviewData;
  },

  async registerUser() {
    return MOCK_REGULAR_USER;
  },

  async authenticateUser() {
    return MOCK_REGULAR_USER;
  },

  async signOut() {
    return true;
  }
}
