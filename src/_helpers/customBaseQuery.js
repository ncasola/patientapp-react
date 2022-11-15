import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { store } from "_store";
import { authActions } from "_store";
let url = "";
// check if jest is running
const isJest = typeof jest !== "undefined";
// check if production
const isProduction = process.env.NODE_ENV === "production";
// check if development
const isDevelopment = process.env.NODE_ENV === "development";
if (isJest) {
  url = process.env.REACT_APP_API_URL_LOCAL;
}
if (isProduction) {
  url = process.env.REACT_APP_API_URL;
}
if (isDevelopment) {
  url = "/api";
}
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders(headers) {
    return headers;
  },
  credentials: "include",
});
export const baseQueryWithauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.originalStatus === 401) {
    store.dispatch(authActions.logout());
  } else {
    return result;
  }
};
