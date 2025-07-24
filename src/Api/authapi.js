import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.21:8000/",
  prepareHeaders: (headers, { getState }) => {
    // Try to get token from Redux state
    const token = getState().auth?.accessToken || null;
    // If token not in state, retrieve from local storage
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      const authString = localStorage.getItem("auth");
      let authData = null;
      if (authString) {
        try {
          authData = JSON.parse(authString);
        } catch (e) {
          authData = null;
        }
      }
      if (authData?.access) {
        headers.set("authorization", `Bearer ${authData.access}`); // Set Authorization header
      }
    }
    return headers;
  },
});

export const authapi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["users"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/api/v1/register/",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/v1/login/",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/forgot-password/",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/api/v1/verify-otp/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/reset-password/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authapi;
