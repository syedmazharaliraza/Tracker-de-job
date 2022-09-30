import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./slice/applicationSlice";
import filterReducer from "./slice/filterSlice";

export const store = configureStore({
  reducer: {
    application: applicationReducer,
    filter: filterReducer,
  },
});
