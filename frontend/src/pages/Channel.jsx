import { Bell, BellOff, UserRound, Video, MessageSquare, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChannelProfile } from "../api/authApi";
import { toggleSubscription } from "../api/subscriptionApi";
import { getAllVideos } from "../api/videoApi";
import { getUserTweets } from "../api/tweetApi";
import { toggleTweetLike } from "../api/likesApi";
import VideoGrid from "../components/video/VideoGrid";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import { getAvatarUrl, getDisplayName, getMediaUrl, formatRelativeTime } from "../utils/formatData";
import { formatViews } from "../utils/formatViews";

function Channel() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tweetsLoading, setTweetsLoading] = useState(false);
    const [subscribing, setSubscribing] = useState(false);
    const [activeTab, setActiveTab] = useState("videos");

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

    useEffect(() => {
        if (activeTab === "tweets" && channel?._id && tweets.length === 0) {
            const fetchTweets = async () => {
                try {
                    setTweetsLoading(true);
                    const response = await getUserTweets(channel._id);
                    setTweets(response.data || []);
                } catch (error) {
                    console.log(error);
                } finally {
                    setTweetsLoading(false);
                }
            };
            fetchTweets();
        }
    }, [activeTab, channel?._id]);

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

    const handleTweetLike = async (tweetId) => {
        if (!user) { navigate("/login"); return; }
        try {
            const response = await toggleTweetLike(tweetId);
            const nextLiked = Boolean(response.data?.isLiked);
            setTweets((items) =>
                items.map((tweet) =>
                    tweet._id === tweetId
                        ? {
                            ...tweet,
                            isLiked: nextLiked,
                            likesCount: Math.max(0, (tweet.likesCount || 0) + (nextLiked ? 1 : -1)),
                        }
                        : tweet
                )
            );
        } catch (error) {
            console.log(error);
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

                            {/* Tabs */}
                            <div className="mt-4 flex gap-1 border-b border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("videos")}
                                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition border-b-2 -mb-px ${
                                        activeTab === "videos"
                                            ? "border-purple-500 text-white"
                                            : "border-transparent text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <Video size={16} />
                                    Videos
                                    <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                                        {videos.length}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("tweets")}
                                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition border-b-2 -mb-px ${
                                        activeTab === "tweets"
                                            ? "border-purple-500 text-white"
                                            : "border-transparent text-gray-400 hover:text-white"
                                    }`}
                                >
                                    <MessageSquare size={16} />
                                    Tweets
                                    {tweets.length > 0 && (
                                        <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                                            {tweets.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Videos Tab */}
                        {activeTab === "videos" && (
                            <div className="px-1 pt-4">
                                <VideoGrid
                                    videos={videos}
                                    loading={false}
                                />
                            </div>
                        )}

                        {/* Tweets Tab */}
                        {activeTab === "tweets" && (
                            <div className="px-5 pt-4">
                                {tweetsLoading ? (
                                    <p className="mt-8 text-gray-500">Loading tweets...</p>
                                ) : tweets.length === 0 ? (
                                    <p className="mt-8 rounded-md border border-dashed border-gray-800 p-8 text-center text-gray-500">
                                        No tweets yet.
                                    </p>
                                ) : (
                                    <div className="max-w-3xl divide-y divide-gray-800 rounded-md border border-gray-800 bg-[#0f0f0f]">
                                        {tweets.map((tweet) => {
                                            const tweetOwner = tweet.ownerDetails || channel;
                                            const tweetAvatarUrl = getAvatarUrl(tweetOwner);
                                            const tweetOwnerName = getDisplayName(tweetOwner);

                                            return (
                                                <article key={tweet._id} className="p-5">
                                                    <div className="flex items-start gap-3">
                                                        {tweetAvatarUrl ? (
                                                            <img
                                                                src={tweetAvatarUrl}
                                                                alt={tweetOwnerName}
                                                                className="h-10 w-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-purple-300">
                                                                {tweetOwnerName.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}

                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h2 className="m-0 text-base font-semibold text-white">
                                                                    {tweetOwnerName}
                                                                </h2>
                                                                <span className="text-xs text-gray-500">
                                                                    {formatRelativeTime(tweet.createdAt)}
                                                                </span>
                                                            </div>

                                                            <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-300">
                                                                {tweet.content}
                                                            </p>

                                                            <div className="mt-4 flex items-center gap-3">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleTweetLike(tweet._id)}
                                                                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                                                                        tweet.isLiked
                                                                            ? "bg-purple-500 text-black"
                                                                            : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                                                                    }`}
                                                                >
                                                                    <Heart size={16} />
                                                                    {formatViews(tweet.likesCount)}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </section>
        </MainLayout>
    );
}

export default Channel;