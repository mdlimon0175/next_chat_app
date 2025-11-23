import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Logo from "@public/logo.png";
const LogoutButton = dynamic(() => import("../utils/ui/buttons/LogoutButton"), {
    ssr: false,
});

export default function Navbar() {
    return (
        <nav className="sticky top-0 left-0 z-40 bg-purple/70 dark:bg-electric/80">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    <div className="w-20 h-20 flex items-center">
                        <Link href={"/"} className="relative size-full border-none outline-none">
                            <Image
                                fill
                                sizes="80px"
                                src={Logo.src}
                                className="object-contain"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    {/* <div> */}
                        <LogoutButton />
                    {/* </div> */}
                </div>
            </div>
        </nav>
    );
}
