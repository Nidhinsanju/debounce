import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
