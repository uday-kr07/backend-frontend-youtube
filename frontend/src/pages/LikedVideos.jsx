import { useEffect, useState } from "react";
import { getLikedVideos } from "../api/likesApi";
import VideoGrid from "../components/video/VideoGrid";
import MainLayout from "../layouts/MainLayout";

function LikedVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                const response = await getLikedVideos();
                setVideos((response.data || []).map((item) => item.likedVideo));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedVideos();
    }, []);

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-83px)] bg-black">
                <div className="px-5 pt-5">
                    <h1 className="m-0 text-2xl font-semibold text-white">
                        Liked videos
                    </h1>
                </div>
                <VideoGrid
                    videos={videos}
                    loading={loading}
                />
            </section>
        </MainLayout>
    );
}

export default LikedVideos;
