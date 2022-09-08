import { configureStore } from "@reduxjs/toolkit";
import { APISlice } from "../features/API/APISlice";

export const store = configureStore({
  reducer: {
    [APISlice.reducerPath]: APISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APISlice.middleware),
});
