import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { store } from "_store";
import { authActions } from "_store";

let url = "";
switch (process.env.NODE_ENV) {
  case "development":
    url = "/api";
    break;
  case "production":
    url = process.env.REACT_APP_API_URL;
    break;
  default:
    url = process.env.REACT_APP_API_URL_LOCAL;
    break;
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
