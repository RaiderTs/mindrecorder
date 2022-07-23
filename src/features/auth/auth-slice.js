import { createSlice } from '@reduxjs/toolkit';
import authOperation from './auth-operation';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isFetchingCurrent: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperation.register.pending]: (state) => {
      state.isLoading = true;
    },
    [authOperation.register.fulfilled]: (state, action) => {
      // state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    },
    [authOperation.register.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isLoggedIn = false;
    },
    [authOperation.logIn.pending]: (state) => {
      state.isLoading = true;
    },
    [authOperation.logIn.fulfilled]: (state, action) => {
      // state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    },
    [authOperation.logOut.fulfilled]: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperation.googleSignIn.fulfilled]: (state, action) => {
      // state.user = action.payload.user.providerData;
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    [authOperation.googleSignOut.fulfilled]: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
