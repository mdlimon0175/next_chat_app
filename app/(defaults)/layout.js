import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar/Navbar";
import { Loading } from "@/components/utils/ui/loaders/Loading";
const DefaultPageLayout = dynamic(() => import("@/components/Layout/DefaultPageLayout"), {
    ssr: false,
    loading: () => <Loading />
});

export default function PageLayout({ children }) {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <main className="max-w-7xl mx-auto parent_screen_without_nav_h">
                <div className="relative grid grid-cols-12 h-full">
                    <DefaultPageLayout>
                        {children}
                    </DefaultPageLayout>
                </div>
            </main>
        </>
    )
}
