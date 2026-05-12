import MainLayout from "../layouts/MainLayout";
import VideoPlayer from "../components/video/VideoPlayer";
import VideoInfo from "../components/video/VideoInfo";
import SuggestedVideos from "../components/video/SuggestedVideos";
import CommentSection from "../components/comment/CommentSection";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideosById } from "../api/videoApi";


function VideoDetails() {

    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchVideo = async () => {

        try {
            const data = await getVideosById(videoId);
            console.log(data);
            setVideo(data.data);

        } catch (error) {
            
            console.log(error);

        } finally {

            setLoading(false);
        }
    };
    
    fetchVideo();

    }, [videoId])

    if (loading) {

        return (

            <div className="flex items-center justify-center h-screen bg-black text-white">
                Loading
            </div>

        )
    }

    return (

        <MainLayout>
            <div className="flex gap-6 p-5 bg-black text-white">
                {/* LEFT SECTION */}
                <div className="flex-1">
                    <VideoPlayer video={video} />
                    <VideoInfo video={video}  />
                    <CommentSection />

                </div>


                {/* RIGHT SECTION */}

                <div className="w-[360px]">

                    <SuggestedVideos />

                </div>

            </div>

        </MainLayout>

    );
}

export default VideoDetails;