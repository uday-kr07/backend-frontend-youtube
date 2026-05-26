import { Bell, BellOff, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleVideoLike } from "../../api/likesApi";
import { toggleSubscription } from "../../api/subscriptionApi";
import { useAuth } from "../../context/AuthContext";
import {
    getAvatarUrl,
    getDisplayName,
} from "../../utils/formatData";
import { formatViews } from "../../utils/formatViews";

function VideoInfo({ video }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const owner = video?.owner || {};
    const ownerId = owner?._id;
    const isOwnVideo = user?._id && ownerId && user._id === ownerId;
    const [isLiked, setIsLiked] = useState(Boolean(video?.isLiked));
    const [likesCount, setLikesCount] = useState(video?.likesCount || 0);
    const [isDisliked, setIsDisliked] = useState(Boolean(video?.isDisliked));
    const [dislikesCount, setDislikesCount] = useState(video?.dislikesCount || 0);
    const [isSubscribed, setIsSubscribed] = useState(Boolean(owner?.isSubscribed));
    const [subscribersCount, setSubscribersCount] = useState(owner?.subscribersCount || 0);
    const [busyAction, setBusyAction] = useState("");
    const avatarUrl = getAvatarUrl(owner);
    const ownerName = getDisplayName(owner);

    const requireLogin = () => {
        if (!user) {
            navigate("/login");
            return false;
        }

        return true;
    };

    const handleLike = async () => {
        if (!requireLogin() || !video?._id || busyAction) return;

        try {
            setBusyAction("like");
            const response = await toggleVideoLike(video._id);
            const nextLiked = Boolean(response.data?.isLiked);

            setIsLiked(nextLiked);
            setLikesCount((count) => Math.max(0, count + (nextLiked ? 1 : -1))
        );

        if (nextLiked && isDisliked) {
            setIsDisliked(false);

            setDislikesCount((count) => 
            Math.max(0, count - 1));
        };

        } catch (error) {
            console.log(error);
        } finally {
            setBusyAction("");
        }
    };


    const handleDislike = async () => {
        if (!requireLogin() || !video?._id || busyAction) return;

        try {
            setBusyAction("dislike");

            // TEMPORARY FRONTEND LOGIC
            // Replace with API later

            const nextDisliked = !isDisliked;

            setIsDisliked(nextDisliked);

            setDislikesCount((count) =>
                Math.max(0, count + (nextDisliked ? 1 : -1))
            );

            // REMOVE LIKE IF DISLIKED
            if (nextDisliked && isLiked) {
                setIsLiked(false);

                setLikesCount((count) =>
                    Math.max(0, count - 1)
                );
            }

        } catch (error) {
            console.log(error);
        } finally {
            setBusyAction("");
        }
    };


    const handleSubscribe = async () => {
        if (!requireLogin() || !ownerId || isOwnVideo || busyAction) return;

        try {
            setBusyAction("subscribe");
            const response = await toggleSubscription(ownerId);
            const nextSubscribed = Boolean(response.data?.subscribed);

            setIsSubscribed(nextSubscribed);
            setSubscribersCount((count) => Math.max(0, count + (nextSubscribed ? 1 : -1)));
        } catch (error) {
            console.log(error);
        } finally {
            setBusyAction("");
        }
    };

    return (
        <div className="relative rounded-md border border-gray-800 p-5 pb-5 pt-0">
            <h1 className="absolute -top-8 left-5 text-2xl font-semibold text-white">
                {video?.title}
            </h1>

            {/* <div className="mt-20 text-sm text-gray-400">
                {formatViews(video?.views)} views
                {video?.createdAt ? ` - ${formatRelativeTime(video.createdAt)}` : ""}
            </div> */}

            <div className="mt-20 text-sm text-gray-400">
                {formatViews(video?.views)} views
            </div>

            <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div
                    onClick={() => owner?.username && navigate(`/channel/${owner.username}`)}
                    className="flex flex-wrap items-center gap-4 cursor-pointer"
                >
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={ownerName}
                            className="h-12 w-12 rounded-full object-cover hover:opacity-80 transition-opacity"
                        />
                    ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 font-semibold text-purple-300 hover:opacity-80 transition-opacity">
                            {ownerName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div>
                        <h3 className="font-semibold hover:text-purple-300 transition-colors">
                            {ownerName}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {formatViews(subscribersCount)} subscribers
                        </p>
                    </div>

                    {!isOwnVideo && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleSubscribe(); }}
                            disabled={busyAction === "subscribe"}
                            className={`flex h-10 items-center gap-2 rounded-md px-4 font-semibold transition ${
                                isSubscribed
                                    ? "bg-gray-800 text-white hover:bg-gray-700"
                                    : "bg-purple-500 text-black hover:bg-purple-400"
                            } disabled:opacity-60`}
                        >
                            {isSubscribed ? <BellOff size={18} /> : <Bell size={18} />}
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleLike}
                        disabled={busyAction === "like"}
                        className={`flex h-10 items-center gap-2 rounded-md px-4 transition ${
                            isLiked
                                ? "bg-purple-500 text-black hover:bg-purple-400"
                                : "bg-gray-900 text-white hover:bg-gray-800"
                        } disabled:opacity-60`}
                    >
                        <ThumbsUp size={18} />
                        {formatViews(likesCount)}
                    </button>
                    <button
                        type="button"
                        onClick={handleDislike}
                        disabled={busyAction === "dislike"}
                        className={`flex h-10 items-center gap-2 rounded-md px-4 transition ${
                            isDisliked
                                ? "bg-red-500 text-white hover:bg-red-400"
                                : "bg-gray-900 text-white hover:bg-gray-800"
                        } disabled:opacity-60`}
                    >
                        <ThumbsDown size={18} />

                        {formatViews(dislikesCount)}
                    </button>
                </div>
                
            </div>

            <div className="mt-5 border-t border-gray-800 pt-4">
                <p className="whitespace-pre-wrap leading-7 text-gray-300">
                    {video?.description}
                </p>
            </div>
        </div>
    );
}

export default VideoInfo;
