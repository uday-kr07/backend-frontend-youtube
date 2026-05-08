function VideoCard({ video }) {
    return (

        <div className="cursor-pointer text-white">

            <img
                src={video.thumbnail}
                alt="thumbnail"
                className="w-full h-[180px] object-cover rounded-md"
            />
            
            <div className="flex gap-3 mt-3">
                
                <img
                    src={video.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                />

                <div>

                    <h3 className="font-semibold text=lg leading-6">
                        {video.title}
                    </h3>

                    <p className="text-grey-400 text-sm mt-1" >
                        {video.views} Views . {VideoCard.time}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                        {video.channel}
                    </p>


                </div>

            </div>

        </div>
    );
}

export default VideoCard;