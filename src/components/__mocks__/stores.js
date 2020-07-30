import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userSlice from '../../slices/user';
import errorSlice from '../../slices/error';
import { MOCK_REGULAR_USER } from './users';

export const STORE = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
    error: errorSlice.reducer,
  }),
  preloadedState: {
    user: {
      authenticated: false,
    },
  },
});

export const AUTHENTICATED_USER_STORE = configureStore({
  reducer: combineReducers({
    user: userSlice.reducer,
    error: errorSlice.reducer,
  }),
  preloadedState: {
    user: {
      authenticated: true,
      user: MOCK_REGULAR_USER,
    },
  },
});
