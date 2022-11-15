import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithauth } from "_helpers";

export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: baseQueryWithauth,
  refetchOnMountOrArgChange: 30,
  tagTypes: ['Patient'],
  endpoints: (builder) => ({
    getPatients: builder.query({
        query: ({pageNum, size, searchData}) => `/patients?page=${pageNum}&size=${size}&search=${searchData.value}&searchBy=${searchData.column}`,
        providesTags: (result, error, arg) =>
        result
          ? [...result.items.map(({ id }) => ({ type: 'Patient', id })), { type: 'Patient', id: 'PARTIAL-LIST' }]
          : [{ type: 'Patient', id: 'PARTIAL-LIST' }],
    }),
    getAllPatients: builder.query({
        query: () => `/patients/all`,
        providesTags: (result, error, arg) => [...result.map(({ id }) => ({ type: 'Patient', id }))],
    }),
    getPatient: builder.query({
        query: (id) => `/patients/${id}`,
        providesTags: (result, error, arg) => [{ type: 'Patient', id: result.id }],
    }),
    createPatient: builder.mutation({
        query: (body) => ({
            url: "/patients",
            method: "POST",
            body,
        }),
        invalidatesTags: ['Patient'],
    }),
    updatePatient: builder.mutation({
        query: (body) => ({
            url: `/patients/${body.id}`,
            method: "PUT",
            body,
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'Patient', id: arg.id }],
    }),
    deletePatient: builder.mutation({
        query: (id) => ({
            url: `/patients/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'Patient', id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPatientsQuery, useGetAllPatientsQuery, useGetPatientQuery, useCreatePatientMutation, useUpdatePatientMutation, useDeletePatientMutation } = patientApi;
