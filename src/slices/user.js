import { createSlice } from '@reduxjs/toolkit';

const initialState = { authenticated: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    markAsAuthenticated: (state, action) => ({ ...state, authenticated: true, user: action.payload.user }),
    signOut: () => initialState,
  },
});

export const { markAsAuthenticated, signOut } = userSlice.actions;

export default userSlice;
