"use client"
import { useState } from "react";

const delay = 300;
export default function CallStreamErrorModal({ opened, onClose }) {
    const [visible, setVisible] = useState(opened);

    const onCloseHandler = () => {
        setVisible(false);
        setTimeout(() => {
            onClose();
        }, delay + 10)
    }

    return (
        <div
            className={`${visible ? "opacity-100 visible" : "opacity-0 invisible"} fixed inset-0 z-[100] bg-black/50 flex justify-center items-center default_transition`}
        >
            <div className="bg-dawn dark:text-midnight text-dawn rounded-lg space-y-4 p-6 max-w-sm w-full">
                <ul className="space-y-3">
                    <ErrorText text={"Close other app that might be using your camera"} />
                    <ErrorText text={"Close and reopen your browser"} />
                </ul>
                <div>
                    <button
                        className="auth_btn"
                        disabled={!visible}
                        onClick={onCloseHandler}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

function ErrorText({text}) {
    return (
        <li className="flex space-x-2 text-midnight">
            <span className="text-xl -mt-[3px]">&bull;</span>
            <span>{text}</span>
        </li>
    )
}