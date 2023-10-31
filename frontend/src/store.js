import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/apiSlice";
// import cartSliceReducer from "./slice/cartSlice";
import authReducer from "./slice/authSlice"; // add this line

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // cart: cartSliceReducer,
    auth: authReducer, // add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
