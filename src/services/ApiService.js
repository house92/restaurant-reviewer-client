import url from 'url';
import querystring from 'query-string';

const API_ROUTES = {
  restaurants: '/restaurants',
  reviews: '/reviews',
  reviewReplies: '/review-replies',
  users: '/users',
  auth: '/auth',
  signOut: '/sign-out',
};

function getDataFromResponse(res) {
  if (res.status < 200 || res.status >= 300) {
    throw res.text();
  }

  return res.json();
}

export default {
  async getRestaurantById(id) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, `${API_ROUTES.restaurants}/${id}`);
    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    return getDataFromResponse(res);
  },

  async getUserById(id) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, `${API_ROUTES.users}/${id}`);
    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    return getDataFromResponse(res);
  },

  async getRestaurants({ filters, ownerId }) {
    const fetchUrl = new URL(url.resolve(process.env.REACT_APP_API_BASE_URL, API_ROUTES.restaurants));

    if (filters) {
      const query = { ownerId };
      for (const [filter, value] of Object.entries(filters)) {
        query[`filters[${filter}]`] = value;
      }
      fetchUrl.search = querystring.stringify(query);
    }

    const res = await fetch(fetchUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    return getDataFromResponse(res);
  },

  async postRestaurant(restaurantData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, API_ROUTES.restaurants);
    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(restaurantData),
    });
    return getDataFromResponse(res);
  },

  async postReview(reviewData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, API_ROUTES.reviews);
    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(reviewData),
    });
    return getDataFromResponse(res);
  },

  async postReviewReply(reviewReplyData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, API_ROUTES.reviewReplies);
    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(reviewReplyData),
    });
    return getDataFromResponse(res);
  },

  async patchRestaurant(restaurantData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, `${API_ROUTES.restaurants}/${restaurantData.id}`);
    const res = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(restaurantData),
    });
    return getDataFromResponse(res);
  },

  async patchReview(reviewData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, `${API_ROUTES.reviews}/${reviewData.id}`);
    const res = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(reviewData),
    });
    return getDataFromResponse(res);
  },

  async deleteRestaurant(restaurantData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, `${API_ROUTES.restaurants}/${restaurantData.id}`);
    return fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
  },

  async deleteReview(reviewData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, `${API_ROUTES.reviews}/${reviewData.id}`);
    return fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
  },

  async registerUser(userData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, API_ROUTES.users);
    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return getDataFromResponse(res);
  },

  async authenticateUser(userData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, API_ROUTES.auth);
    const res = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return getDataFromResponse(res);
  },

  async patchUser(userData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, `${API_ROUTES.users}/${userData.id}`);
    const res = await fetch(fetchUrl, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return getDataFromResponse(res);
  },

  async deleteUser(userData) {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, `${API_ROUTES.users}/${userData.id}`);
    return fetch(fetchUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
  },

  async signOut() {
    const fetchUrl = url.resolve(process.env.REACT_APP_API_BASE_URL, API_ROUTES.signOut);
    return fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
  }
}
