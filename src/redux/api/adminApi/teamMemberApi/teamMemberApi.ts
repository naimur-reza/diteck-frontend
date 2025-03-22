import { TQueryParams, TResponseWithRedux, TTeamMember } from "@/types";
import { baseApi } from "../../baseApi";

export const teamMemberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeamMember: builder.mutation({
      query: (data) => ({
        url: "/team-member/create",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["teamMember"],
    }),

    getAllTeamMember: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/team-member/get-all-users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["teamMember"],
      transformResponse: (res: TResponseWithRedux<TTeamMember[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getSingleTeamMember: builder.query({
      query: ({ id }) => {
        return {
          url: `/team-member/get-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["teamMember"],
      transformResponse: (res: TResponseWithRedux<TTeamMember>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    updateTeamMember: builder.mutation({
      query: ({ data, id }) => ({
        url: `/team-member/update-user/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["teamMember"],
      transformErrorResponse: (baseQueryReturnValue) => {
        return baseQueryReturnValue;
      },
    }),
    softDeleteTeamMember: builder.mutation({
      query: ({ id }) => ({
        url: `/team-member/soft-delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teamMember"],
    }),
    deleteTeamMember: builder.mutation({
      query: ({ id }) => ({
        url: `/team-member/hard-delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teamMember"],
    }),
  }),
});

export const {
  useCreateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetAllTeamMemberQuery,
  useUpdateTeamMemberMutation,
  useSoftDeleteTeamMemberMutation,
  useGetSingleTeamMemberQuery,
} = teamMemberApi;
