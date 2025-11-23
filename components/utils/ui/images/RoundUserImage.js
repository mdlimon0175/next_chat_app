import Image from "next/image";
import EmptyUser from "@public/empty_user_avatar.png";

export default function RoundUserImage({ image }) {
    return (
        <div className="round_image_container">
            <Image
                fill
                sizes="40px"
                className="round_image"
                src={image ?? EmptyUser.src}
                alt=""
            />
        </div>
    );
}