"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { notFound, useRouter } from "next/navigation";

import Blank from "./Blank";
import { conversationPartnerInfo } from "../utils/Helper";
const ChatHeader = dynamic(() => import("../Header/ChatHeader"));
const Messages = dynamic(() => import("../Messages/Messages"));
const MessageForm = dynamic(() => import("../Form/MessageForm"));
const RoundUserImage = dynamic(() => import("../utils/ui/images/RoundUserImage"));
import { useGetConversationQuery } from "@/lib/features/conversations/conversationsApi";

export default function Chat({ conversation_id }) {
    const router = useRouter();
    const auth_id = useSelector((state) => state.auth?.user?.id) || null;
    const { data, isLoading, isError, error } = useGetConversationQuery(conversation_id);
    const partnerInfo = useMemo(() => {
        if(!isLoading && !isError && data) {
            return conversationPartnerInfo(data.data.participants, auth_id);
        }
        return null;
    }, [auth_id, isLoading, isError, data]);

    useEffect(() => {
        if(isError) {
            if(error.status === 401) {
                router.push("/auth/login");
            }
            if(error.status === 404) {
                notFound();
            }
        }
    }, [isError, error, router])

    const renderChatbody = useMemo(() => {
        if (isLoading) {
            return <Blank message={"loading..."} />;
        } else if (isError) {
            return <Blank message={error.data.message} />;
        }

        return (
            <>
                <ChatHeader>
                    <RoundUserImage image={partnerInfo.partner_profile_icon} />
                    <PartnerUsernameText username={partnerInfo.username} />
                </ChatHeader>
                <Messages key={conversation_id} conversation_id={conversation_id} />
                <MessageForm
                    partner_id={partnerInfo.id}
                    conversation_id={conversation_id}
                />
            </>
        );
    }, [isLoading, isError, error, partnerInfo, conversation_id])

    return renderChatbody;
}

function PartnerUsernameText({username}) {
    return (
        <span className="conversation_span text-charcoaltext dark:text-dawn font-semibold">
            {username}
        </span>
    )
}