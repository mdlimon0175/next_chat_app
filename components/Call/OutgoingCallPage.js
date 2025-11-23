"use client"
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

import CallData from "enum/CallData";
import { useCallContext } from "contexts/CallContext";
import { useSocketContext } from "contexts/SocketContext";

import CallLocalVideo from "./CallLocalVideo";
import CallRemoteVideo from "./CallRemoteVideo";
import { defaultMediaQueryString } from "../utils/Helper";

const delay = 5000;
export default function OutgoingCallPage() {
    const {localRef, remoteRef} = useOutgoingCall();
    return (
        <>
            <CallLocalVideo ref={localRef} />
            <CallRemoteVideo ref={remoteRef} />
        </>
    )
}

function useOutgoingCall() {
    const localRef = useRef(null);
    const remoteRef = useRef(null);
    const timeoutRef = useRef(null);
    const router = useRouter();
    const { conversation_id } = useParams();
    const { socket, isSocketReady } = useSocketContext();
    const { streamHandler, peerConnection, stopStream } = useCallContext();
    const hasCalled = useRef(null);

    useEffect(() => {
        const callUser = async () => {
            peerConnection.createPeer();
            const stream = await streamHandler();
            if(stream) {
                if(localRef.current) {
                    localRef.current.srcObject = stream;
                    localRef.current.onloadedmetadata = () => {
                        localRef.current?.play();
                    }
                }
            }

            if(!hasCalled.current) {
                socket.emit('call_outgoing', conversation_id);
                hasCalled.current = true;
                localStorage.setItem(CallData.ROOM_ID, conversation_id);
            }
        }

        const onRejoinCallHandler = async (socketData) => {
            const { data } = socketData || {};
            if(data.room_id === conversation_id) {
                const { connectionState } = peerConnection.getPeerConnectionsState();
                if(connectionState === 'connected') {
                    peerConnection.closePeer();
                    peerConnection.createPeer();
                    await streamHandler();
                }
                const offer = await peerConnection.makePeerOffer();
                socket.emit('call_offer_sdp', {
                    offer,
                    room_id: conversation_id,
                    rejoin: true
                });
            } else {
                router.push(`/call/outgoing/${data.room_id}?${defaultMediaQueryString()}`)
            }
        }

        const onCalleeJoinedHandler = async (socketData) => {
            const offer = await peerConnection.makePeerOffer();
            socket.emit('call_offer_sdp', {
                offer,
                room_id: conversation_id
            });
        }

        const onReceiveCallAnswerSdp = async (socketData) => {
            const { data } = socketData || {};
            if(data) {
                await peerConnection.setPeerRemoteDescription(data.answer);
                const remoteStream = peerConnection.getRemoteStream();
                if(remoteRef.current && remoteStream) {
                    remoteRef.current.srcObject = remoteStream;
                    remoteRef.current.play();
                }
            }
        }

        const iceCandidateHandler = (socketData) => {
            peerConnection.addIceCandidate(socketData.data.candidate);
        }

        if(isSocketReady) {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            callUser();
            socket.on('rejoin_exist_call', onRejoinCallHandler);
            socket.on('callee_answer_sdp', onReceiveCallAnswerSdp);
            socket.on('ice_candidate', iceCandidateHandler);
            socket.on('callee_joined', onCalleeJoinedHandler);
        } else {
            timeoutRef.current = setTimeout(() => {
                toast.error('Something went wrong!');
                router.push('/');
            }, delay)
        }

        return () => {
            stopStream();
            peerConnection.closePeer();
            if(socket && socket.connected) {
                socket.off('rejoin_exist_call', onRejoinCallHandler);
                socket.off('callee_answer_sdp', onReceiveCallAnswerSdp);
                socket.off('ice_candidate', iceCandidateHandler);
                socket.off('callee_joined', onCalleeJoinedHandler);
            }
        }
    }, [isSocketReady, socket, peerConnection, streamHandler, stopStream, conversation_id, router])

    return {localRef, remoteRef}
}