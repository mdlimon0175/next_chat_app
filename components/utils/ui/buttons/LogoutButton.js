"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import LogoutIcon from "../icons/LogoutIcon";
import { useSocketContext } from "contexts/SocketContext";
import { userLogout } from "@/lib/features/auth/authSlice";
import { useLogoutMutation } from "@/lib/features/auth/authApi";

export default function LogoutButton() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { clearSocketInstance } = useSocketContext();
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    const [logout, { isLoading, isSuccess }] = useLogoutMutation();

    useEffect(() => {
        if(isSuccess) {
            clearSocketInstance();
            dispatch(userLogout());
            localStorage.removeItem("token");
            router.push("/auth/login");
        }
    }, [isSuccess, clearSocketInstance, dispatch, router])

    return (
        isLoggedIn && <button
            type="button"
            onClick={logout}
            disabled={isLoading}
            className={"text-softgray text-sm sm:text-base dark:text-charcoaltext flex items-center"}
        >
            <span className="mr-1">
                <LogoutIcon className="text-softgray dark:text-charcoaltext size-5 sm:size-6" />
            </span>
            Log out
        </button>
    );
}
