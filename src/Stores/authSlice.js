import { createSlice } from "@reduxjs/toolkit";

// Static email for testing
const STATIC_EMAIL = "test@example.com";
const STATIC_PASSWORD = "password123";

const initialState = {
  user: null,
  isAuthenticated: false,
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;

      // Check against static credentials
      if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
        state.isAuthenticated = true;
        state.user = {
          email: STATIC_EMAIL,
          fullName: "Test User",
        };
        state.email = email;
        state.password = password;
      } else {
        throw new Error("Invalid credentials");
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.email = "";
      state.password = "";
    },
    register: (state, action) => {
      const { fullName, email, password } = action.payload;

      // For registration, we'll accept any email but use the static one for consistency
      state.isAuthenticated = true;
      state.user = {
        email: email,
        fullName: fullName,
      };
      state.email = email;
      state.password = password;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectEmail = (state) => state.auth.email;
