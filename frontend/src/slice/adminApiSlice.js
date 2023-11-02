import { apiSlice } from './apiSlice.js';

const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        URL: `${ADMIN_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    adminRegister: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserByAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/update-user`,
        method: "PUT",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/delete-user`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const {
  useAdminLoginMutation,
  useAdminRegisterMutation,
  useAdminLogoutMutation,
  useDeleteUserMutation,
  useUpdateUserByAdminMutation,
} = adminApiSlice;