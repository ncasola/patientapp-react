import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithauth } from "_helpers";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithauth,
  refetchOnMountOrArgChange: 30,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
        query: ({pageNum, size, searchData}) => `/users?page=${pageNum}&size=${size}&search=${searchData.value}&searchBy=${searchData.column}`,
        providesTags: (result, error, arg) =>
        result
          ? [...result.items.map(({ id }) => ({ type: 'User', id })), { type: 'User', id: 'PARTIAL-LIST' }]
          : [{ type: 'User', id: 'PARTIAL-LIST' }],
    }),
    getUser: builder.query({
        query: (id) => `/users/${id}`,
        providesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    getAllUsers: builder.query({
        query: () => `/users/all`,
        providesTags: (result, error, arg) => [...result.map(({ id }) => ({ type: 'User', id }))],
    }),
    createUser: builder.mutation({
        query: (body) => ({
            url: "/users",
            method: "POST",
            body,
        }),
        invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
        query: (body) => ({
            url: `/users/${body.id}`,
            method: "PUT",
            body,
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    deleteUser: builder.mutation({
        query: (id) => ({
            url: `/users/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [
            { type: 'User', id: arg.id },
            { type: 'User', id: 'PARTIAL-LIST' },
        ],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetUsersQuery, useGetAllUsersQuery, useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;
