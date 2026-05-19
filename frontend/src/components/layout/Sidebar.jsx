import {
    Home,
    ThumbsUp,
    History,
    Video,
    Folder,
    Users,
    MessageSquare,
    Info,
    Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const topmenuItems = [ 
    {
        title: "Home",
        icon: <Home size={20} />,
        path: "/"
    },
    {
        title: "Liked Videos",
        icon: <ThumbsUp size={20} />,
        path: "/liked"
    },
    {
        title: "History",
        icon: <History size={20} />,
        path: "/history"
    },
    {
        title: "My content",
        icon: <Video size={20} />,
        path: "/dashboard"
    },
    {
        title: "Collection",
        icon: <Folder size={20} />,
        path: "/playlists"
    },
    {
        title: "Subscribers",
        icon: <Users size={20} />,
        path: "/subscriptions"
    },
    {
        title: "Tweets",
        icon: <MessageSquare size={20} />,
        path: "/tweets"
    },
];

const bottomMenuItems = [
    {
        title: "Support",
        icon: <Info size={20} />
    },
    {
        title: "Settings",
        icon: <Settings size={20} />
    }
];

function Sidebar () {
    const navigate = useNavigate();

    return (
        <div className="sticky top-[73px] hidden h-[calc(100vh-73px)] w-[260px] shrink-0 flex-col justify-between border-r border-gray-700 bg-black p-5 text-white lg:flex">

            {/* TOP MENU */}
            <div className="flex flex-col gap-4 mt-5">

                {topmenuItems.map((item, index) => (

                    <button
                        type="button"
                        key={index}
                        onClick={() => navigate(item.path)}
                        className="flex items-center gap-4 rounded-md px-4 py-3 text-left transition-colors hover:bg-gray-900"
                    >
                        {item.icon}

                        <span className="text-[16px] font-medium">
                            {item.title}
                        </span>
                    </button>
                ))}

            </div>

            {/* BOTTOM MENU*/}
            <div className="flex flex-col gap-4 mb-5">

                {bottomMenuItems.map((item, index) => (

                    <button
                        type="button"
                        key={index}
                        className="flex items-center gap-4 rounded-md px-4 py-3 text-left transition-colors hover:bg-gray-900"
                    >
                        {item.icon}

                        <span className="text-[16px] font-medium">
                            {item.title}
                        </span>
                    </button>

                ))}

            </div>
        </div>
    );
}
export default Sidebar;
