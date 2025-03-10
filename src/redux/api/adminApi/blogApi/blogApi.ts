import { TBlog, TError, TQueryParams, TResponseWithRedux } from "@/types";
import { baseApi } from "../../baseApi";
import { BaseQueryApi } from "@reduxjs/toolkit/query";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/create",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["blog"],
    }),

    getAllBlogs: builder.query({
      query: (arg) => {
        const params = new URLSearchParams();
        arg?.forEach((element: TQueryParams) => {
          if (element.value) {
            params.append(element.name, element.value as string);
          }
        });
        return {
          url: "/blog/all-blog",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog"],
      transformResponse: (res: TResponseWithRedux<TBlog[]>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    getSingleBlog: builder.query({
      query: ({ id }) => ({
        url: `/blog/single-blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
      transformResponse: (res: TResponseWithRedux<TBlog>) => {
        return { data: res.data, meta: res.meta };
      },
    }),

    updateBlog: builder.mutation({
      query: ({ data, id }) => ({
        url: `/blog/update-blog/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["blog"],
      transformErrorResponse: (res: TError & BaseQueryApi) => {
        return res;
      },
    }),

    softDeleteBlog: builder.mutation({
      query: ({ id }) => ({
        url: `/blog/soft-delete-blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: ({ id }) => ({
        url: `/blog/hard-delete-blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),

    // New Comment
    newComment: builder.mutation({
      query: (data) => ({
        url: "/comment/create",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["blog"],
    }),
    // Reply Comment
    replyComment: builder.mutation({
      query: ({ data, parentId }) => ({
        url: `/comment/reply/${parentId}`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useSoftDeleteBlogMutation,
  useDeleteBlogMutation,
  useNewCommentMutation,
  useReplyCommentMutation
} = blogApi;
