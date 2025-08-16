import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Try to get token from Redux state
    const token = getState().auth?.access || null;
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

export default baseQuery;
