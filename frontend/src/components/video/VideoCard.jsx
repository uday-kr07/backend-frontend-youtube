import { useNavigate } from "react-router-dom";
import {
    formatRelativeTime,
    getAvatarUrl,
    getDisplayName,
    getMediaUrl,
} from "../../utils/formatData";
import { formatViews } from "../../utils/formatViews";

function VideoCard({ video }) {
    const navigate = useNavigate();
    const owner = video?.ownerDetails || video?.owner || {};
    const videoId = video?._id || video?.id;
    const thumbnailUrl = getMediaUrl(video?.thumbnail);
    const avatarUrl = getAvatarUrl(owner);
    const channelName = getDisplayName(owner);

    const openVideo = () => {
        if (videoId) {
            navigate(`/watch/${videoId}`);
        }
    };

    return (
        <button
            type="button"
            onClick={openVideo}
            className="group w-full cursor-pointer text-left text-white"
        >
            <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-900">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={video?.title || "Video thumbnail"}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-900 text-sm text-gray-500">
                        No thumbnail
                    </div>
                )}
            </div>

            <div className="mt-3 flex gap-3">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={channelName}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-purple-300">
                        {channelName.charAt(0).toUpperCase()}
                    </div>
                )}

                <div className="min-w-0">
                    <h3 className="line-clamp-2 font-semibold leading-6 group-hover:text-purple-300">
                        {video?.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        {formatViews(video?.views)} views
                        {video?.createdAt ? ` - ${formatRelativeTime(video.createdAt)}` : ""}
                    </p>

                    <p className="mt-1 truncate text-sm text-gray-500">
                        {channelName}
                    </p>
                </div>
            </div>
        </button>
    );
}

export default VideoCard;
