"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import apiSlice from "@/lib/features/api/apiSlice";
import { useSocketContext } from "contexts/SocketContext";
import { Loading } from "@/components/utils/ui/loaders/Loading";
import ConversationsLoader from "../utils/ui/loaders/ConversationsLoader";
const Conversations = dynamic(() => import("../Conversations/Conversations"), {
    loading: () => <ConversationsLoader />
});
const IncomingCallModal = dynamic(() => import("@/components/Modal/IncomingCallModal"));

export default function DefaultPageLayout({ children }) {
    const pageLoading = useDefaultLayout();

    return pageLoading ? (
        <Loading />
    ) : (
        <div className="col-span-full">
            <div className="grid grid-cols-12 h-full border-x c_border lg:mx-6">
                <IncomingCallModal />
                <Conversations />
                {children}
            </div>
        </div>
    );
}

function useDefaultLayout() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedInRef = useRef(false);
    const { clearSocketInstance } = useSocketContext();
    const [pageLoading, setPageLoading] = useState(true);
    const { loading, loggedIn: isLoggedIn} = useSelector((state) => state.auth);

    useEffect(() => {
        if(!loading) {
            if(isLoggedIn) {
                setPageLoading(false);
                isLoggedInRef.current = true;
            } else {
                setPageLoading(true);
                clearSocketInstance();
                router.push("/auth/login");
            }
        }

        return () => {
            if(isLoggedInRef.current) {
                isLoggedInRef.current = false;
                dispatch(apiSlice.util.resetApiState());
            }
        }
    }, [loading, isLoggedIn, router, dispatch, clearSocketInstance])

    return pageLoading;
}