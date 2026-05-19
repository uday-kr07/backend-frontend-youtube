import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideosById } from "../api/videoApi";
import CommentSection from "../components/comment/CommentSection";
import SuggestedVideos from "../components/video/SuggestedVideos";
import VideoInfo from "../components/video/VideoInfo";
import VideoPlayer from "../components/video/VideoPlayer";
import MainLayout from "../layouts/MainLayout";

function VideoDetails() {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getVideosById(videoId);
                setVideo(data.data);
            } catch (err) {
                console.log(err);
                setError(
                    err?.response?.data?.message ||
                    "Failed to load video"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="flex min-h-[70vh] items-center justify-center bg-black text-white">
                    {error}
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="flex flex-col gap-6 bg-black p-5 text-white xl:flex-row">
                <div className="min-w-0 flex-1">
                    <VideoPlayer video={video} />
                    <VideoInfo video={video} />
                    <CommentSection videoId={videoId} />
                </div>

                <aside className="w-full xl:w-[360px]">
                    <SuggestedVideos currentVideoId={videoId} />
                </aside>
            </div>
        </MainLayout>
    );
}

export default VideoDetails;
