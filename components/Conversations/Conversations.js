"use client";
import { Suspense } from "react";
import { Virtuoso } from "react-virtuoso";
import { useDispatch, useSelector } from "react-redux";
import conversationsApi, {
    useGetConversationsQuery,
} from "@/lib/features/conversations/conversationsApi";

import Conversation from "./Conversation";
import ConversationsHeader from "../Header/ConversationsHeader";
import { ConversationLoading } from "../utils/ui/loaders/Loading";
import useConversationIdParam from "hooks/useConversationIdParam";

export default function Conversations() {
    return (
        <Suspense>
            <ConversationsWrapper>
                <ConversationsHeader />
                <div className="h-[calc(100vh_-_148px)] text-charcoaltext dark:text-dawn">
                    <Suspense>
                        <RenderConversations />
                    </Suspense>
                </div>
            </ConversationsWrapper>
        </Suspense>
    );
}

function ConversationsWrapper({ children }) {
    const conversation_id = useConversationIdParam();
    return (
        <div className={`${conversation_id ? "hidden" : "block"} sm:block col-span-12 sm:col-span-4 md:col-span-3 border-r c_border bg-softgray dark:bg-charcoal default_transition`}>
            {children}
        </div>
    )
}

function ConversationMessage({ message }) {
    return (
        <div className="px-2 py-4">
            <span>{message}</span>
        </div>
    )
}

function RenderConversations() {
    const dispatch = useDispatch();
    const conversation_id = useConversationIdParam();
    const auth_id = useSelector((state) => state.auth?.user?.id) || null;
    const {
        data,
        isLoading,
        isError,
    } = useGetConversationsQuery();
    const { data: { conversations, pagination } = {} } = data || {};

    const nextPage = () => {
        if(pagination.pages > pagination.currentPage) {
            dispatch(
                conversationsApi
                .endpoints
                .getConversations
                .initiate({
                    page: pagination.currentPage + 1
                })
            );
        }
    }

    const renderConversation = () => {
        if (isLoading || !auth_id) {
            return (
                <>
                    <ConversationLoading />
                    <ConversationLoading />
                </>
            );
        }
        if (isError) {
            return <ConversationMessage message={"Something went wront! Try again later."} />;
        }
        if (!conversations || conversations.length < 1) {
            return <ConversationMessage message={"No conversation is available."} />;
        }
        return (
            <Virtuoso
                data={conversations}
                itemContent={(_, conversation) => (
                    <Conversation 
                        data={conversation}
                        auth_id={auth_id}
                        is_active={conversation_id === conversation.id}
                    />
                )}
                className="custom_scrollbar_y"
                endReached={nextPage}
                computeItemKey={(_, conversation) => conversation.id}
                components={{
                    Header: () =>
                        isLoading ? (
                            <span className="data_loading_text">Loading...</span>
                        ) : null,
                }}
            />
        )
    }

    return renderConversation();
}