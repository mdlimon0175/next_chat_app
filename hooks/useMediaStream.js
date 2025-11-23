"use client"
import { useRef, useCallback } from "react";

import appConfig from "@/config/config";

export default function useMediaStream() {
    const streamRef = useRef(null);
    
    const setupStream = useCallback(async () => {
        try {
            if(streamRef.current) return streamRef.current;
            streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            return streamRef.current;
        } catch (error) {
            !appConfig.is_production && console.error("Failed to get media : ", error);
            return null;
        }
    }, [])

    const stopStream = useCallback(() => {
        if (streamRef.current instanceof MediaStream) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    }, [])

    return {
        setupStream,
        stopStream
    }
}