import { configureStore } from "@reduxjs/toolkit";

import { patientApi } from "./patient.api";
import { appointmentApi } from "./appointment.api";
import { authApi } from "./auth.api";
import toastReducer from "./toast.slice";
import authReducer from "./auth.slice";

export * from "./auth.slice";
export * from "./patient.api";
export * from "./toast.slice";
export * from "./appointment.api";
export * from "./auth.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(patientApi.middleware)
      .concat(appointmentApi.middleware)
      .concat(authApi.middleware)
});
