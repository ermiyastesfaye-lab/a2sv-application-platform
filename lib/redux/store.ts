import { authApi } from "@/lib/redux/api/auth";
import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
// import { adminApi } from "./api/adminApi";
import { adminApi } from "./slices/adminSlice";
import { cyclesApi } from "./api/applicationCyclesApi";
import { reviewerApi } from "./api/reviewerApi";
import { profileApi } from "./api/profileApi";
import reviewerReducer from "./slices/reviewerSlice";
import profileReducer from "./slices/profileSlice";

import { managersApi } from "./api/managerApi";

import { applicationsApi } from "./api/clientApi";

import { analyticsApi } from "./api/analyticsApi";

export const store = configureStore({
  reducer: {
    [applicationsApi.reducerPath]: applicationsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [cyclesApi.reducerPath]: cyclesApi.reducer,

    [managersApi.reducerPath]: managersApi.reducer,

    [reviewerApi.reducerPath]: reviewerApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    reviewer: reviewerReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      adminApi.middleware,
      cyclesApi.middleware,
      managersApi.middleware,
      applicationsApi.middleware,
      reviewerApi.middleware,
      profileApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;