import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { patientApi } from './patient.slice';
import { appointmentApi } from './appointment.slice';
import toastReducer from './toast.slice';

export * from './auth.slice';
export * from './patient.slice';
export * from './toast.slice';
export * from './appointment.slice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        [patientApi.reducerPath]: patientApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(patientApi.middleware).concat(appointmentApi.middleware),
});