import {
    Home,
    ThumbsUp,
    History,
    Video,
    Upload,
    Folder,
    Users,
    MessageSquare,
    Info,
    Settings,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




const topmenuItems = [ 
    { title: "Home",           icon: <Home size={20} />,           path: "/"},
    { title: "Liked Videos",   icon: <ThumbsUp size={20} />,       path: "/liked"},
    { title: "History",        icon: <History size={20} />,        path: "/history"},
    { title: "Upload",         icon: <Upload size={20} />,         path: "/upload"},
    { title: "My content",     icon: <Video size={20} />,          path: "/dashboard"},
    { title: "Collection",     icon: <Folder size={20} />,         path: "/playlists"},
    { title: "Subscribers",    icon: <Users size={20} />,          path: "/subscriptions"},
    { title: "Tweets",         icon: <MessageSquare size={20} />,  path: "/tweets"},
];

const bottomMenuItems = [
    { title: "Support",        icon: <Info size={20} />},
    { title: "Settings",       icon: <Settings size={20} />,       path: "/settings" }
];

function Sidebar () {

    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    

    return (
        <div className="sticky top-[73px] flex h-[calc(100vh-73px)] shrink-0 flex-col justify-between border-r border-gray-700 bg-black text-white overflow-hidden transition-all duration-300 ease-in-out"
            style={{ width: open ? "210px" : "64px" }}
        >
            {/* TOGGLE BUTTON */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="absolute top-4 right-2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                title={open ? "Collapse sidebar" : "Expand sidebar"}
            >
                {open ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
            </button>

            {/* TOP MENU */}
            <div className="flex flex-col gap-1 mt-14 px-2">

                {topmenuItems.map((item, index) => (

                    <button
                        type="button"
                        key={index}
                        onClick={() => navigate(item.path)}
                        title={!open ? item.title : undefined}
                        className="flex items-center gap-4 rounded-md px-4 py-3 text-left transition-colors hover:bg-gray-900 whitespace-nowrap"
                    >

                        <span className="shrink-0">{item.icon}</span>
                        <span
                            className="text-[15px] font-medium transition-all duration-300 overflow-hidden"
                            style={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
                        >
                            {item.title}
                        </span>
                    </button>
                ))}

            </div>

            {/* BOTTOM MENU*/}
            <div className="flex flex-col gap-1 mb-5 px-2">

                {bottomMenuItems.map((item, index) => (

                    <button
                        type="button"
                        key={index}
                        title={!open ? item.title : undefined}
                        className="flex items-center gap-4 rounded-md px-4 py-3 text-left transition-colors hover:bg-gray-900 whitespace-nowrap"
                    >
                        <span className="shrink-0">{item.icon}</span>
                        <span 
                        className="text-[15px] font-medium transition-all duration-300 overflow-hidden"
                        style={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
                        >
                            {item.title}
                        </span>
                    </button>

                ))}

            </div>
        </div>
        
    );
}
export default Sidebar;