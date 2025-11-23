"use client"
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import CallData from "enum/CallData";
import { useSocketContext } from "contexts/SocketContext";
import { defaultMediaQueryString } from "../utils/Helper";

export default function IncomingCallModal() {
    const { socket, isSocketReady } = useSocketContext();
    const router = useRouter();
    const responsedRef = useRef(null);
    const callResponseRef = useRef(null);
    const [partnerUsername, setPartnerUsername] = useState("");
    const [incomingCall, setIncomingCall] = useState(false);
    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    useEffect(() => {
        const incomingCallHandler = (socketData, cb) => {
            const { data } = socketData || {};
            callResponseRef.current = cb;
            setPartnerUsername(data.from);
            localStorage.setItem(CallData.ROOM_ID, data.room_id);
            
            setIncomingCall(true);
            const timeout = data.timeout ?? 10000;
            setTimeout(() => {
                if (!responsedRef.current && callResponseRef.current) {
                    callResponseRef.current({ status: false, data: null, error: "Not responsed" });
                    localStorage.removeItem(CallData.ROOM_ID);
                    setIncomingCall(false);
                }
            }, timeout);
        }

        if(isLoggedIn && isSocketReady) {
            socket.on("call_incoming", incomingCallHandler);
        }

        return () => {
            if(socket && socket.connected) {
                socket.off("call_incoming", incomingCallHandler);
            }
        }
    }, [isLoggedIn, isSocketReady, socket])

    const handleCallResponse = (accepted) => {
        if (!accepted) {
            callResponseRef.current({
                status: false,
                data: null,
                error: null
            });
            localStorage.removeItem(CallData.ROOM_ID);
        } else {
            callResponseRef.current({
                status: true,
                data: {
                    socket_id: socket.id,
                },
                error: null
            });
            router.push(`/call/incoming/${localStorage.getItem('room_id')}?${defaultMediaQueryString()}`);
        }

        responsedRef.current = true;
        callResponseRef.current = null;
        setIncomingCall(false);
    }

    return isLoggedIn && incomingCall ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[120]">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                <h2 className="text-xl font-semibold mb-2">Incoming Call</h2>
                <p className="text-gray-700 mb-4">
                    {partnerUsername || "Someone try to call"}
                </p>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={() => handleCallResponse(true)}
                        className="flex-1 bg-green-400 hover:bg-green-500 text-white rounded-xl py-2"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => handleCallResponse(false)}
                        className="flex-1 bg-red-400 hover:bg-red-500 text-white rounded-xl py-2"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}
