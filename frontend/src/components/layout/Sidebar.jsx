import {
    Home,
    ThumbsUp,
    History,
    Video,
    Folder,
    Users,
    Info,
    Settings
} from "lucide-react";


const topmenuItems = [ 
    {
        title: "Home",
        icon: <Home size={20} />
    },
    {
        title: "Liked Videos",
        icon: <ThumbsUp size={20} />
    },
    {
        title: "History",
        icon: <History size={20} />
    },
    {
        title: "My content",
        icon: <Video size={20} />
    },
    {
        title: "Collection",
        icon: <Folder size={20} />
    },
    {
        title: "Subscribers",
        icon: <Users size={20} />
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

    return (
        <div className="w-[260px] h-screen border-r border-gray-700 bg-black text-white p-5 flex flex-col justify-between">

            {/* TOP MENU */}
            <div className="flex flex-col gap-4 mt-5">

                {topmenuItems.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-900  rounded-lg transition-colors "
                    >
                        {item.icon}

                        <span className="text-[16px] font-medium">
                            {item.title}
                        </span>
                    </div>
                ))}

            </div>

            {/* BOTTOM MENU*/}
            <div className="flex flex-col gap-4 mb-5">

                {bottomMenuItems.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-900 rounded-lg transition-colors "
                    >
                        {item.icon}

                        <span className="text-[16px] font-medium">
                            {item.title}
                        </span>
                    </div>

                ))}

            </div>
        </div>
    );
}
export default Sidebar;