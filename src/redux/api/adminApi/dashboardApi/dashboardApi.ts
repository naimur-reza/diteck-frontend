import { TQueryParams, TResponseWithRedux } from "@/types";
import { baseApi } from "../../baseApi";
import { TDashboardAnalytics } from "@/types/dashboard.types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAnalytics: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/dashboard/get-analytics",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Dashboard"],
      transformResponse: (res: TResponseWithRedux<TDashboardAnalytics>) => {
        return { data: res.data, meta: res.meta };
      },
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery } = dashboardApi;
