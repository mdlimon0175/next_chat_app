/*
// Title: App home page
// Description: Application home page
// Author: Kiam Khan Limon
// Author email: mdlimon0175@gmail.com
// version: 2.0
// Date: 03/20/2025
*/

import dynamic from "next/dynamic";

import Blank from "@/components/Chat/Blank";
import { Loading } from "@/components/utils/ui/loaders/Loading";
import { isValidObjectId } from "@/components/utils/Helper";
const Chat = dynamic(() => import("@/components/Chat/Chat"), {
    ssr: false,
    loading: () => <Loading />
});

const blank_msg = "Select a conversation to get start";
export default function Page({ searchParams }) {
    const { conversation_id } = searchParams;

    const renderComponent = () => {
        if (conversation_id && isValidObjectId(conversation_id)) {
            return <Chat conversation_id={conversation_id} />;
        }
        return <Blank message={blank_msg} />;
    }

    return (
        <div className={`${
                conversation_id ? "col-span-12" : "hidden"
            } sm:block sm:col-span-8 md:col-span-9 bg-white dark:bg-midnight`}
        >
            {renderComponent()}
        </div>
    );
}
