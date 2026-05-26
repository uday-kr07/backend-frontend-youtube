import { Heart, Send, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTweet, deleteTweet, getAllTweets } from "../api/tweetApi";
import { toggleTweetLike } from "../api/likesApi";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import {
    formatRelativeTime,
    getAvatarUrl,
    getDisplayName,
} from "../utils/formatData";
import { formatViews } from "../utils/formatViews";

function Tweets() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tweets, setTweets] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await getAllTweets();
                setTweets(response.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTweets();
    }, []);

    const handleCreate = async (event) => {
        event.preventDefault();

        if (!content.trim()) return;

        try {
            const response = await createTweet(content.trim());
            const tweet = {
                ...response.data?.tweet,
                ownerDetails: user,
                likesCount: 0,
                isLiked: false,
                createdAt: new Date().toISOString(),
            };

            setTweets((items) => [tweet, ...items]);
            setContent("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = async (tweetId) => {
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

    const handleDelete = async (tweetId) => {
        try {
            await deleteTweet(tweetId);
            setTweets((items) => items.filter((tweet) => tweet._id !== tweetId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-83px)] bg-black p-5 text-white">
                <h1 className="m-0 text-2xl font-semibold text-white">
                    Tweets
                </h1>

                <form
                    onSubmit={handleCreate}
                    className="mt-6 flex gap-3 rounded-md border border-gray-800 bg-[#0f0f0f] p-4"
                >
                    <input
                        type="text"
                        placeholder="Write a tweet"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        className="h-11 min-w-0 flex-1 rounded-md border border-gray-700 bg-transparent px-4 outline-none focus:border-purple-500"
                    />
                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className="flex h-11 items-center justify-center rounded-md bg-purple-500 px-4 text-black hover:bg-purple-400 disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>
                </form>

                {loading ? (
                    <p className="mt-8 text-gray-500">Loading tweets...</p>
                ) : tweets.length === 0 ? (
                    <p className="mt-8 rounded-md border border-dashed border-gray-800 p-8 text-center text-gray-500">
                        No tweets yet.
                    </p>
                ) : (
                    <div className="mt-6 max-w-3xl divide-y divide-gray-800 rounded-md border border-gray-800 bg-[#0f0f0f]">
                        {tweets.map((tweet) => {
                            const owner = tweet.ownerDetails || user;
                            const avatarUrl = getAvatarUrl(owner);
                            const ownerName = getDisplayName(owner);
                            const isOwnTweet = user?._id && owner?._id && user._id === owner._id;

                            return (
                                <article
                                    key={tweet._id}
                                    onClick={() => owner?.username && navigate(`/channel/${owner.username}`)}
                                    className="p-5"
                                >
                                    <div className="flex items-start gap-3">
                                        {avatarUrl ? (
                                            <img
                                                src={avatarUrl}
                                                alt={ownerName}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-purple-300">
                                                {ownerName.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="m-0 text-base font-semibold text-white">
                                                    {ownerName}
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
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleLike(tweet._id);
                                                    }}
                                                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                                                        tweet.isLiked
                                                            ? "bg-purple-500 text-black"
                                                            : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                                                    }`}
                                                >
                                                    <Heart size={16} />
                                                    {formatViews(tweet.likesCount)}
                                                </button>

                                                {isOwnTweet && (
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            handleDelete(tweet._id);
                                                        }}
                                                        className="rounded-md bg-gray-900 p-2 text-gray-300 hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}

export default Tweets;
