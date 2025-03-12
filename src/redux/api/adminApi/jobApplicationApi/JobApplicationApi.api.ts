import { baseApi } from "@/redux/api/baseApi";
import { TJobApplication, TQueryParams, TResponseWithRedux } from "@/types";

export const jobApplicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestJobApplication: builder.mutation({
      query: ({ data, jobId }) => ({
        url: `/job-application/request-for-submit-application/${jobId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobApplication"],
    }),
    createJobApplication: builder.mutation({
      query: (data) => ({
        url: "/job-application/submit-application",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobApplication"],
    }),
    getAllJobApplication: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/job-application/all-applications",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["jobApplication"],
      transformResponse: (res: TResponseWithRedux<TJobApplication[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    getSingleJobApplication: builder.query({
      query: ({ id }) => {
        return {
          url: `/job-application/${id}`,
          method: "GET",
        };
      },
      providesTags: ["jobApplication"],
      transformResponse: (res: TResponseWithRedux<TJobApplication>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
    updateJobApplicationStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/job-application/toggle-archive-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["jobApplication"],
    }),
    bulkDeleteJobApplication: builder.mutation({
      query: ({ data }) => ({
        url: `/job-application/bulk-delete-shortlisted`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["jobApplication"],
    }),
    deleteJobApplication: builder.mutation({
      query: ({ id }) => ({
        url: `/job-application/permanent-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobApplication"],
    }),
  }),
});

export const {
  useCreateJobApplicationMutation,
  useDeleteJobApplicationMutation,
  useGetAllJobApplicationQuery,
  useGetSingleJobApplicationQuery,
  useUpdateJobApplicationStatusMutation,
  useBulkDeleteJobApplicationMutation,
  useRequestJobApplicationMutation,
} = jobApplicationApi;
