import { Bell, BellOff, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannelProfile } from "../api/authApi";
import { toggleSubscription } from "../api/subscriptionApi";
import { getAllVideos } from "../api/videoApi";
import VideoGrid from "../components/video/VideoGrid";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import { getAvatarUrl, getDisplayName, getMediaUrl } from "../utils/formatData";
import { formatViews } from "../utils/formatViews";

function Channel() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState(false);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                setLoading(true);
                const channelResponse = await getChannelProfile(username);
                const channelData = channelResponse.data;
                setChannel(channelData);

                const videosResponse = await getAllVideos({ userId: channelData._id });
                setVideos(videosResponse.data?.docs || videosResponse.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannel();
    }, [username]);

    const handleSubscribe = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!channel?._id || subscribing || user._id === channel._id) return;

        try {
            setSubscribing(true);
            const response = await toggleSubscription(channel._id);
            const nextSubscribed = Boolean(response.data?.subscribed);

            setChannel((current) => ({
                ...current,
                isSubscribed: nextSubscribed,
                subscribersCount: Math.max(
                    0,
                    (current.subscribersCount || 0) + (nextSubscribed ? 1 : -1)
                ),
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setSubscribing(false);
        }
    };

    const avatarUrl = getAvatarUrl(channel);
    const coverUrl = getMediaUrl(channel?.coverImage);
    const name = getDisplayName(channel);
    const isOwnChannel = user?._id && channel?._id && user._id === channel._id;

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-83px)] bg-black text-white">
                {loading ? (
                    <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
                        Loading channel...
                    </div>
                ) : !channel ? (
                    <div className="flex min-h-[70vh] items-center justify-center text-gray-500">
                        Channel not found.
                    </div>
                ) : (
                    <>
                        <div
                            className="h-52 w-full bg-neutral-900"
                            style={{
                                backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />

                        <div className="px-5">
                            <div className="-mt-12 flex flex-col gap-5 border-b border-gray-800 pb-6 md:flex-row md:items-end md:justify-between">
                                <div className="flex items-end gap-5">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt={name}
                                            className="h-28 w-28 rounded-full border-4 border-black object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-black bg-neutral-900 text-purple-400">
                                            <UserRound size={58} />
                                        </div>
                                    )}

                                    <div className="pb-2">
                                        <h1 className="m-0 text-3xl font-bold text-white">
                                            {name}
                                        </h1>
                                        <p className="mt-1 text-gray-400">
                                            @{channel.username} - {formatViews(channel.subscribersCount)} subscribers - {formatViews(channel.channelsSubscribedToCount)} subscribed
                                        </p>
                                    </div>
                                </div>

                                {!isOwnChannel && (
                                    <button
                                        type="button"
                                        onClick={handleSubscribe}
                                        disabled={subscribing}
                                        className={`flex h-11 items-center justify-center gap-2 rounded-md px-5 font-semibold transition ${
                                            channel.isSubscribed
                                                ? "bg-gray-800 text-white hover:bg-gray-700"
                                                : "bg-purple-500 text-black hover:bg-purple-400"
                                        } disabled:opacity-60`}
                                    >
                                        {channel.isSubscribed ? <BellOff size={18} /> : <Bell size={18} />}
                                        {channel.isSubscribed ? "Subscribed" : "Subscribe"}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="px-1 pt-4">
                            <VideoGrid
                                videos={videos}
                                loading={false}
                            />
                        </div>
                    </>
                )}
            </section>
        </MainLayout>
    );
}

export default Channel;
