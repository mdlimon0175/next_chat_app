"use client"

import { ConversationLoading } from "./Loading";
import useConversationIdParam from "hooks/useConversationIdParam";

export default function ConversationsLoader() {
    const conversation_id = useConversationIdParam();

    return (
        <div className={`${conversation_id ? "hidden" : "block"} parent_screen_without_nav_h sm:block animate-pulse col-span-12 sm:col-span-4 md:col-span-3 border-r c_border bg-softgray dark:bg-charcoal`}>
            <div className="h-[65px] p-4 border-b c_border flex md:justify-end justify-center items-center">
                <span className="h-4 w-1/2 rounded-full bg-gray-200"></span>
            </div>
            <ConversationLoading />
            <ConversationLoading />
        </div>
    )
}
