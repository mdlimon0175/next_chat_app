"use client"
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import CallData from "enum/CallData";
import MediaType from "enum/MediaType";
import StreamType from "enum/StreamType";

import { getSocket } from "@/config/socket";
import { useCallContext } from "contexts/CallContext";
import VideoCameraIcon from "../icons/VideoCameraIcon";
import { checkBoolString } from "@/components/utils/Helper";
import CallStreamErrorModal from "../../../Modal/CallStreamErrorModal";

export default function VideoControlButton() {
    const searchParams = useSearchParams();
    const { streamError, handleMediaQuery } = useCallContext();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const video_muted = checkBoolString(searchParams.get(MediaType.VIDEO));

    const handleModal = () => {
        setShowErrorModal(false);
    }

    const handleVideoStreamToggle = () => {
        if(streamError) {
            setShowErrorModal(true);
        } else {
            const socket = getSocket();
            handleMediaQuery(MediaType.VIDEO)

            const call_id = localStorage.getItem(CallData.CALL_ID);
            const room_id = localStorage.getItem(CallData.ROOM_ID);
            socket.emit('call_toggle_stream', {
                call_id,
                room_id,
                stream_type: StreamType.VIDEO,
                stream_status: video_muted
            });
        }
    }

    return (
        <>
            <button
                onClick={handleVideoStreamToggle}
                className={`size-12 border-none outline-none rounded-full ${
                    streamError
                        ? "bg-red-400 text-dawn"
                        : "bg-gray-200 dark:bg-slategray hover:bg-bordergray dark:hover:bg-gray-600"
                }`}
            >
                <span className="relative flex items-center justify-center">
                    <VideoCameraIcon className={`${streamError ? "text-dawn" : "dark:text-dawn text-charcoaltext"} icon`} />
                    <span
                        className={`${
                            video_muted || streamError ? "scale-100" : "scale-0"
                        } ${streamError ? "bg-dawn" : "dark:bg-dawn bg-charcoaltext"} absolute rotate-[145deg] w-7 h-[1.5px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                    ></span>
                </span>
            </button>

            {showErrorModal ? (
                <CallStreamErrorModal
                    onClose={handleModal}
                    opened={showErrorModal}
                />) : null
            }
        </>
    )
}