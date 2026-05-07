import { useEffect, useState } from "react";

import {
    getChannelStats,
    getChannelVideos,
} from "../api/dashboardApi";

function Dashboard() {

    const[stats, setStats] = useState(null);
    const[videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {

                const statsData = await getChannelStats();

                const videosData = await getChannelVideos();

                setStats(statsData.data);
                
                setVideos(videosData.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDashboard();

    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            {stats && (
                <div>
                    <h2>Channel Stats</h2>
                    <p>Subscribers: {stats.subscribers}</p>
                    <p>Total Views: {stats.views}</p>
                </div>
            )}

            {videos.length > 0 && (
                <div>
                    <h2>Recent Videos</h2>
                    <ul>
                        {videos.map((video) => (
                            <li key={video.id}>{video.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dashboard;