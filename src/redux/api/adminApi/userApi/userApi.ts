import { TAdminAndManager, TQueryParams, TResponseWithRedux } from "@/types";
import { baseApi } from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/create-user",
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
    }),
    updateUserStatus: builder.mutation({
      query: ({ id }) => ({
        url: `/user/update-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
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
  useCreateUserMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useSoftDeleteUserMutation,
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
} = userApi;
