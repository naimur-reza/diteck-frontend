import { TError, TQueryParams, TResponseWithRedux } from "@/types";
import { baseApi } from "../../baseApi";
import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TQuery } from "@/types/query.types";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitReview: builder.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["review"],
    }),
    updateReviewStatus: builder.mutation({
      query: ({ reviewID, data }) => ({
        url: `/review/update-review-status/${reviewID}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["review"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    getAllReviews: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/review/all-reviews",
          method: "GET",
          params: params,
        };
      },

      providesTags: ["review"],
      transformResponse: (res: TResponseWithRedux<TQuery[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getReview: builder.query({
      query: ({ reviewID }) => ({
        url: `/review/${reviewID}`,
        method: "GET",
      }),
      providesTags: ["review"],
      transformResponse: (res: TResponseWithRedux<TQuery>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const {
  useSubmitReviewMutation,
  useUpdateReviewStatusMutation,
  useGetAllReviewsQuery,
  useGetReviewQuery,
} = reviewApi;
