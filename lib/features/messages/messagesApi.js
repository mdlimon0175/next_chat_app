import appConfig from "@/config/config";
import apiSlice from "../api/apiSlice";
import { getSocket } from "@/config/socket";

const messagesApi = apiSlice.injectEndpoints({
    overrideExisting: module.hot?.status() === "apply",
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (param) => {
                if (param?.page) {
                    return `messages/c/${param.conversation_id}?page=${param.page}`;
                }
                return `messages/c/${param.conversation_id}`;
            },
            providesTags: ['messages'],
            onQueryStarted(param, { dispatch, queryFulfilled }) {
                queryFulfilled.then(result => {
                    const { messages, pagination } = result.data.data || {};
                    if(pagination.currentPage > 1) {
                        dispatch(
                            apiSlice.util.updateQueryData('getMessages', { conversation_id: param.conversation_id }, draft => {
                                const mergedMessages = messages.concat(draft.data.messages);
                                const uniqueMessages = Array.from(new Map(mergedMessages.map(m => [m.id, m])).values());

                                return {
                                    ...draft,
                                    data: {
                                        ...draft.data,
                                        messages: uniqueMessages,
                                        pagination
                                    }
                                }
                            })
                        );
                    }
                }).catch(error => {
                    !appConfig.is_production && console.log("Messages get query error, ", error);
                    dispatch(apiSlice.util.invalidateTags(['messages']))
                    // we will handle this later if needed to handle.
                })
            },
            onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                let socket;
                const handleNewMessage = data => {
                    updateCachedData((draft) => {
                        draft.data.messages.push(data);
                        draft.data.pagination.total += 1;
                    });
                }

                const handleNewConversation = data => {
                    updateCachedData((draft) => {
                        draft.data.messages.push(data.message);
                    });
                }
                cacheDataLoaded.then((result) => {
                    if (result.meta.response.status === 200) {
                        socket = getSocket();
                        socket.on("add_message", handleNewMessage);
                        socket.on("add_conversation", handleNewConversation);
                    }
                })
                .catch((error) => {
                    !appConfig.is_production && console.log("Messages cache loaded error, ", error)
                    // we will handle this later if needed to handle.
                });

                cacheEntryRemoved.then(() => {
                    if (socket) {
                        socket.off("add_message", handleNewMessage);
                        socket.off("add_conversation", handleNewConversation);
                    }
                })
                .catch((error) => {
                    !appConfig.is_production && console.log("Messages cache remove error, ", error)
                    // we will handle this later if needed to handle.
                });
            },
        }),
        sendMessage: builder.mutation({
            query: ({ id, data }) => ({
                url: `messages/c/${id}`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useSendMessageMutation, useGetMessagesQuery } = messagesApi;
export default messagesApi;