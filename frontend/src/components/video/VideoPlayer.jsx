function VideoPlayer({ video }) {

    return (

        <div className="w-full h-[500px] bg-gray-900 rounded-xl overflow-hidden">

            <video
                controls
                autoplay
                className="w-full h-full object-cover"
            >

                <source
                    src={video?.videoFile?.url}
                    type="video/mp4"
                />

            </video>

        </div>

    );
}

export default VideoPlayer;