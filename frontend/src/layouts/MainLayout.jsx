import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout({ children }) {

    return (
        <div className="bg-black min-h-screen w-full text-white">

            <Navbar />

                <div className="flex">

            <Sidebar />

                <main className="flex-1 bg-black text-white">
                    {children}
                </main>

            </div>

    </div>
    );
}

export default MainLayout;