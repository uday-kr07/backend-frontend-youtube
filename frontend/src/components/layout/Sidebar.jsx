import {
    Home,
    ThumbsUp,
    History,
    Video,
    Folder,
    Users,
} from "lucide-react";


const menuItems = [ 
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

function Sidebar () {

    return (
        <div className="w-[260px]" border-r border-gray-700 h-screen p-5 bg-black text-white>

            <div className="flex flex-col gap-4 mt-5">

                {menuItems.map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-4 border border-grey-700 px-4 py-4 cursor-pointer hover:bg-gray-900"
                    >
                        {item.icon}

                        <span>{item.title}</span>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default Sidebar;