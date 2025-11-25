import { forwardRef, useEffect, useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import messagesApi, {
    useGetMessagesQuery,
} from "@/lib/features/messages/messagesApi";
import useConversationIdParam from "hooks/useConversationIdParam";

export default function Messages({ conversation_id }) {
    const auth_id = useSelector((state) => state.auth?.user?.id) || null;
    const { data, isLoading, isError } = useGetMessagesQuery({conversation_id});
    const { data: {messages, pagination} = {}} = data || {};

    const renderMessages = () => {
        if (isLoading || !auth_id) {
            return (
                <MessagesSectionMessage message={"Loading..."} />
            )
        } else if (isError) {
            return (
                <MessagesSectionMessage message={"Something went wrong!"} />
            )
        }
        if (messages && messages.length === 0) {
            return (
                <MessagesSectionMessage message={"No messages yet! Say something to start the conversation."} />
            )
        }

        return (
            <MessagesVirtualization 
                auth_id={auth_id}
                messages={messages}
                pages={pagination.pages}
                total={pagination.total}
                current_page={pagination.currentPage}
            />
        );
    }

    return (
        <div className="w-full py-6">
            {renderMessages()}
        </div>
    );
}

function MessagesSectionMessage({ message }) {
    return (
        <div className="flex items-center justify-center size-full px-6">
            <span className="data_loading_text">{message}</span>
        </div>
    )
}

function MessagesVirtualization({ auth_id, messages = [], total, pages, current_page }) {
    const messages_length = messages.length;
    const dispatch = useDispatch();
    const virtuosoRef = useRef(null);
    const pageChangeRef = useRef(false);
    const conversation_id = useConversationIdParam();

    useEffect(() => {
        if(pageChangeRef.current) {
            pageChangeRef.current = false;
            return
        }
        if (virtuosoRef.current) {
            setTimeout(() => {
                virtuosoRef.current.scrollToIndex(messages_length - 1);
            }, 0);
        }
    }, [messages_length])

    const nextPage = () => {
        if(pages > current_page) {
            pageChangeRef.current = true;
            dispatch(
                messagesApi
                .endpoints
                .getMessages
                .initiate({
                    conversation_id,
                    page: current_page + 1
                })
            );
        }
    }

    const renderMessage = (_, message) => {
        return (
            <Message
                data={message}
                is_sender={auth_id === message.sender_id}
            />
        )
    }

    const renderList = forwardRef(({ children, ...props }, ref) => {
        return (
            <div ref={ref} className="px-6" {...props}>
                {children}
            </div>
        )
    })

    const renderHeader = () => {
        if(total === messages.length) return null
        return <span className="data_loading_text text-dawn">Loading...</span>
    }
                    

    return (
        <Virtuoso
            ref={virtuosoRef}
            data={messages}
            className="size-full custom_scrollbar_y"
            firstItemIndex={total > messages_length ? total - messages_length : 0}
            initialTopMostItemIndex={messages_length}
            startReached={nextPage}
            itemContent={renderMessage}
            computeItemKey={(_, message) => message.id}
            components={{
                List: renderList,
                Header: renderHeader,
            }}
        />
    )
}