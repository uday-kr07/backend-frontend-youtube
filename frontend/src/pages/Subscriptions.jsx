import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubscribedChannels } from "../api/subscriptionApi";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import {
    formatRelativeTime,
    getAvatarUrl,
    getDisplayName,
    getMediaUrl,
} from "../utils/formatData";
import { formatViews } from "../utils/formatViews";

function Subscriptions() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            if (!user?._id) return;

            try {
                const response = await getSubscribedChannels(user._id);
                setChannels((response.data || []).map((item) => item.subscribedChannel));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, [user?._id]);

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-83px)] bg-black p-5 text-white">
                <h1 className="m-0 text-2xl font-semibold text-white">
                    Subscriptions
                </h1>

                {loading ? (
                    <p className="mt-8 text-gray-500">Loading subscriptions...</p>
                ) : channels.length === 0 ? (
                    <p className="mt-8 rounded-md border border-dashed border-gray-800 p-8 text-center text-gray-500">
                        No subscribed channels yet.
                    </p>
                ) : (
                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {channels.map((channel) => {
                            const latestVideo = channel.latestVideo;
                            const thumbnailUrl = getMediaUrl(latestVideo?.thumbnail);
                            const avatarUrl = getAvatarUrl(channel);
                            const name = getDisplayName(channel);

                            return (
                                <article
                                    key={channel._id}
                                    className="rounded-md border border-gray-800 bg-[#0f0f0f] p-4"
                                >
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/channel/${channel.username}`)}
                                        className="flex w-full items-center gap-4 text-left"
                                    >
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={name}
                                                className="h-14 w-14 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 font-semibold text-purple-300">
                                                {name.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <h2 className="m-0 truncate text-lg font-semibold text-white">
                                                {name}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                @{channel.username}
                                            </p>
                                        </div>
                                    </button>

                                    {latestVideo ? (
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/watch/${latestVideo._id}`)}
                                            className="mt-4 flex w-full gap-3 text-left"
                                        >
                                            <div className="aspect-video w-40 shrink-0 overflow-hidden rounded-md bg-gray-900">
                                                {thumbnailUrl ? (
                                                    <img
                                                        src={thumbnailUrl}
                                                        alt={latestVideo.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-gray-500">
                                                        <Play size={22} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="line-clamp-2 font-semibold text-white">
                                                    {latestVideo.title}
                                                </h3>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    {formatViews(latestVideo.views)} views
                                                    {latestVideo.createdAt ? ` - ${formatRelativeTime(latestVideo.createdAt)}` : ""}
                                                </p>
                                            </div>
                                        </button>
                                    ) : (
                                        <p className="mt-4 text-sm text-gray-500">
                                            No videos uploaded yet.
                                        </p>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}

export default Subscriptions;
