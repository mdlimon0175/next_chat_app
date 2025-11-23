import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

const CallPageRemoteUserPhoto = dynamic(
    () => import("../utils/ui/images/CallPageRemoteUserPhoto")
);

function CallRemoteVideo(_, ref) {
    const { video } = useSelector(state => state.call.remote_stream);

    return (
        <div className="relative size-full bg-dawn dark:bg-midnight">
            {!video && <CallPageRemoteUserPhoto />}
            <video ref={ref} className="size-full object-cover"></video>
        </div>
    );
}

export default forwardRef(CallRemoteVideo);