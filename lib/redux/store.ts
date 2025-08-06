import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./api/adminApi";
import {cyclesApi} from './api/applicationCyclesApi';

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]:adminApi.reducer,
    [cyclesApi.reducerPath]: cyclesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware, cyclesApi.middleware),
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
