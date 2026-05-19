import { Eye, Heart, Power, Users, Video as VideoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
    getChannelStats,
    getChannelVideos,
} from "../api/dashboardApi";
import { toggleVideoPublish } from "../api/videoApi";
import MainLayout from "../layouts/MainLayout";
import { getMediaUrl } from "../utils/formatData";
import { formatViews } from "../utils/formatViews";

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const statsData = await getChannelStats();
                const videosData = await getChannelVideos();

                setStats(statsData.data);
                setVideos(videosData.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const handlePublishToggle = async (videoId) => {
        try {
            const response = await toggleVideoPublish(videoId);

            setVideos((items) =>
                items.map((video) =>
                    video._id === videoId
                        ? { ...video, isPublished: response.data?.isPublished }
                        : video
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const statCards = [
        {
            label: "Subscribers",
            value: stats?.totalSubscribers || 0,
            icon: <Users size={22} />,
        },
        {
            label: "Total views",
            value: stats?.totalViews || 0,
            icon: <Eye size={22} />,
        },
        {
            label: "Total likes",
            value: stats?.totalLikes || 0,
            icon: <Heart size={22} />,
        },
        {
            label: "Videos",
            value: stats?.totalVideos || 0,
            icon: <VideoIcon size={22} />,
        },
    ];

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-83px)] bg-black p-5 text-white">
                <h1 className="m-0 text-2xl font-semibold text-white">
                    Dashboard
                </h1>

                {loading ? (
                    <p className="mt-8 text-gray-500">Loading dashboard...</p>
                ) : (
                    <>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {statCards.map((card) => (
                                <div
                                    key={card.label}
                                    className="rounded-md border border-gray-800 bg-[#0f0f0f] p-5"
                                >
                                    <div className="flex items-center gap-3 text-gray-400">
                                        {card.icon}
                                        <span>{card.label}</span>
                                    </div>
                                    <p className="mt-4 text-3xl font-semibold text-white">
                                        {formatViews(card.value)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 overflow-hidden rounded-md border border-gray-800">
                            <div className="border-b border-gray-800 bg-[#0f0f0f] px-5 py-4">
                                <h2 className="m-0 text-lg font-semibold text-white">
                                    Your videos
                                </h2>
                            </div>

                            {videos.length === 0 ? (
                                <p className="p-8 text-center text-gray-500">
                                    No videos uploaded yet.
                                </p>
                            ) : (
                                <div className="divide-y divide-gray-800">
                                    {videos.map((video) => (
                                        <div
                                            key={video._id}
                                            className="flex flex-col gap-4 p-4 md:flex-row md:items-center"
                                        >
                                            <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-900 md:w-40">
                                                {getMediaUrl(video.thumbnail) ? (
                                                    <img
                                                        src={getMediaUrl(video.thumbnail)}
                                                        alt={video.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : null}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-white">
                                                    {video.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {formatViews(video.views)} views - {formatViews(video.likesCount)} likes
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handlePublishToggle(video._id)}
                                                className={`flex h-10 items-center justify-center gap-2 rounded-md px-4 font-semibold transition ${
                                                    video.isPublished
                                                        ? "bg-green-500 text-black hover:bg-green-400"
                                                        : "bg-gray-800 text-white hover:bg-gray-700"
                                                }`}
                                            >
                                                <Power size={18} />
                                                {video.isPublished ? "Published" : "Draft"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </section>
        </MainLayout>
    );
}

export default Dashboard;
