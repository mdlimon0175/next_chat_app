"use client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import CallData from "enum/CallData";
import appConfig from "@/config/config";
import CallStatus from "enum/CallStatus";
import { initSocket } from "@/config/socket";
import { userLogout } from "@/lib/features/auth/authSlice";
import { activeCall, endCall } from "@/lib/features/call/callSlice";

const socketContext = createContext(null);
export function useSocketContext() {
    const context = useContext(socketContext);
    if (!context) {
        throw new Error(
            "useSocketContext must be used within a SocketContextProvider"
        );
    }
    return context;
}

export default function SocketContextProvider({ children }) {
    const router = useRouter();
    const socketRef = useRef(null);
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();
    const [isSocketReady, setIsSocketReady] = useState(false);
    const isLoggedIn = useSelector(state => state.auth.loggedIn);

    const clearSocketInstance = useCallback(() => {
        if(socketRef.current) {
            if(socketRef.current.connected) {
                socketRef.current.disconnect();
            }
        }
        setIsSocketReady(false);
        socketRef.current = null;
    }, [])

    useEffect(() => {
        const clearLocalCallData = () => {
            Object.values(CallStatus).forEach(value => {
                localStorage.removeItem(value);
            })
            Object.values(CallData).forEach(value => {
                localStorage.removeItem(value);
            })
        }

        const callDataHandler = (socketData) => {
            const { data } = socketData;
            localStorage.setItem(CallStatus.ACTIVE_CALL, 'true');
            localStorage.setItem(CallData.CALL_ID, data.call_id);
            localStorage.setItem(CallData.ROOM_ID, data.room_id);
            localStorage.setItem(CallData.PARTNER_ID, data.partner.id);
            localStorage.setItem(CallData.PARTNER_USERNAME, data.partner.username);

            // auth checker to check user token validity during call
            const token = localStorage.getItem("token");
            if (token) {
                timeoutRef.current = setInterval(() => {
                    if(socketRef.current) {
                        socketRef.current.emit('auth_checker', token);
                    }
                }, 30000); // Send every 30 seconds
            }

            dispatch(activeCall(data));
        }

        const callEndHandler = (data) => {
            if(data.status) {
                toast(data.message);
            } else {
                toast.error(data.message);
            }
            const room_id = localStorage.getItem(CallData.ROOM_ID);
            router.push(`/?conversation_id=${room_id}`);
            dispatch(endCall());
            clearInterval(timeoutRef.current);
            clearLocalCallData();
        }

        const callErrorHandler = (err) => {
            toast.error(err.message);
            dispatch(endCall());
            clearLocalCallData();
            router.push("/");
            !appConfig.is_production && console.log('Socket/call request error: ', err);
        }

        const authErrorHandler = (status) => {
            if(status === 401) {
                clearSocketInstance();
                localStorage.removeItem("token");
                dispatch(userLogout());
                router.push('/auth/login');
            }
        }

        if(isLoggedIn) {
            if(!socketRef.current) {
                socketRef.current = initSocket();
            }

            socketRef.current.connect();
            socketRef.current.on('call_data', callDataHandler);
            socketRef.current.on('call_end', callEndHandler);
            socketRef.current.on('call_error', callErrorHandler);
            socketRef.current.on('connect', () => {
                setIsSocketReady(true);
            });
            socketRef.current.on('disconnect', (reason) => {
                !appConfig.is_production && console.log(reason);
                socketRef.current = null;
                if(isSocketReady) {
                    setIsSocketReady(false);
                }
            });
            socketRef.current.on('connect_error', (err) => {
                if(err.data) {
                    const { status, message } = err.data.error || {};
                    toast.error(message);
                    authErrorHandler(status);
                }
                !appConfig.is_production && console.log(err.message);
            })
            socketRef.current.on('auth_failed', (err) => {
                const { status, message } = err.data.error || {};
                toast.error(message);
                authErrorHandler(status);
            })
        }

        return () => {
            if(socketRef.current) {
                socketRef.current.off('disconnect');
                socketRef.current.off('auth_failed');
                socketRef.current.off('connect_error');
                socketRef.current.off('call_data', callDataHandler);
                socketRef.current.off('call_end', callEndHandler);
                socketRef.current.off('call_error', callErrorHandler);
                clearSocketInstance();
            }
        }
    }, [isLoggedIn])

    return <socketContext.Provider value={{
        socket: socketRef.current,
        isSocketReady,
        clearSocketInstance,
    }}>
        {children}
    </socketContext.Provider>;
}