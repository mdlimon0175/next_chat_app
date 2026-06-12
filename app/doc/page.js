import appConfig from "@/config/config";
import CredentialItem from "@/components/Doc/CredentialItem";
import InstallationCode from "@/components/Doc/InstallationCode";
import {
    SunIcon,
    BoltIcon,
    MoonIcon,
    CircleStackIcon,
    VideoCameraIcon,
    CommandLineIcon,
    ShieldCheckIcon,
    UserCircleIcon,
    PaperAirplaneIcon,
    ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
    title: "Document",
};

export default function Page() {
    return (
        <div className="min-h-screen text-base md:text-lg text-charcoaltext dark:text-graytext bg-dawn dark:bg-midnight transition-colors duration-300">
            <HeroSection />
            <main className="max-w-7xl mx-auto px-6 py-15 md:py-20 space-y-15 md:space-y-20">
                <FeaturesSection />
                <InstallationSection />
                <ApiDetailSection />
                <MessagingDetailSection />
                <WebRTCDetailSection />
                <AppDefaultCredentialSection />
                <PackageDetailSection />
                <DeveloperInfo />
            </main>
            <Footer />
        </div>
    );
}

function HeroSection() {
    return (
        <section className="overflow-hidden border-b border-bordergray/20 bg-gradient-to-br from-purple/10 via-cyan/5 to-electric/10">
            <div className="relative max-w-full lg:max-w-7xl mx-auto px-6 py-15 md:py-20">
                <span className="inline-flex items-center rounded-full bg-purple/10 px-4 py-2 text-sm font-medium text-purple border border-purple/20">
                    Next.js 14 • Redux • RTK Query • WebRTC
                </span>

                <h1 className="mt-7 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-charcoaltext dark:text-white">
                    Next Chat App
                    <span className="block bg-gradient-to-r from-purple via-cyan to-electric bg-clip-text text-transparent">
                        Documentation
                    </span>
                </h1>

                <p className="mt-[26px] max-w-3xl leading-relaxed">
                    A modern realtime chat application built with Next.js 14,
                    Redux Toolkit, RTK Query, Socket.IO, and WebRTC video
                    calling.
                </p>

                <div className="flex flex-wrap gap-5 mt-10">
                    <NavigateButton href={"/auth/login"} target={"_blank"}>
                        <PaperAirplaneIcon className="size-5" />
                        Explore App
                    </NavigateButton>
                    <NavigateButton
                        target={"_blank"}
                        href={"https://github.com/mdlimon0175/next_chat_app"}
                    >
                        <GithubIcon className={"size-5"} />
                        View Repository
                    </NavigateButton>

                    <NavigateButton href={"#installation"} type="secondary">
                        <CommandLineIcon className="size-5" />
                        Get Started
                    </NavigateButton>
                </div>
            </div>
        </section>
    );
}

function FeaturesSection() {
    return (
        <section>
            <SectionHeader
                title={"Features"}
                description={
                    "Everything needed for modern realtime communication."
                }
            />

            <div className="mt-7.5 md:mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                    {
                        icon: CircleStackIcon,
                        title: "Redux Toolkit",
                        description:
                            "Centralized and scalable state management throughout the application.",
                        color: "purple",
                    },
                    {
                        icon: BoltIcon,
                        title: "RTK Query",
                        description:
                            "Fast, efficient and cached API requests with automatic state updates.",
                        color: "cyan",
                    },
                    {
                        icon: ChatBubbleOvalLeftEllipsisIcon,
                        title: "Realtime Messaging",
                        description:
                            "Instant communication powered by Socket.IO and WebSockets.",
                        color: "mintgreen",
                    },
                    {
                        icon: VideoCameraIcon,
                        title: "WebRTC Calls",
                        description:
                            "Peer-to-peer video calling without third-party services.",
                        color: "amber",
                    },
                    {
                        icon: MoonIcon,
                        title: "Dark Theme",
                        description:
                            "Beautiful dark mode using Midnight and Charcoal colors.",
                        color: "aurora",
                    },
                    {
                        icon: SunIcon,
                        title: "Light Theme",
                        description:
                            "Clean and elegant light experience with soft color palettes.",
                        color: "electric",
                    },
                ].map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
                            className="group bg-white dark:bg-charcoal border border-bordergray/50 dark:border-white/10 rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <span className="size-12 rounded-xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center text-white">
                                <Icon className="size-6" />
                            </span>

                            <h3 className="mt-5 text-base md:text-xl font-bold text-charcoaltext dark:text-white">
                                {feature.title}
                            </h3>

                            <p className="mt-3 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function InstallationSection() {
    return (
        <section id="installation">
            <SectionHeader title={"Installation"} />

            <div className="space-y-6 mt-[26px] md:mt-9">
                {[
                    {
                        title: "Clone Repository",
                        code: "git clone https://github.com/mdlimon0175/next_chat_app.git",
                    },
                    {
                        title: "Navigate Project",
                        code: "cd next_chat_app",
                    },
                    {
                        title: "Install Dependencies",
                        code: "npm install",
                    },
                    {
                        title: "Start Development Server",
                        code: "npm run dev",
                    },
                ].map((step, index) => (
                    <div
                        key={step.title}
                        className="bg-white dark:bg-charcoal rounded-2xl border border-bordergray/50 dark:border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-bordergray/20 dark:border-white/10 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-purple text-white flex items-center justify-center font-bold">
                                {index + 1}
                            </span>

                            <h3 className="font-semibold text-charcoaltext dark:text-white">
                                {step.title}
                            </h3>
                        </div>
                        <InstallationCode code={step.code} />
                    </div>
                ))}
            </div>
        </section>
    );
}

