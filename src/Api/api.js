import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.21:8000/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.accessToken || null;
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
        headers.set("authorization", `Bearer ${authData.access}`);
      }
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["users"],
  endpoints: () => ({}),
});
