import { TProject, TQueryParams, TResponseWithRedux } from "@/types";
import { baseApi } from "../../baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "/previous-work/create-previous-work",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Project"],
    }),

    getAllProjects: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/previous-work",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Project"],
      transformResponse: (res: TResponseWithRedux<TProject[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    getSingleProject: builder.query({
      query: ({ id }) => ({
        url: `/previous-work/${id}`, // project-title-20250212-081439-e224b5db
        method: "GET",
      }),
      providesTags: ["blog"],
      transformResponse: (res: TResponseWithRedux<TProject>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    updateProject: builder.mutation({
      query: ({ data, id }) => ({
        url: `/previous-work/update-previous-work/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Project"],
      transformErrorResponse: (baseQueryReturnValue) => {
        return baseQueryReturnValue;
      },
    }),

    softDeleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/previous-work/delete-previous-work/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),

    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/previous-work/permanent-delete-previous-work/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
  useSoftDeleteProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
