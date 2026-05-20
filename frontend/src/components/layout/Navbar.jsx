import { Search, Upload, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import playlogo from "../../assets/PLAYLOGO.jpeg"
import { useAuth } from "../../context/AuthContext";


function Navbar({ searchQuery = "", setSearchQuery = () => {}, onSearch = () => {} }) { //frontend

    const navigate = useNavigate();
    const { user } = useAuth();
    const displayName = user?.fullName || user?.username || "Profile";
    const avatarUrl = typeof user?.avatar === "string" ? user.avatar : user?.avatar?.url;

    return (
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 bg-black px-4 py-4 text-white md:px-8">
            
            {/* LOGO */}

            <div className="text-3xl font-bold text-purple-500 cursor-pointer">
                
                <img
                    src={playlogo}
                    className="h-10 w-auto"
                    alt="logo"
                    onClick={() => navigate("/")}
                />

            {/* SEARCH BAR */}
            </div>
            
            <div className="flex h-[46px] w-full items-center gap-3 rounded-md border border-gray-700 px-4 text-xl md:w-[460px] md:order-none">

                <Search
                    size={20}
                    className="cursor-pointer"
                    onClick={onSearch}
                />

                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSearch();
                        }
                    }}
                    className="bg-transparent outline-none w-full px-2 gap-3"
                />

            </div>

            {/* PROFILE / AUTH */}

            <div className="flex items-center gap-3 md:gap-5">

                {user ? (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate("/upload")}
                            className="flex h-10 items-center gap-2 rounded-md bg-purple-500 px-4 font-semibold text-black transition hover:bg-purple-400"
                        >
                            <Upload size={18} />
                            <span className="hidden sm:inline">Upload</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="flex items-center gap-3 rounded-md px-2 py-1 text-left transition-all duration-300 hover:bg-white/10"
                        >
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="h-10 w-10 rounded-full object-cover border border-purple-500"
                                />
                            ) : (
                                <UserCircle
                                    size={40}
                                    className="text-purple-400"
                                />
                            )}

                            <span className="hidden max-w-32 truncate font-semibold text-white md:block">
                                {displayName}
                            </span>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate("/login")}
                            className="
                            text-white 
                            font-semibold 
                            transition-all 
                            duration-300 
                            hover:text-purple-400 
                            hover:scale-105
                    ">
                            Log in
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="
                            bg-purple-500 
                            px-4 md:px-5 
                            py-2 md:py-3 
                            text-black 
                            font-semibold 
                            rounded-md 
                            transition-all 
                            duration-300 
                            hover:bg-purple-400 
                            hover:scale-105 
                            hover:shadow-lg
                        ">
                            Sign up
                        </button>
                    </>
                )}

        </div>

    </div>
    );
}

export default Navbar;
