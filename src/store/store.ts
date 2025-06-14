import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import postsReducer from "./reducers/postsSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    posts: postsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
