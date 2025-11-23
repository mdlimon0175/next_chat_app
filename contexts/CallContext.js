"use client"
import { useDispatch } from "react-redux";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import MediaType from "enum/MediaType";
import StreamType from "enum/StreamType";

import useWebRTC from "hooks/useWebRTC";
import { getSocket } from "@/config/socket";
import useMediaStream from "hooks/useMediaStream";
import { toggleRemoteStream } from "@/lib/features/call/callSlice";
import { checkBoolString, defaultMediaQueryString } from "@/components/utils/Helper";

const CallContext = createContext(null);

export function useCallContext() {
    const context = useContext(CallContext);
    if (!context) {
        throw new Error(
            "useCallContext must be used within a CallContextProvider"
        );
    }
    return context;
}

export default function CallContextProvider({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const peerConnection = useWebRTC();
    const searchParams = useSearchParams();
    const { setupStream, stopStream } = useMediaStream();
    const [streamError, setStreamError] = useState(false);

    const streamHandler = useCallback(async () => {
        const stream = await setupStream();
        if (stream) {
            peerConnection.addPeerTracks(stream);
            return stream;
        }

        // else
        setStreamError(true);
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set(MediaType.AUDIO, "true");
        params.set(MediaType.VIDEO, "true");
        router.push(`${pathname}?${params.toString()}`);
        return null;
    }, [])

    const handleMediaQuery = (type) => {
        const param = searchParams.get(type);
        const value = !checkBoolString(param); // toggle the value
        /**
        * peerConnection.toggleTrack(type, !value)
        * @note // toggle the value cause on param get track muted value. 
        * so, if muted false mean track is active.
        * here, track = video or audio
        */
        peerConnection.toggleTrack(type, !value);
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set(type, value.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        const video = searchParams.get(MediaType.VIDEO);
        const audio = searchParams.get(MediaType.AUDIO);

        if(!video || !audio) {
            router.push(`${pathname}?${defaultMediaQueryString()}`);
        }
    }, [])

    return (
        <CallContext.Provider
            value={{
                streamError,
                streamHandler,
                stopStream,
                peerConnection,
                handleMediaQuery,
            }}
        >
            <RemoteStreamHandler />
            {children}
        </CallContext.Provider>
    );
}

function RemoteStreamHandler() {
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = getSocket();
        const toggleAudioHandler = (socketData) => {
            const { data } = socketData || {};
            dispatch(toggleRemoteStream({type: StreamType.AUDIO, value: data.status}));
        }
        const toggleVideoHandler = (socketData) => {
            const { data } = socketData || {};
            dispatch(toggleRemoteStream({type: StreamType.VIDEO, value: data.status}));
        }

        socket.on('call_remote_video_stream_toggled', toggleVideoHandler);
        socket.on('call_remote_audio_stream_toggled', toggleAudioHandler);

        return () => {
            if(socket && socket.connected) {
                socket.off('call_remote_video_stream_toggled', toggleVideoHandler);
                socket.off('call_remote_audio_stream_toggled', toggleAudioHandler);
            }
        }
    }, [dispatch])

    return null;
}