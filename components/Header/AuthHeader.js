import Image from "next/image";

import Logo from "@public/logo.png";
import LogoDark from "@public/logo_dark.png";

export default function AuthHeader({ title }) {
    return (
        <div>
            <div className="relative size-20 mx-auto">
                {/* Light mode logo */}
                <Image
                    fill
                    sizes="80px"
                    src={LogoDark.src}
                    alt="Logo Dark"
                    className="w-full object-contain dark:hidden"
                />

                {/* Dark mode logo */}
                <Image
                    fill
                    sizes="80px"
                    src={Logo.src}
                    alt="Logo"
                    className="w-full object-contain hidden dark:block"
                />
            </div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-charcoaltext dark:text-dawn">
                {title}
            </h1>
        </div>
    );
}