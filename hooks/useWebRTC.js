"use client"
import { useRef } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import CallData from "enum/CallData";
import MediaType from "enum/MediaType";
import StreamType from "enum/StreamType";
import { getSocket } from "@/config/socket";
import { toggleRemoteStream } from "@/lib/features/call/callSlice";

export default function useWebRTC() {
    const dispatch = useDispatch();
    const peerConnectionRef = useRef(null);
    const peerConnection = useRef(null);
    const iceCandidates = useRef(null);
    const remoteStreamRef = useRef(null);
    const pendingRemoteCandidates = useRef(null);

    if(!peerConnectionRef.current) {
        peerConnectionRef.current = {
            createPeer: () => {
                if(peerConnection.current) return;
                peerConnection.current = new RTCPeerConnection();

                peerConnection.current.onicecandidate = e => {
                    if(e.candidate) {
                        if(!iceCandidates.current) {
                            iceCandidates.current = [];
                        }
                        iceCandidates.current.push(e.candidate);
                    }
                }

                peerConnection.current.onicegatheringstatechange = e => {
                    if(peerConnection.current.iceGatheringState === "complete" && iceCandidates.current) {
                        const length = iceCandidates.current.length;
                        const call_id = localStorage.getItem(CallData.CALL_ID);
                        const room_id = localStorage.getItem(CallData.ROOM_ID);
                        if(call_id && room_id) {
                            for(let i = 0; i < length; i++) {
                                const socket = getSocket();
                                socket.emit('ice_candidate', {
                                    call_id,
                                    room_id,
                                    candidate: iceCandidates.current[i]
                                });
                            }
                            iceCandidates.current = null;
                        }
                        // else we can inform user failed to exhange candidate for missing data
                    }
                }

                peerConnection.current.oniceconnectionstatechange = e => {
                    if(peerConnection.current.iceConnectionState === 'disconnected') {
                        const call_id = localStorage.getItem(CallData.CALL_ID);
                        const username = localStorage.getItem(CallData.PARTNER_USERNAME);
                        toast.error(`${username ?? "Partner"} disconnected`);

                        if(call_id) {
                            const socket = getSocket();
                            socket.emit('call_hangup', call_id);
                        }
                    }
                }

                peerConnection.current.ontrack = e => {
                    const [remoteStream] = e.streams;

                    const hasVideo = remoteStream.getVideoTracks().length > 0;
                    const hasAudio = remoteStream.getAudioTracks().length > 0;
                    if(remoteStream.active) {
                        const streamTypes = [];
                        if (hasVideo) streamTypes.push(StreamType.VIDEO);
                        if (hasAudio) streamTypes.push(StreamType.AUDIO);

                        if (streamTypes.length) {
                            dispatch(
                                toggleRemoteStream(streamTypes.length > 1 ?
                                    {type: streamTypes, value: true }
                                    :
                                    {type: streamTypes[0], value: true} 
                                )
                            );
                        }
                        remoteStreamRef.current = remoteStream;
                    }
                }
            },
            makePeerOffer: async () => {
                if(!peerConnection.current) return null;
                const offer = await peerConnection.current.createOffer();
                await peerConnection.current.setLocalDescription(offer);
                return offer;
            },
            makePeerAnswer: async () => {
                if(!peerConnection.current || !peerConnection.current.remoteDescription) return null;
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                return answer
            },
            setLocalDescription: async (offer) => {
                await peerConnection.current.setLocalDescription(offer);
            },
            setPeerRemoteDescription: async (answer) => {
                if(!answer) return;
                await peerConnection.current.setRemoteDescription(answer);

                const length = pendingRemoteCandidates.current && pendingRemoteCandidates.current.length;
                if(length) {
                    for(let i = 0; i < length; i++) {
                        addIceCandidate(pendingRemoteCandidates.current[i]);
                    }
                    pendingRemoteCandidates.current = null;
                }
            },
            getRemoteStream: () => {
                return remoteStreamRef.current;
            },
            getPeerConnectionsState: () => {
                return {
                    connectionState: peerConnection.current.connectionState,
                    iceConnectionState: peerConnection.current.iceConnectionState,
                    iceGatheringState: peerConnection.current.iceGatheringState,
                    signalingState: peerConnection.current.signalingState
                }
            },
            addIceCandidate: (candidate) => {
                if(candidate) {
                    if(peerConnection.current.remoteDescription) {
                        peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                    } else {
                        if(!pendingRemoteCandidates.current) {
                            pendingRemoteCandidates.current = [];
                        }
                        pendingRemoteCandidates.current.push(candidate);
                    }
                }
            },
            addPeerTracks: (localStream, video_muted = false, audio_muted = false) => {
                if(!peerConnection.current) return;
                peerConnection.current.getSenders().forEach(sender => {
                    peerConnection.current.removeTrack(sender);
                });

                if(video_muted && audio_muted) return

                if (!video_muted && !audio_muted) {
                    localStream.getTracks().forEach(track => {
                        peerConnection.current.addTrack(track, localStream);
                    });
                } else if(!video_muted && audio_muted) {
                    localStream.getVideoTracks().forEach(track => {
                        peerConnection.current.addTrack(track, localStream);
                    });
                } else if(video_muted && !audio_muted) {
                    localStream.getAudioTracks().forEach(track => {
                        peerConnection.current.addTrack(track, localStream);
                    });
                }
            },
            toggleTrack: (type, value) => {
                if(!peerConnection.current) return;
                peerConnection.current.getSenders().forEach(sender => {
                    if (sender.track) {
                        if(type === MediaType.VIDEO && sender.track.kind === "video") {
                            sender.track.enabled = value;
                        }
                        if(type === MediaType.AUDIO && sender.track.kind === "audio") {
                            sender.track.enabled = value;
                        }
                    }
                });
            },
            closePeer: () => {
                if(peerConnection.current) {
                    peerConnection.current.close();
                    peerConnection.current = null;
                    iceCandidates.current = null;
                }
            }
        }
        // getIceCandidates: () => {
        //     return iceCandidates.current;
        // },
        // clearIceCandidates: () => {
        //     iceCandidates.current = null;
        // },
    }

    return peerConnectionRef.current
}
