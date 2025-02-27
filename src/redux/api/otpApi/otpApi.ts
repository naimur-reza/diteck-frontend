import { baseApi } from "../baseApi";

export const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyOTP: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/otp/verify-otp`,
        body: data,
      }),
      invalidatesTags: ["otp"],
    }),
    loginVerifyOTP: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/otp/login-otp-verification`,
        body: data,
      }),
      invalidatesTags: ["otp"],
    }),
  }),
});
export const { useLoginVerifyOTPMutation, useVerifyOTPMutation } = otpApi;
