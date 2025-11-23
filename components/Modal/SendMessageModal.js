"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "hooks/useDebounce";
import { isValidUserInfo } from "../utils/Helper";
// import AlertBox from "../utils/ui/alerts/AlertBox";
import AlertText from "../utils/ui/alerts/AlertText";
import { useGetUserQuery } from "@/lib/features/users/usersApi";
import PrimarySubmitButton from "../utils/ui/buttons/PrimarySubmitButton";
import { useAddConversationMutation } from "@/lib/features/conversations/conversationsApi";

const delay = 300;
const prevValidUserInfo = new Map();
export default function SendMessageModal({ opened, onClose }) {
    const [visible, setVisible] = useState(opened);

    const onCloseHandler = () => {
        setVisible(false);
        setTimeout(() => {
            onClose();
        }, delay + 10)
    }

    return (
        <>
            <div
                onClick={onCloseHandler}
                className={`${visible ? "opacity-100 visible" : "opacity-0 invisible"} fixed inset-0 z-[100] h-full w-full cursor-pointer bg-black/50 delay-${delay} default_transition`}
            ></div>
            <div className={`${visible ? "visible opacity-100" : "invisible opacity-0"} message_modal default_transition`}>
                <h2 className="text-center text-3xl font-extrabold">
                    Send message
                </h2>
                {opened && <SendMessageModalForm onCloseModalHandler={onCloseHandler} />}
            </div>
        </>
    );
}

function SendMessageModalForm({ onCloseModalHandler }) {
    const router = useRouter();
    const [sendTo, setSendTo] = useState("");
    const [message, setMessage] = useState("");
    const debouncedValue = useDebounce(sendTo, 500);
    const { isEmail, isUsername } = isValidUserInfoCacheHandler(debouncedValue);
    const { data: partnerInfo, isError: partnerInfoGetError, isSuccess: partnerInfoGetSuccess } =
        useGetUserQuery(sendTo, {skip: !(isEmail || isUsername)});
    const [
        addConversation,
        { data: addConversationData, isSuccess: isAddedSuccess },
    ] = useAddConversationMutation();
    const { conversation_id = "" } = addConversationData?.data ?? {};

    useEffect(() => {
        if (isAddedSuccess) {
            setSendTo("");
            setMessage("");
            onCloseModalHandler();
            prevValidUserInfo.clear();
            router.push(`/?conversation_id=${conversation_id}`);
        }
    }, [isAddedSuccess, onCloseModalHandler, conversation_id, router]);

    const formHandler = (e) => {
        e.preventDefault();
        addConversation({
            message,
            receiver_id: partnerInfo.data,
        });
    }

    return (<form className="mt-8 space-y-[18px]" onSubmit={formHandler}>
        <div className="rounded-md shadow-sm space-y-[17px]">
            <div>
                <label className="form_label">{"send to"}</label>
                <input
                    name={"send_to"}
                    type={"text"}
                    onChange={(e) => setSendTo(e.target.value)}
                    required={true}
                    placeholder={"send to"}
                    className="form_input"
                />
                {partnerInfoGetError ? <AlertText message={"User not found!"} type={"error"} /> : null}
                {partnerInfoGetSuccess ? <AlertText message={"User found!"} type={"success"} /> : null}
            </div>
            
            <div>
                <label className="form_label">{"message"}</label>
                <textarea
                    className={"form_textarea"}
                    name={"message"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required={true}
                    placeholder="your message"
                >
                    {message}
                </textarea>
            </div>
        </div>
        <PrimarySubmitButton title={"Send Message"} disabled={!partnerInfoGetSuccess} />
        {/* {errors?.message && (
            <AlertBox message={errors.message} type={"error"} />
        )} */}
    </form>)
}

function isValidUserInfoCacheHandler(value) {
    const existValue = prevValidUserInfo.get(value);
    if(existValue) {
        return existValue;
    }
    const result = isValidUserInfo(value);
    prevValidUserInfo.set(value, result)
    return result;
}