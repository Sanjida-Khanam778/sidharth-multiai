import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

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
    // This endpoint will automatically include the Authorization header if the user is logged in
    // and the access token is present in Redux state or localStorage (see baseQuery above).
    chat: builder.mutation({
      query: (body) => ({
        url: "/api/v1/chat/",
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
  useChatMutation,
} = authapi;
