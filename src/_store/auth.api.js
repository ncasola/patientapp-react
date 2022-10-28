import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithauth } from "_helpers";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithauth,
  refetchOnMountOrArgChange: 30,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
        query: (body) => ({
            url: '/users/login', 
            method: 'POST',
            body
        }),
        invalidatesTags: ['Auth'],
    })
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation} = authApi;