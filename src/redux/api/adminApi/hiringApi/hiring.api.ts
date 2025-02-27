import { baseApi } from "@/redux/api/baseApi";
import { TError, THiring, TQueryParams, TResponseWithRedux } from "@/types";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export const hiringApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createHiringPost: builder.mutation({
      query: (data) => ({
        url: "/hiring-post/create",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["hiring"],
    }),

    getAllHiringPost: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/hiring-post/get-all-post",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["hiring"],
      transformResponse: (res: TResponseWithRedux<THiring[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getSingleHiringPost: builder.query({
      query: ({ id }) => {
        return {
          url: `/hiring-post/get-single-post/${id}`,
          method: "GET",
        };
      },
      providesTags: ["hiring"],
      transformResponse: (res: TResponseWithRedux<THiring>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    updateHiringPost: builder.mutation({
      query: ({ data, id }) => ({
        url: `/hiring-post/update-post/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["hiring"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    softDeleteHiringPost: builder.mutation({
      query: ({ id }) => ({
        url: `/hiring-post/soft-delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hiring"],
    }),
    deleteHiringPost: builder.mutation({
      query: ({ id }) => ({
        url: `/hiring-post/hard-delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hiring"],
    }),
  }),
});

export const {
  useCreateHiringPostMutation,
  useDeleteHiringPostMutation,
  useGetAllHiringPostQuery,
  useUpdateHiringPostMutation,
  useSoftDeleteHiringPostMutation,
  useGetSingleHiringPostQuery,
} = hiringApi;
