"use client"
import { useSelector } from "react-redux";

export default function CallHeader() {
    const { partner_info } = useSelector(state => state.call);

    return (
        <div className="p-4 border-b c_border flex items-center justify-between">
            <h1 className="text-lg font-semibold">{`${process.env.NEXT_PUBLIC_APP_NAME.replace("-", " ")} - Call`}</h1>
            {partner_info && <span className="text-sm text-graytext dark:text-softgray">
                Call with {partner_info.username}
            </span>}
        </div>
    );
}