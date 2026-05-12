import { useEffect, useState } from "react";

import VideoCard from "./VideoCard";

import { getAllVideos } from "../../api/videoApi";

import EmptyState from "../common/EmptyState";


function VideoGrid() {

    const [videos, setVideos] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchVideos = async () => {

            try {

                const data = await getAllVideos();

                console.log(data);

                setVideos(
                    Array.isArray(data)
                        ? data
                        : data.videos || data.data?.docs || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchVideos();

    }, []);


    // LOADING STATE

    if (loading) {

        return (

            <div className="flex items-center justify-center h-[80vh] text-white">

                Loading...

            </div>

        );
    }

    // EMPTY STATE

    if (videos.length === 0) {

        return <EmptyState />;
    }

    // VIDEO GRID

    return (

        <div className="grid grid-cols-4 gap-8 p-6 bg-black">

            {videos.map((video) => (

                <VideoCard
                    key={video._id}
                    video={{
                        title: video.title,
                        thumbnail: video.thumbnail?.url,
                        avatar: video.ownerDetails?.avatar?.url,
                        channel: video.ownerDetails?.username,
                        views: video.views,
                        time: "18 hours ago",
                    }}
                />

            ))}

        </div>

    );
}

export default VideoGrid;