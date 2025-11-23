"use client"
import { useSearchParams } from "next/navigation";

import CallData from "enum/CallData";
import MediaType from "enum/MediaType";
import StreamType from "enum/StreamType";

import { getSocket } from "@/config/socket";
import MicroPhoneIcon from "../icons/MicroPhoneIcon";
import { useCallContext } from "contexts/CallContext";
import { checkBoolString } from "@/components/utils/Helper";

export default function AudioControlButton() {
    const searchParams = useSearchParams();
    const { handleMediaQuery } = useCallContext();
    const audio_muted = checkBoolString(searchParams.get(MediaType.AUDIO));

    const hadnleAudioStreamToggle = () => {
        const socket = getSocket();
        handleMediaQuery(MediaType.AUDIO)

        const call_id = localStorage.getItem(CallData.CALL_ID);
        const room_id = localStorage.getItem(CallData.ROOM_ID);
        socket.emit('call_toggle_stream', {
            call_id,
            room_id,
            stream_type: StreamType.AUDIO,
            stream_status: audio_muted
        });
    }

    return (
        <button
            onClick={hadnleAudioStreamToggle}
            className="size-12 border-none outline-none rounded-full bg-gray-200 dark:bg-slategray hover:bg-bordergray dark:hover:bg-gray-600"
        >
            <span className="relative flex items-center justify-center">
                <MicroPhoneIcon />
                <span
                    className={`${
                        audio_muted ? "scale-100" : "scale-0"
                    } absolute rotate-[145deg] w-7 h-[1.5px] top-1/2 left-1/2 -translate-x-1/2 dark:bg-dawn bg-charcoaltext`}
                ></span>
            </span>
        </button>
    );
}