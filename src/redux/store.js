import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from "./reducerSlice";

export const store = configureStore({
  reducer: {
    reducer: reducerSlice,
  },
});
