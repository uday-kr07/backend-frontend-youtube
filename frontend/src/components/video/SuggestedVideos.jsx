import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVideos } from "../../api/videoApi";
import {
    formatRelativeTime,
    getMediaUrl,
} from "../../utils/formatData";
import { formatViews } from "../../utils/formatViews";

function SuggestedVideos({ currentVideoId }) {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getAllVideos({ limit: 8 });
                const docs = response.data?.docs || response.data || [];
                setVideos(docs.filter((video) => video._id !== currentVideoId));
            } catch (error) {
                console.log(error);
            }
        };

        fetchVideos();
    }, [currentVideoId]);

    return (
        <div className="flex flex-col gap-4">
            {videos.map((video) => {
                const thumbnailUrl = getMediaUrl(video.thumbnail);

                return (
                    <button
                        type="button"
                        key={video._id}
                        onClick={() => navigate(`/watch/${video._id}`)}
                        className="flex cursor-pointer gap-3 text-left"
                    >
                        <div className="h-[92px] w-[150px] shrink-0 overflow-hidden rounded-md bg-gray-900">
                            {thumbnailUrl ? (
                                <img
                                    src={thumbnailUrl}
                                    alt={video.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                                    No thumbnail
                                </div>
                            )}
                        </div>

                        <div className="min-w-0">
                            <h3 className="line-clamp-2 text-sm font-medium text-white">
                                {video.title}
                            </h3>

                            <p className="mt-2 text-xs text-gray-400">
                                {formatViews(video.views)} views
                                {video.createdAt ? ` - ${formatRelativeTime(video.createdAt)}` : ""}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

export default SuggestedVideos;
