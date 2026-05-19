import { LogOut, Mail, User, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";


function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const avatarUrl = typeof user?.avatar === "string" ? user.avatar : user?.avatar?.url;
    const coverUrl = typeof user?.coverImage === "string" ? user.coverImage : user?.coverImage?.url;
    const displayName = user?.fullName || user?.username || "User";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <MainLayout
            searchQuery=""
            setSearchQuery={() => {}}
            onSearch={() => {}}
        >
            <section className="min-h-[calc(100vh-83px)] text-left">
                <div
                    className="h-52 w-full bg-neutral-900"
                    style={{
                        backgroundImage: coverUrl ? `url(${coverUrl})` : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />

                <div className="mx-auto max-w-5xl px-6 pb-12">
                    <div className="-mt-14 flex flex-col gap-5 border-b border-gray-800 pb-8 md:flex-row md:items-end md:justify-between">
                        <div className="flex items-end gap-5">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="h-28 w-28 rounded-full border-4 border-black object-cover"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-black bg-neutral-900 text-purple-400">
                                    <UserRound size={58} />
                                </div>
                            )}

                            <div className="pb-2">
                                <h1 className="m-1 text-3xl font-bold text-white">
                                    {displayName}
                                </h1>
                                <p className="mt-1 text-gray-400">
                                    @{user?.username}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex h-11 items-center justify-center gap-2 rounded-md border border-gray-700 px-4 font-semibold text-white transition hover:border-purple-500 hover:text-purple-300"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div className="rounded-md border border-gray-800 bg-[#0f0f0f] p-5">
                            <div className="flex items-center gap-3 text-gray-400">
                                <User size={20} />
                                <span>Full name</span>
                            </div>
                            <p className="mt-3 text-xl font-semibold text-white">
                                {user?.fullName || "Not available"}
                            </p>
                        </div>

                        <div className="rounded-md border border-gray-800 bg-[#0f0f0f] p-5">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Mail size={20} />
                                <span>Email</span>
                            </div>
                            <p className="mt-3 break-words text-xl font-semibold text-white">
                                {user?.email || "Not available"}
                            </p>
                        </div>

                        <div className="rounded-md border border-gray-800 bg-[#0f0f0f] p-5 md:col-span-2">
                            <div className="flex items-center gap-3 text-gray-400">
                                <UserRound size={20} />
                                <span>Username</span>
                            </div>
                            <p className="mt-3 text-xl font-semibold text-white">
                                @{user?.username || "unknown"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default Profile;
