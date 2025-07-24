import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  email: "",
  password: "",
  access: null,
  refresh: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.email = "";
      state.password = "";
      state.access = null;
      state.refresh = null;
    },

    setCredentials: (state, action) => {
      const { access, refresh, user } = action.payload;
      state.access = access;
      state.refresh = refresh;
      state.user = user || null;
      state.isAuthenticated = !!access;
    },
  },
});

export const { login, logout, register, setCredentials } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectEmail = (state) => state.auth.email;
