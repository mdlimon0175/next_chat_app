"use client"
import { useRouter } from "next/navigation";

import { defaultMediaQueryString } from "../utils/Helper";
import ArrowLeftIcon from "../utils/ui/icons/ArrowLeftIcon";
import VideoCameraIcon from "../utils/ui/icons/VideoCameraIcon";
import useConversationIdParam from "hooks/useConversationIdParam";

export default function ChatHeader({ children }) {
    return (
        <div className="flex h-[65px] justify-between items-center p-3 border-b c_border">
            <div className="flex items-center space-x-3">
                <ChatBackButton />
                <div className="flex space-x-3 items-center">
                    {children}
                </div>
            </div>
            <ChatVideoCallButton />
        </div>
    );
}

function ChatBackButton() {
    const { push } = useRouter();
    return (
        <div className="flex sm:hidden items-center justify-center">
            <button
                type="button"
                className="outline-none border-none"
                onClick={() => push("/")}
            >
                <ArrowLeftIcon stroke={3} />
            </button>
        </div>
    )
}

function ChatVideoCallButton() {
    const { push } = useRouter();
    const conversation_id = useConversationIdParam();

    return (
        <div className="size-10 bg-purple rounded-full">
            <button 
                type="button"
                aria-label="Video call"
                onClick={() => push(`/call/outgoing/${conversation_id}?${defaultMediaQueryString()}`)}
                className="flex items-center justify-center size-full"
            >
                <VideoCameraIcon
                    className={"size-4 text-dawn"}
                />
            </button>
        </div>
    )
}