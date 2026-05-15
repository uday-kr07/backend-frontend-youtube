import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import playlogo from "../../assets/PLAYLOGO.jpEg"


function Navbar({ searchQuery, setSearchQuery, onSearch }) { //frontend

    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap items-center justify-between border-b border-grey-700 px-8 py-4 bg-black text-white">
            
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
            
            <div className="flex items-center border border-grey-600 text-xl w-full md:w-[460px] h-[50px] px-4 gap-3 md:order-none">

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

            {/* AUTH BUTTONS */}

            <div className="flex items-center gap-3 md:gap-5">

                {/* LOGIN */}

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

        {/* SIGN UP */}

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

        </div>

    </div>
    );
}

export default Navbar;