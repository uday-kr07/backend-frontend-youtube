import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getAllVideos } from "../../api/videoApi";

function VideoGrid() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {

    const fetchVideos = async () => {

        try {
            const data = await getAllVideos();
            console.log(data);
            setVideos(data);

        } catch (error) {

        console.log(error);

        }
    };

    fetchVideos();

}, []);

    return (
    <div className="grid grid-cols-4 gap-8 p-6 bg-black">

        {videos?.map((video) => (

        <VideoCard
            key={video._id}
            video={{
                title: video.title,
                thumbnail: video.thumbnail,
                avatar: video.owner?.avatar,
                channel: video.owner?.username,
                views: video.views,
                time: "18 hours ago",
            }}
        />

        ))}

    </div>
    );
}

export default VideoGrid;