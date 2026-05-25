import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleCommentLike } from "../../api/likesApi";
import {
    formatRelativeTime,
    getAvatarUrl,
    getDisplayName,
} from "../../utils/formatData";
import { formatViews } from "../../utils/formatViews";

function CommentCard({ comment }) {
    const navigate = useNavigate();
    const owner = comment?.owner || {};
    const [isLiked, setIsLiked] = useState(Boolean(comment?.isLiked));
    const [likesCount, setLikesCount] = useState(comment?.likesCount || 0);
    const avatarUrl = getAvatarUrl(owner);
    const ownerName = getDisplayName(owner);

    const handleLike = async () => {
        try {
            const response = await toggleCommentLike(comment._id);
            const nextLiked = Boolean(response.data?.isLiked);
            setIsLiked(nextLiked);
            setLikesCount((count) => Math.max(0, count + (nextLiked ? 1 : -1)));
        } catch (error) {
            console.log(error);
        }
    };

    const goToChannel = () => {
        if (owner?.username) {
            navigate(`/channel/${owner.username}`);
        }
    };

    return (
        <article className="flex gap-4 border-b border-gray-900 py-5 last:border-b-0">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={ownerName}
                    onClick={goToChannel}
                    className="h-10 w-10 shrink-0 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
            ) : (
                <div
                    onClick={goToChannel}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-purple-300 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    {ownerName.charAt(0).toUpperCase()}
                </div>
            )}

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <h3
                        onClick={goToChannel}
                        className="font-semibold text-white cursor-pointer hover:text-purple-400 transition-colors"
                    >
                        {ownerName}
                    </h3>
                    <span className="text-xs text-gray-500">
                        {formatRelativeTime(comment?.createdAt)}
                    </span>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-300">
                    {comment?.content}
                </p>
                <button
                    type="button"
                    onClick={handleLike}
                    className={`mt-3 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition ${
                        isLiked
                            ? "bg-purple-500 text-black"
                            : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                    }`}
                >
                    <ThumbsUp size={15} />
                    {formatViews(likesCount)}
                </button>
            </div>
        </article>
    );
}

export default CommentCard;