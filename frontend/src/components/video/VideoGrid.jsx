import EmptyState from "../common/EmptyState";
import VideoCard from "./VideoCard";

function VideoGrid({ videos = [], loading = false }) {
    const items = Array.isArray(videos) ? videos : [];

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    if (items.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid gap-6 bg-black p-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {items.map((video) => (
                <VideoCard
                    key={video._id}
                    video={video}
                />
            ))}
        </div>
    );
}

export default VideoGrid;
