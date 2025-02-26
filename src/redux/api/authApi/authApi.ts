import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAdmin: builder.mutation({
            query: (data: object) => ({
                method: 'POST',
                url: `/user/create-admin`,
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        createManager: builder.mutation({
            query: (data: object) => ({
                method: 'POST',
                url: `/user/create-manager`,
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        loginUser: builder.mutation({
            query: (data: object) => ({
                method: 'POST',
                url: `/auth/login`,
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        changePassword: builder.mutation({
            query: (data: object) => ({
                method: 'POST',
                url: `/auth/change-password`,
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        getUsers: builder.query({
            query: () => ({
                method: 'GET',
                url: `/auth`,
            }),
            providesTags: ["Auth"],
        }),
        updateUser: builder.mutation({
            query: ({ id, data }: { id: number; data: object }) => ({
                method: 'PUT',
                url: `/auth/${id}`,
                body: data,
            }),
            invalidatesTags: ["Auth"],
        }),
        deleteUser: builder.mutation({
            query: (id: number) => ({
                method: 'DELETE',
                url: `/auth/${id}`,
            }),
            invalidatesTags: ["Auth"],
        }),
    }),
})

export const {
    useCreateAdminMutation,
    useLoginUserMutation,
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useChangePasswordMutation,
} = authApi