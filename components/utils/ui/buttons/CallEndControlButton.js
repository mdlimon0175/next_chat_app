"use client"
import { useSelector } from "react-redux";
import { useSocketContext } from "contexts/SocketContext";

import PhoneCutIcon from "../icons/PhoneCutIcon";

export default function CallEndControlButton() {
    const { socket } = useSocketContext();
    const call_id = useSelector(state => state.call.call_id);

    const callEndHandler = () => {
        socket.emit("call_hangup", call_id);
    }

    return (
        <button
            onClick={callEndHandler}
            disabled={!call_id}
            className="call_end_btn"
        >
            <span className="flex items-center justify-center">
                <PhoneCutIcon className={"icon text-dawn"} />
            </span>
        </button>
    );
}
