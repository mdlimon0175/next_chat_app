"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const SendMessageModal = dynamic(() =>
    import("../Modal/SendMessageModal")
);
import PenSquareIcon from "../utils/ui/icons/PenSquareIcon";

export default function ConversationsHeader() {
    const [opened, setOpened] = useState(false);

    const closeModalHandler = () => {
        setOpened(false);
    };

    return (
        <div className="text-charcoaltext dark:text-dawn h-[65px] p-4 border-b c_border flex md:justify-end justify-center items-center">
            <button
                className="flex justify-center items-center"
                type="button"
                onClick={() => setOpened(true)}
            >
                <span className="mr-1">Send message</span>
                <PenSquareIcon />
            </button>
            {opened && <SendMessageModal opened={opened} onClose={closeModalHandler} />}
        </div>
    );
}
