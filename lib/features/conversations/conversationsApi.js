import appConfig from "@/config/config";
import apiSlice from "../api/apiSlice";
import { getSocket } from "@/config/socket";

const conversationsApi = apiSlice.injectEndpoints({
    overrideExisting: module.hot?.status() === "apply",
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: (arg) => {
                if (arg?.page) {
                    return `conversations?page=${arg.page}`;
                }
                return "conversations";
            },
            providesTags: ["conversations"],
            onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled.then(result => {
                    const { conversations, pagination } = result.data.data || {};
                    if(pagination.currentPage > 1) {
                        dispatch(
                            apiSlice.util.updateQueryData('getConversations', {}, draft => {
                                const mergedConversations = draft.data.conversations.concat(conversations);
                                const uniqueConversations = Array.from(new Map(mergedConversations.map(c => [c.id, c])).values());

                                return {
                                    ...draft,
                                    data: {
                                        ...draft.data,
                                        conversations: uniqueConversations,
                                        pagination
                                    }
                                }
                            })
                        );
                    }
                }).catch(error => {
                    !appConfig.is_production && console.log("Conversations get query error, ", error);
                    dispatch(apiSlice.util.invalidateTags(['conversations']))
                    // we will handle this later if needed to handle.
                })
            },
            onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                let socket;
                const hadnleNewConversation = data => {
                    updateCachedData((draft) => {
                        let draftedIndex = -1;
                        const draftLength = draft.data.conversations.length;
                        for(let i = 0; i < draftLength; i++) {
                            if(draft.data.conversations[i].id == data.conversation.id) {
                                draftedIndex = i;
                                break;
                            }
                        }

                        if(draftedIndex > -1) {
                            const { message, sent_at, sender_id } = data.message || {};
                            const conversation = draft.data.conversations.splice(draftedIndex, 1)[0];
                            conversation.last_message.message = message;
                            conversation.last_message.sent_at = sent_at;
                            conversation.last_message.sender_id = sender_id;
                            draft.data.conversations.unshift(conversation);
                        } else {
                            draft.data.conversations.unshift(data.conversation);
                        }
                    });
                }

                const handleNewMessage = data => {
                    updateCachedData((draft) => {

                        let draftedIndex = -1;
                        const draftLength = draft.data.conversations.length;
                        for(let i = 0; i < draftLength; i++) {
                            if(draft.data.conversations[i].id == data.conversation_id) {
                                draftedIndex = i;
                                break;
                            }
                        }

                        if (draftedIndex > -1) {
                            const { message, sent_at, sender_id } = data;
                            const conversation = draft.data.conversations.splice(draftedIndex, 1)[0];
                            conversation.last_message.message = message;
                            conversation.last_message.sent_at = sent_at;
                            conversation.last_message.sender_id = sender_id;
                            draft.data.conversations.unshift(conversation);
                        }
                    });
                }

                Promise.race([
                    cacheDataLoaded,
                    cacheEntryRemoved
                ]).then((result) => {
                    if (result && result.meta.response.status === 200) {
                        socket = getSocket();
                        socket.on("add_message", handleNewMessage);
                        socket.on("add_conversation", hadnleNewConversation);
                    }
                })
                .catch((error) => {
                    !appConfig.is_production && console.log("Conversations get cache error, ", error);
                });

                cacheEntryRemoved.then(() => {
                    if (socket) {
                        socket.off("add_message", handleNewMessage);
                        socket.off("add_conversation", hadnleNewConversation);
                    }
                })
            },
        }),
        getConversation: builder.query({
            query: (id) => `conversations/${id}`,
            providesTags: ['conversation'],
        }),
        addConversation: builder.mutation({
            query: (data) => ({
                url: "conversations",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationQuery,
    useAddConversationMutation
} = conversationsApi;
export default conversationsApi;
