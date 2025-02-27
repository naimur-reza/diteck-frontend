import { TError, TQueryParams, TResponseWithRedux } from "@/types";
import { baseApi } from "../../baseApi";
import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { TQuery } from "@/types/query.types";

export const queryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRequestQuery: builder.mutation({
      query: (data) => ({
        url: "/query/request-for-query",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["query"],
    }),
    createQuery: builder.mutation({
      query: (data) => ({
        url: "/query",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["query"],
    }),
    getAllQuery: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/query",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["query"],
      transformResponse: (res: TResponseWithRedux<TQuery[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getSingleQuery: builder.query({
      query: ({ id }) => ({
        url: `/query/query-details/${id}`,
        method: "GET",
      }),
      providesTags: ["query"],
      transformResponse: (res: TResponseWithRedux<TQuery>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getMyQuery: builder.query({
      query: () => ({
        url: `/query/get-my-queries`,
        method: "GET",
      }),
      providesTags: ["query"],
      transformResponse: (res: TResponseWithRedux<TQuery>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    assignQuery: builder.mutation({
      query: ({ data, queryId }) => ({
        url: `/query/assign-query/${queryId}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["query"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    resolveQuery: builder.mutation({
      query: ({ data, queryId }) => ({
        url: `/query/resolve-query/${queryId}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["query"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),
    deleteQuery: builder.mutation({
      query: ({ id }) => ({
        url: `/query/delete-query/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["query"],
    }),
  }),
});

export const {
  useAssignQueryMutation,
  useResolveQueryMutation,
  useCreateQueryMutation,
  useCreateRequestQueryMutation,
  useGetAllQueryQuery,
  useDeleteQueryMutation,
  useGetSingleQueryQuery,
  useGetMyQueryQuery,
} = queryApi;
