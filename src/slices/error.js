import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const userSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => ({ ...state, error: action.payload.error }),
    removeError: (state) => ({ ...state, error: null }),
  },
});

export const { setError, removeError } = userSlice.actions;

export default userSlice;
