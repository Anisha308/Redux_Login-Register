import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/apiSlice";
// import cartSliceReducer from "./slice/cartSlice";
import authReducer from "./slice/authSlice"; // add this line
import adminAuthReducer from "./slice/adminAuthSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
