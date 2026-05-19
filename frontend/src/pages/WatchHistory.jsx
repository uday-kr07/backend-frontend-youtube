import { useEffect, useState } from "react";
import { getWatchHistory } from "../api/authApi";
import VideoGrid from "../components/video/VideoGrid";
import MainLayout from "../layouts/MainLayout";

function WatchHistory() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getWatchHistory();
                setVideos(response.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-83px)] bg-black">
                <div className="px-5 pt-5">
                    <h1 className="m-0 text-2xl font-semibold text-white">
                        Watch history
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

export default WatchHistory;
