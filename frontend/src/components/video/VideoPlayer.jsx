import { getMediaUrl } from "../../utils/formatData";

function VideoPlayer({ video }) {
    const videoUrl = getMediaUrl(video?.videoFile);

    return (
        <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-900">
            {videoUrl ? (
                <video
                    controls
                    autoPlay
                    className="h-full w-full object-contain"
                >
                    <source
                        src={videoUrl}
                        type="video/mp4"
                    />
                </video>
            ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-500">
                    Video file not available
                </div>
            )}
        </div>
    );
}

export default VideoPlayer;
