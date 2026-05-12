import {
    ThumbsUp,
    ThumbsDown,
    Bookmark,
    MoreVertical
} from "lucide-react";


function VideoInfo({ video }) {

    return (
        <div className="mt-5 border border-gray-800 rounded-xl p-5">

            {/* TITLE */}

            <h1 className="text-2xl font-semibold">
                {video?.title}
            </h1>

            {/* STATS */}

            <div className="mt-2 text-gray-400 text-sm" >
                
                {video?.views} Video | {""}
                {new Date(video?.createdAt).toDateString()}

            </div>

            <div className="flex items-center justify-between mt-5">

                {/* CHANNEL */}

                <div className="flex items-center gap-4">

                    <img
                        src="https://i.pravatar.cc/100"
                        className="w-12 h-12 rounded-full"
                    />

                    <div>
                        <h3 className="font-semibold">
                            {video?.owner?.username}
                        </h3>
                        <p className="text-sm text-gray-400">
                            {video?.owner?.subscribersCount || 0} Followers
                        </p>
                    </div>
                </div>


                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg hover:bg-gray-800">
                        <ThumbsUp size={18} />
                        {video?.likesCount || 0}
                    </button>


                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg hover:bg-gray-800">
                        <ThumbsDown size={18} />
                        0
                    </button>


                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg hover:bg-gray-800">
                        <Bookmark size={18} />
                        Save
                    </button>


                    <button className="p-2 bg-gray-900 rounded-lg hover:bg-gray-800">
                        <MoreVertical size={18} />
                    </button>

                </div>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-5 border-t border-gray-800 pt-4">
                <p className="text-gray-300 leading-7">
                    {video?.description}
                </p>
            </div>

        </div>

    );
}

export default VideoInfo;