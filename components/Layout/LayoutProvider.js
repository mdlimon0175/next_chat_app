"use client";
import { Provider } from "react-redux";

import store from "lib/app/store";
import { Suspense } from "react";

import { Loading } from "../utils/ui/loaders/Loading";
import { authApi } from "@/lib/features/auth/authApi";
import { userLogin } from "@/lib/features/auth/authSlice";
import ToastProvider from "./ToastProvider";
import SocketContextProvider from "contexts/SocketContext";

if(typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if(token) {
        store.dispatch(authApi.endpoints.checkUser.initiate()).then(result => {
            if(result.isError) {
                store.dispatch(userLogin(null));
                localStorage.removeItem("token");
            } else {
                store.dispatch(userLogin(result.data?.data));
            }
        });
    } else {
        store.dispatch(userLogin(null));
    }
}

export default function LayoutProvider({ children }) {
    return (
        <Provider className={"text-red-400"} store={store}>
            <Suspense fallback={<Loading />}>
                <SocketContextProvider>
                    <ToastProvider />
                    {children}
                </SocketContextProvider>
            </Suspense>
        </Provider>
    );
}