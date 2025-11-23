"use client"

import Image from "next/image";
const { useSelector } = require("react-redux");

import EmptyUser from "@public/empty_user_avatar.png";

export default function CallPageRemoteUserPhoto() {
    const { profile_picture } = useSelector(state => state.call.partner_info) || {};

    return <div className="absolute size-full bg-dawn dark:bg-midnight z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 rounded-full overflow-hidden border-2 border-slategray dark:border-bordergray">
            <Image
                fill
                alt=""
                // priority
                sizes="128px"
                src={profile_picture ?? EmptyUser.src}
                className="size-full object-cover"
            />
        </div>
    </div>
}