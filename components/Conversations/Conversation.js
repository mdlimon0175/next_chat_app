/*
// Title: App conversation
// Description: Application single conversation component.
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 1.0
// Date: 7/10/2024
*/

import Link from "next/link";
import { memo, useMemo } from "react";

import { conversationPartnerInfo } from "../utils/Helper";
import RoundUserImage from "../utils/ui/images/RoundUserImage";

function Conversation({ data, auth_id, is_active }) {
    const { id, participants, last_message} = data || {};
    const sent_at_from_now = useMemo(() => {
        if(!last_message) return "";
        const diff = (Date.now() - new Date(last_message.sent_at).getTime()) / 1000;
        if (diff < 60) return `${Math.floor(diff)}s`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
        if (diff < 525600) return `${Math.floor(diff / 86400)}d`;
        return `${Math.floor(diff / 525600)}y`;
    }, [last_message])

    const {
        username: partnerName,
        profile_picture_icon
    } = conversationPartnerInfo(participants, auth_id)

    return (
        <div className="c_border border-b">
            <Link href={`/?conversation_id=${id}`} className={`${is_active ? "conversation_active_bg" : "conversation_bg"} conversation`}>
                <RoundUserImage image={profile_picture_icon} />
                <div className="w-full overflow-hidden">
                    <div>
                        <span className="conversation_span truncate font-semibold">{partnerName}</span>
                    </div>
                    <div className="flex justify-between space-x-2">
                        {last_message ? (
                            <>
                                <span className="conversation_span truncate">
                                    {auth_id === last_message.sender_id ? 
                                        `you: ${last_message.message}` 
                                        : last_message.message
                                    }
                                </span>
                                <span className="conversation_span">
                                    {sent_at_from_now}
                                </span>
                            </>) : <span>New connection</span>
                        }
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default memo(Conversation);