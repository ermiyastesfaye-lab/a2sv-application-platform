import { authApi } from "@/app/(features)/auth/services/auth";
import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "./api/adminApi";
import { cyclesApi } from "./api/applicationCyclesApi";
import { reviewerApi } from "./api/reviewerApi";
import { profileApi } from "./api/profileApi";
import reviewerReducer from "./slices/reviewerSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [cyclesApi.reducerPath]: cyclesApi.reducer,
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
      reviewerApi.middleware,
      profileApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
