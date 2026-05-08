import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout({ children }) {

    return (
        <div className="bg-black min-h-screen text-white">

        <Navbar />

            <div className="flex">

        <Sidebar />

        <div className="flex-1">
        {children}
        </div>

        </div>

    </div>
    );
}

export default MainLayout;