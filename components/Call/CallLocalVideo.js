"use client"
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { useSearchParams } from "next/navigation";

import MediaType from "enum/MediaType";
import { checkBoolString } from "../utils/Helper";
const CallPageUserPhoto = dynamic(
    () => import("../utils/ui/images/CallPageUserPhoto")
)

function CallLocalVideo(_, ref) {
    const searchParams = useSearchParams();

    return (
        <div
            className="absolute z-30 bg-dawn dark:bg-midnight bottom-6 right-6 w-32 h-32 lg:w-40 lg:h-40 rounded-md border-2 border-slategray dark:border-bordergray shadow-lg overflow-hidden">
            {checkBoolString(searchParams.get(MediaType.VIDEO)) && <CallPageUserPhoto />}
            <video
                ref={ref}
                className="size-full object-cover"
            ></video>
        </div>
    );
}

export default forwardRef(CallLocalVideo);