import { configureStore } from "@reduxjs/toolkit";
import inReducer from "./slices/inSlice";
import formReducer from "./slices/formSlice";

export const store = configureStore({
  reducer: {
    test: inReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
