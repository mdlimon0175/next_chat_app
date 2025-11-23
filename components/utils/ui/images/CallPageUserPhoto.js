"use client"
import Image from "next/image";
import { useSelector } from "react-redux";

import EmptyUser from "@public/empty_user_avatar.png";

export default function CallPageUserPhoto() {
    const { profile_picture } = useSelector(state => state.auth.user) || {};
    return (
        <div className="absolute size-full dark:bg-midnight bg-dawn">
            <Image
                fill
                alt=""
                // priority
                sizes="128px"
                src={profile_picture ?? EmptyUser.src}
                className="size-full object-cover"
            />
        </div>
    )
}