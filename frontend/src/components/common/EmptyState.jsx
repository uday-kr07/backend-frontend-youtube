import { PlayCircle } from "lucide-react";

function EmptyState({

    title = "No videos available",

    description = "There are no videos available. Please try searching something else."

}) {

    return (

        <div className="flex flex-col items-center justify-center h-[80vh] text-white">

            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">

                <PlayCircle
                    size={36}
                    className="text-purple-400"
                />

            </div>

            <h2 className="mt-5 text-2xl font-semibold">

                {title}

            </h2>

            <p className="mt-2 text-gray-400 text-center max-w-md">

                {description}

            </p>

        </div>

    );
}

export default EmptyState;