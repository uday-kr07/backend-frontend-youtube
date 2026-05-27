
import {
    LifeBuoy,
    Bug,
    MessageSquare,
    ShieldAlert,
    FileWarning,
    Sparkles,
    ChevronRight
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

function Support() {

    const supportCards = [
        {
            icon: <Bug size={24} />,
            title: "Report a Bug",
            description:
                "Found a problem while using Play? Report crashes, upload issues, loading bugs, and broken features.",
        },
        {
            icon: <MessageSquare size={24} />,
            title: "Contact Support",
            description:
                "Need help with your account, videos, or settings? Reach out to the Play support team.",
        },
        {
            icon: <ShieldAlert size={24} />,
            title: "Community Guidelines",
            description:
                "Read Play's rules about content, safety, spam, harassment, and platform policies.",
        },
        {
            icon: <FileWarning size={24} />,
            title: "Copyright Claims",
            description:
                "Report stolen videos or copyright violations and manage your copyright requests.",
        },
        {
            icon: <Sparkles size={24} />,
            title: "Feature Requests",
            description:
                "Suggest new features, improvements, UI changes, or creator tools for the platform.",
        },
    ];

    return (
        <MainLayout>
            <section className="min-h-screen bg-black text-white px-6 py-8">

                {/* HEADER */}

                <div className="mb-10">
                    <h1 className="text-4xl font-bold">
                        Support Center
                    </h1>

                    <p className="mt-3 max-w-2xl text-gray-400">
                        Get help, report issues, contact support, and explore
                        useful resources for creators and viewers on Play.
                    </p>
                </div>

                {/* TOP SUPPORT HERO */}

                <div className="mb-10 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-black p-6">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>
                            <div className="flex items-center gap-3">
                                <LifeBuoy
                                    size={34}
                                    className="text-purple-400"
                                />

                                <h2 className="text-2xl font-semibold">
                                    Need help with Play?
                                </h2>
                            </div>

                            <p className="mt-3 max-w-xl text-gray-400">
                                Our support tools help you solve problems,
                                protect your account, and improve your creator
                                experience.
                            </p>
                        </div>

                        <button
                            className="
                                rounded-lg
                                bg-purple-600
                                px-6
                                py-3
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:bg-purple-500
                                hover:scale-105
                            "
                        >
                            Contact Support
                        </button>

                    </div>
                </div>

                {/* SUPPORT GRID */}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {supportCards.map((card, index) => (
                        <div
                            key={index}
                            className="
                                group
                                rounded-2xl
                                border
                                border-gray-800
                                bg-[#111111]
                                p-6
                                transition-all
                                duration-300
                                hover:border-purple-500/40
                                hover:bg-[#161616]
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-purple-500/10
                                    text-purple-400
                                "
                            >
                                {card.icon}
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                {card.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-400">
                                {card.description}
                            </p>

                            <button
                                className="
                                    mt-6
                                    flex
                                    items-center
                                    gap-2
                                    font-medium
                                    text-purple-400
                                    transition-all
                                    hover:text-purple-300
                                "
                            >
                                Open
                                <ChevronRight size={18} />
                            </button>

                        </div>
                    ))}

                </div>

                {/* SYSTEM STATUS */}

                <div className="mt-12 rounded-2xl border border-gray-800 bg-[#111111] p-6">

                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                System Status
                            </h2>

                            <p className="mt-2 text-gray-400">
                                Current platform services and API status.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400">
                            <span className="h-2 w-2 rounded-full bg-green-400" />
                            All Systems Operational
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                        {[
                            "Video Uploads",
                            "Authentication",
                            "Database",
                            "Streaming API"
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="
                                    rounded-xl
                                    border
                                    border-gray-800
                                    bg-black
                                    p-4
                                "
                            >
                                <div className="flex items-center justify-between">

                                    <p className="font-medium">
                                        {service}
                                    </p>

                                    <span className="text-green-400">
                                        Online
                                    </span>

                                </div>
                            </div>
                        ))}

                    </div>

                </div>

            </section>
        </MainLayout>
    );
}

export default Support;