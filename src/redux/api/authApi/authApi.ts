import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: object) => ({
        method: "POST",
        url: `/auth/login`,
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (data: object) => ({
        method: "POST",
        url: `/auth/change-password`,
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgetPassword: builder.mutation({
      query: (data: object) => ({
        method: "POST",
        url: `/auth/update-forgot-password`,
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation({
      query: (data: object) => ({
        method: "POST",
        url: `/auth/reset-password-request`,
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginUserMutation, useChangePasswordMutation } = authApi;
