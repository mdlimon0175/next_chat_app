import dynamic from "next/dynamic";

import CallHeader from "@/components/Call/CallHeader";
const CallContextProvider = dynamic(() => import("contexts/CallContext"));
import CallPartnerUsername from "@/components/Call/CallPartnerUsername";
import AudioControlButton from "@/components/utils/ui/buttons/AudioControlButton";
import VideoControlButton from "@/components/utils/ui/buttons/VideoControlButton";
import CallEndControlButton from "@/components/utils/ui/buttons/CallEndControlButton";

export const metadata = {
    title: "Call",
    description: "Real-time chat & calling app with webRTC and socket.io"
}

export default function CallLayout({ children }) {
    return (
        <div className="bg-dawn dark:bg-midnight text-charcoaltext dark:text-dawn">
            <CallContextProvider>
                <div className="w-full h-screen flex flex-col">
                    <CallHeader />
                    <div className="flex-1 relative bg-black overflow-hidden">
                        {children}
                        <CallPartnerUsername />
                    </div>
                    <div className="flex justify-center gap-4 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-slategray">
                        <AudioControlButton />
                        <VideoControlButton />
                        <CallEndControlButton />
                    </div>
                </div>
            </CallContextProvider>
        </div>
    )
}
