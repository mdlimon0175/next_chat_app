"use client";
import { useEffect, useState } from "react";


import FlyingEnvelopeIcon from "../utils/ui/icons/FlyingEnvelopeIcon";
import { useSendMessageMutation } from "@/lib/features/messages/messagesApi";

export default function MessageForm({ partner_id, conversation_id }) {
    const [message, setMessage] = useState("");
    const [sendMessage, { isSuccess, isLoading }] = useSendMessageMutation();

    useEffect(() => {
        if (isSuccess) {
            setMessage("");
        }
    }, [isSuccess]);

    useEffect(() => {
        setMessage("");
    }, [conversation_id])

    const formHandler = (e) => {
        e.preventDefault();

        sendMessage({
            id: conversation_id,
            data: {
                message,
                receiver_id: partner_id,
            },
        });
    }

    return (
        <div className="flex items-center w-full p-3 border-t c_border">
            <form className="flex items-center w-full" onSubmit={formHandler}>
                <textarea
                    type="text"
                    placeholder="Message"
                    rows={1}
                    value={message ?? ""}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            formHandler(e);
                        }
                    }}
                    className="appearance-none block w-full py-2 pl-4 mx-3 bg-softgray dark:bg-charcoaltext text-charcoaltext dark:text-dawn rounded-md outline-none resize-none"
                    name="message"
                    required
                >
                    {message}
                </textarea>

                <div>
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center"
                        aria-label="Send message" 
                    >
                        <FlyingEnvelopeIcon className={"size-6 text-purple/90 dark:text-electric/90"} />
                    </button>
                </div>
            </form>
        </div>
    );
}
