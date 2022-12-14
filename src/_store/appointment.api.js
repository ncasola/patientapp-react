import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithauth } from "_helpers";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: baseQueryWithauth,
  refetchOnMountOrArgChange: 30,
  tagTypes: ["Appointment"],
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: ({pageNum, size, searchData}) => `/appointments?page=${pageNum}&size=${size}&search=${searchData.value}&searchBy=${searchData.column}`,
      providesTags: (result, error, arg) =>
      result
        ? [...result.items.map(({ id }) => ({ type: 'Appointment', id })), { type: 'Appointment', id: 'PARTIAL-LIST' }]
        : [{ type: 'Appointment', id: 'PARTIAL-LIST' }],
  }),
  getAllAppointments: builder.query({
      query: () => `/appointments/all`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Appointment", id })),
              "Appointment",
            ]
          : ["Appointment"],
  }),
    getAppointmentsByUser: builder.query({
      query: (userId) => `/appointments/all/${userId}`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Appointment", id })),
              "Appointment",
            ]
          : ["Appointment"],
    }),
    getAppointment: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: (result, error, arg) => [
        { type: "Appointment", id: arg.id },
      ],
    }),
    createAppointment: builder.mutation({
      query: (body) => ({
        url: "/appointments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Appointment"],
    }),
    updateAppointment: builder.mutation({
      query: (body) => ({
        url: `/appointments/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Appointment", id: arg.id },
      ],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Appointment", id: arg.id },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAppointmentsQuery,
  useGetAllAppointmentsQuery,
  useGetAppointmentsByUserQuery,
  useGetAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
