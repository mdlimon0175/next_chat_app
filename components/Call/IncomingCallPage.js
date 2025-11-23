"use client"
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CallData from "enum/CallData";
import { useCallContext } from "contexts/CallContext";
import { useSocketContext } from "contexts/SocketContext";

import CallLocalVideo from "./CallLocalVideo";
import CallRemoteVideo from "./CallRemoteVideo";

export default function IncomingCallPage() {
    const {localRef, remoteRef} = useIncomingCall();

    return (
        <>
            <CallLocalVideo ref={localRef} />
            <CallRemoteVideo ref={remoteRef} />
        </>
    )
}

const delay = 5000;
function useIncomingCall() {
    const localRef = useRef(null);
    const remoteRef = useRef(null);
    const timeoutRef = useRef(null);
    const router = useRouter();
    const hasReceivedCalled = useRef(null);
    const { socket, isSocketReady } = useSocketContext();
    const { streamHandler, peerConnection, stopStream } = useCallContext();

    useEffect(() => {
        const receiveCall = async () => {
            peerConnection.createPeer();

            const stream = await streamHandler();
            if(stream) {
                if(localRef.current) {
                    localRef.current.srcObject = stream;
                    localRef.current.onloadedmetadata = () => {
                        localRef.current.play()
                    }
                }
            }

            const call_id = localStorage.getItem(CallData.CALL_ID);
            const caller_id = localStorage.getItem(CallData.PARTNER_ID);
            if(!hasReceivedCalled.current) {
                socket.emit('call_joined', {
                    call_id,
                    caller_id,
                });
                hasReceivedCalled.current = true;
            }
        }

        const callOfferHandler = async (offer) => {
            await peerConnection.setPeerRemoteDescription(offer);

            // remote stream
            const remoteStream = peerConnection.getRemoteStream();
            if(remoteRef.current && remoteStream) {
                remoteRef.current.srcObject = remoteStream;
                remoteRef.current?.play();
            }
            // local offer
            const answer = await peerConnection.makePeerAnswer();
            return answer;
        }

        const iceCandidateHandler = (socketData) => {
            peerConnection.addIceCandidate(socketData.data.candidate);
        }

        const partnerRejoinHandler = async (socketData, cb) => {
            const { data } = socketData || {};
            peerConnection.closePeer();
            peerConnection.createPeer();

            const answer = await callOfferHandler(data.offer);
            cb(answer);
        }

        const onReceiveCallOfferSdp = async (socketData, cb) => {
            const { data } = socketData || {};
            const answer = await callOfferHandler(data.offer);
            cb(answer);
        }

        if(isSocketReady) {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            receiveCall();
            socket.on('caller_offer_sdp', onReceiveCallOfferSdp);
            socket.on('caller_rejoin_offer_sdp', partnerRejoinHandler);
            socket.on('ice_candidate', iceCandidateHandler);
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
                socket.off('caller_offer_sdp', onReceiveCallOfferSdp);
                socket.off('caller_rejoin_offer_sdp', partnerRejoinHandler);
                socket.off('ice_candidate', iceCandidateHandler);
            }
        }
    }, [isSocketReady, socket, peerConnection, streamHandler, stopStream, router])

    return {localRef, remoteRef}
}