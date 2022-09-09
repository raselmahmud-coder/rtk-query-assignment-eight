import { configureStore } from "@reduxjs/toolkit";
import { APISlice } from "../features/API/APISlice";
import statusFilterSlice from "../features/filters/statusFilterSlice";

export const store = configureStore({
  reducer: {
    [APISlice.reducerPath]: APISlice.reducer,
    statusFilter: statusFilterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APISlice.middleware),
});
