import {
  TAdminAndManager,
  TError,
  TQueryParams,
  TResponseWithRedux,
} from "@/types";
import { baseApi } from "../../baseApi";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/user/create-admin",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["user"],
    }),
    createManager: builder.mutation({
      query: (data) => ({
        url: "/user/create-manager",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUser: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/admin-manager",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["user"],
      transformResponse: (res: TResponseWithRedux<TAdminAndManager[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    getSingleUser: builder.query({
      query: ({ id }) => ({
        url: `/admin-manager/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
      transformResponse: (res: TResponseWithRedux<TAdminAndManager>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin-manager/update/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["user"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    softDeleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/admin-manager/soft-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/admin-manager/hard-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useCreateManagerMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useSoftDeleteUserMutation,
  useDeleteUserMutation,
} = userApi;