function ApiDetailSection() {
    return (
        <section>
            <div className="bg-gradient-to-r from-purple to-cyan p-[1px] rounded-3xl">
                <div className="bg-white dark:bg-charcoal rounded-3xl px-8 pt-8 pb-10">
                    <SectionHeaderWithIcon
                        title={"Backend API"}
                        description={
                            "Ensure the backend server is running before using the application."
                        }
                    />

                    <div className="mt-7.5 md:mt-10">
                        <NavigateButton
                            target={"_blank"}
                            href={
                                "https://github.com/mdlimon0175/next_chat_app_api"
                            }
                        >
                            <GithubIcon className={"size-5"} />
                            Backend Repository
                        </NavigateButton>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AppDefaultCredentialSection() {
    return (
        <section>
            <div className="bg-white dark:bg-charcoal rounded-3xl border border-bordergray/50 dark:border-white/10 px-8 pt-8 pb-10">
                <SectionHeaderWithIcon
                    title={"Test Live App"}
                    icon={
                        <ShieldCheckIcon className="text-mintgreen size-10" />
                    }
                />
                <div className="mt-[26px] md:mt-9 grid md:grid-cols-2 gap-5 md:gap-6">
                    <CredentialItem title={"Email"} value={"admin@test.com"} />
                    <CredentialItem title={"Password"} value={"1234"} />
                </div>
                <div className="mt-7.5 md:mt-10">
                    <NavigateButton target={"_blank"} href={"/auth/login"}>
                        <PaperAirplaneIcon className={"size-5"} />
                        Test {appConfig.app_name}
                    </NavigateButton>
                </div>
            </div>
        </section>
    );
}

function MessagingDetailSection() {
    return (
        <section className="bg-gradient-to-br from-purple/10 to-cyan/10 rounded-3xl px-8 pt-8 pb-10 border border-cyan/20">
            <SectionHeaderWithIcon
                title={"Real-time Messaging"}
                icon={<PaperAirplaneIcon className="text-purple size-10" />}
                description={`Start a conversation with a friend. 
                    If they don't have an account yet, 
                    invite them to join and experience 
                    real-time chatting together.
                `}
            />
        </section>
    );
}

function WebRTCDetailSection() {
    return (
        <section className="bg-gradient-to-br from-cyan/10 to-purple/10 rounded-3xl px-8 pt-8 pb-10 border border-cyan/20">
            <SectionHeaderWithIcon
                title={"WebRTC Video Calls"}
                icon={<VideoCameraIcon className="text-cyan size-10" />}
                description={`Start a video call directly from any conversation by
                    clicking the Video Call button. WebRTC establishes a
                    peer-to-peer connection for low-latency video communication.
                `}
            />
        </section>
    );
}

function PackageDetailSection() {
    return (
        <section>
            <SectionHeader title={"Technology Stack"} />

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
                {[
                    "Next.js",
                    "Redux",
                    "Socket.IO",
                    "WebRTC",
                    "React Virtuoso",
                ].map((pkg) => (
                    <span
                        key={pkg}
                        className="bg-white dark:bg-charcoal text-sm md:text-base font-normal md:font-medium text-charcoaltext dark:text-white border border-bordergray/50 dark:border-white/10 rounded-2xl px-5 md:px-6 py-4 md:py-5"
                    >
                        {pkg}
                    </span>
                ))}
            </div>
        </section>
    );
}

function DeveloperInfo() {
    return (
        <section>
            <div className="bg-white dark:bg-charcoal rounded-3xl border border-bordergray/50 dark:border-white/10 px-8 pt-8 pb-10">
                <SectionHeaderWithIcon
                    title={"Developer Info"}
                    icon={<UserCircleIcon className="text-mintgreen size-10" />}
                />
                <div className="mt-7.5 md:mt-10">
                    <NavigateButton
                        target={"_blank"}
                        href={process.env.NEXT_PUBLIC_DEVELOPER_PORTFOLIO_URL}
                    >
                        <UserCircleIcon className={"size-5"} />
                        Developer Portfolio
                    </NavigateButton>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="px-6 pb-9 md:pb-14">
            <p className="text-center text-sm md:text-base text-charcoaltext dark:text-white">
                Copyright &copy; {new Date().getFullYear()}{" "}
                <span className="text-purple dark:text-cyan">Kiam</span>. All
                rights reserved.
            </p>
        </footer>
    );
}

function GithubIcon({ className }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
        </svg>
    );
}

function NavigateButton({ href, target, type = "primary", children }) {
    const className = {
        primary: "bg-purple hover:bg-purple/90 text-white",
        secondary:
            "border border-bordergray dark:border-charcoal text-charcoaltext dark:text-white hover:bg-softgray dark:hover:bg-charcoal",
    };

    return (
        <a
            href={href}
            target={target}
            className={`text-sm md:text-base inline-flex items-center gap-2 px-6 pb-3 pt-2.5 rounded-xl font-semibold transition ${className[type]}`}
        >
            {children}
        </a>
    );
}

function SectionHeader({ title, description }) {
    return (
        <>
            <h2 className="text-3xl md:text-4xl -mt-2.5 font-bold text-charcoaltext dark:text-white">
                {title}
            </h2>
            {description ? (
                <p className="mt-3">{description}</p>
            ) : null}
        </>
    );
}

function SectionHeaderWithIcon({ title, description, icon }) {
    return (
        <>
            <h2 className="text-2xl md:text-3xl flex items-center gap-4 font-bold text-charcoaltext dark:text-white">
                {icon ? icon : null}
                <span>{title}</span>
            </h2>
            {description ? (
                <p className="mt-4 max-w-3xl leading-relaxed">
                    {description}
                </p>
            ) : null}
        </>
    );
}
