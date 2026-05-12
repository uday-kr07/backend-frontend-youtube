function SuggestedVideos() {

    const videos = [1,2,3,4,5,6];

    return (

        <div className="flex flex-col gap-4">

            {videos.map((video) => (

                <div
                    key={video}
                    className="flex gap-3 cursor-pointer"
                >

                    <img
                        src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                        className="w-[170px] h-[100px] object-cover rounded-lg"
                    />

                    <div>

                        <h3 className="font-medium text-sm">

                            How does a browser work?

                        </h3>

                        <p className="text-gray-400 text-xs mt-2">

                            100K Views • 18 hours ago

                        </p>

                    </div>

                </div>

            ))}

        </div>

    );
}

export default SuggestedVideos;