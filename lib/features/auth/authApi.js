import apiSlice from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    overrideExisting: module.hot?.status() === "apply",
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ url, data }) => ({
                url,
                body: data,
                method: "POST",
            })
        }),
        registration: builder.mutation({
            query: ({ url, data }) => ({
                url,
                body: data,
                method: "POST",
            }),
        }),
        checkUser: builder.query({
            query: () => 'token_user',
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET"
            })
        })
    }),
});

export const { useLoginMutation, useLogoutMutation, useCheckUserQuery, useRegistrationMutation } = authApi;