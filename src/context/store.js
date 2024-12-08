import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import newsReducer from "./slices/newsSlice";
// configuring the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    news: newsReducer,
  },
});
