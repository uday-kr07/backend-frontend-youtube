import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout({ 
    children, 
    searchQuery = "", 
    setSearchQuery = () => {}, 
    onSearch = () => {} 
}) {

    return (
        <div className="bg-black min-h-screen w-full text-white">

            <Navbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={onSearch}
            />

                <div className="flex">

            <Sidebar />

                <main className="min-w-0 flex-1 bg-black text-white">
                    {children}
                </main>

            </div>

    </div>
    );
}

export default MainLayout;
