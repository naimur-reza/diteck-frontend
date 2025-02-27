import { TError, TQueryParams, TResponseWithRedux, TService } from "@/types";
import { baseApi } from "../../baseApi";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => ({
        url: "/service/create-service",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["service"],
    }),
    getAllService: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/service/get-all-services",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["service"],
      transformResponse: (res: TResponseWithRedux<TService[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    getSingleService: builder.query({
      query: ({ slug }) => ({
        url: `/service/get-service-by-slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["service"],
      transformResponse: (res: TResponseWithRedux<TService>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    updateService: builder.mutation({
      query: ({ data, id }) => ({
        url: `/service/update-service/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["service"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    deleteService: builder.mutation({
      query: ({ id }) => ({
        url: `/service/delete-service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
