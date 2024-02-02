import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: null,
  user: null,
  loading: true,
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.initialized = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure(state) {
      state.loading = false;
      state.error = true;
    },
    loginNoUser(state) {
      state.error = false;
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, loginNoUser } =
  authSlice.actions;
export default authSlice.reducer;
