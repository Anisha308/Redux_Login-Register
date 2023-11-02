  import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const AdminauthSlice = createSlice({  
  name: "Adminauth",
  initialState,
  reducers: {
    adminSetCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    adminlogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
}); 

export const { adminSetCredentials, adminlogout } = AdminauthSlice.actions;

export default AdminauthSlice.reducer;
