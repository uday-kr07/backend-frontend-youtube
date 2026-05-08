import { Search } from "lucide-react";
import playlogo from "../../assets/PLAYLOGO.jpEg"


function Navbar() {

    return (
        <div className="flex items-center justify-between border-b border-grey-700 px-8 py-4 bg-black text-white">
            
            <div className="text-3xl font-bold text-purple-500 cursor-pointer">
                
                <img
                    src={playlogo}
                    className="h-10 w-auto"
                />

            </div>
            
            <div className="flex items-center border border-grey-600 text-xl w-[460px] h-[50px] px-4 gap-3">

                <Search size={25}/>

                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none w-full px-2 gap-3"
                />

            </div>

            <div className="flex items-center gap-5">

        <button className="text-white font-semibold">
            Log in
        </button>

        <button className="bg-purple-500 px-5 py-3 text-black font-semibold rounded-md">
            Sign up
        </button>

        </div>

    </div>
    );
}

export default Navbar;