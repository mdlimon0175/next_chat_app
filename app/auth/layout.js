"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loading } from "@/components/utils/ui/loaders/Loading";

export default function AuthLayout({ children }) {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);
    const { loading, loggedIn: isLoggedIn} = useSelector((state) => state.auth);

    useEffect(() => {
        if(!loading) {
            if(isLoggedIn) {
                setPageLoading(true);
                router.push("/");
            } else {
                setPageLoading(false);
            }
        }
    }, [loading, isLoggedIn, router]);

    return (
        pageLoading ? <Loading /> : <div className="absolute top-0 left-0 z-50 size-full bg-dawn dark:bg-midnight">
            <div className="grid place-items-center h-screen">
                <div className="bg-white dark:bg-charcoal py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
