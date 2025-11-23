import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import appConfig from "@/config/config";
import { userLogout } from "../auth/authSlice";

const baseQueryFn = fetchBaseQuery({
    baseUrl: appConfig.api_url,
    prepareHeaders: (headers) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        }
        return headers;
    },
});

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (args, api, extraOptions) => {
        try {
            const result = await baseQueryFn(args, api, extraOptions);
            if (result.meta.response.status === 401) {
                if (typeof window !== "undefined") {
                    api.dispatch(userLogout());
                    localStorage.removeItem("token");
                }
            }
            return result;
        } catch (error) {
            // we will handle this if needed to handle the error
            !appConfig.is_production && console.error("BaseQuery Error:", error);
            return {
                error: {
                    status: "FETCH_ERROR",
                    message: error instanceof Error ? error.message : error,
                },
            }
        }
    },
    tagTypes: ["conversations", "conversation", "messages"],
    endpoints: (builder) => ({}),
});

export default apiSlice;