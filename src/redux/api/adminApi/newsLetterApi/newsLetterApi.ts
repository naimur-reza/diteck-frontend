import { baseApi } from "@/redux/api/baseApi";
import { THiring, TQueryParams, TResponseWithRedux } from "@/types";

export const hiringApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewsLetter: builder.mutation({
      query: (data) => ({
        url: "/hiring-post/create",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Hiring"],
    }),

    getAllNewsLetter: builder.query({
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
      providesTags: ["Hiring"],
      transformResponse: (res: TResponseWithRedux<THiring[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const { useCreateNewsLetterMutation, useGetAllNewsLetterQuery } =
  hiringApi;
