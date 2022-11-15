import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import expireReducer from "redux-persist-expire";
import { patientApi } from "./patient.api";
import { appointmentApi } from "./appointment.api";
import { authApi } from "./auth.api";
import { userApi } from "./user.api";
import toastReducer from "./toast.slice";
import authReducer from "./auth.slice";

export * from "./auth.slice";
export * from "./patient.api";
export * from "./toast.slice";
export * from "./appointment.api";
export * from "./auth.api";
export * from "./user.api";

const persistConfig = {
  key: "user",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "$2a$12$YU8JkYV1/MsiJP8fFl/EfO9dsLOQHyCbsP8cfjTiTATR89ToO.JaK",
    }),
    expireReducer("user", {
      expireSeconds: 7200,
      expiredState: null,
    }),
  ],
};

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      auth: persistReducer(persistConfig, authReducer),
      toast: toastReducer,
      [patientApi.reducerPath]: patientApi.reducer,
      [appointmentApi.reducerPath]: appointmentApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
        .concat(patientApi.middleware)
        .concat(appointmentApi.middleware)
        .concat(authApi.middleware)
        .concat(userApi.middleware),
  });
};

export const store = setupStore({});
export const persistor = persistStore(store);
