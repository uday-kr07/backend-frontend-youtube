import {
    ChevronRight,
    Image,
    LogOut,
    Save,
    Trash2,
    Upload,
    UserRound,
    X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    deleteAccount,
    logoutUser,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
} from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";

function Settings() {
    const navigate = useNavigate();
    const { user, logout, updateUser } = useAuth();
    const [activePanel, setActivePanel] = useState("");
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const setMessage = (nextSuccess = "", nextError = "") => {
        setSuccess(nextSuccess);
        setError(nextError);
    };

    const saveUser = (response) => {
        updateUser(response.data);
        setMessage("Account updated.");
    };

    const handleUpdateFullName = async (event) => {
        event.preventDefault();

        if (!fullName.trim()) {
            setMessage("", "Full name is required.");
            return;
        }

        try {
            setLoading("save");
            setMessage();
            const response = await updateAccountDetails({ fullName: fullName.trim() });
            saveUser(response);
        } catch (err) {
            console.log(err);
            setMessage("", err?.response?.data?.message || "Failed to update full name.");
        } finally {
            setLoading("");
        }
    };

    const handleAvatarChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setLoading("avatar");
            setMessage();
            const response = await updateAvatar(file);
            saveUser(response);
        } catch (err) {
            console.log(err);
            setMessage("", err?.response?.data?.message || "Failed to update avatar.");
        } finally {
            setLoading("");
            event.target.value = "";
        }
    };

    const handleCoverChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setLoading("cover");
            setMessage();
            const response = await updateCoverImage(file);
            saveUser(response);
        } catch (err) {
            console.log(err);
            setMessage("", err?.response?.data?.message || "Failed to update display photo.");
        } finally {
            setLoading("");
            event.target.value = "";
        }
    };

    const handleLogout = async () => {
        try {
            setLoading("logout");
            await logoutUser();
        } catch (err) {
            console.log(err);
        } finally {
            logout();
            navigate("/login");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setLoading("delete");
            await deleteAccount();
            logout();
            navigate("/register");
        } catch (err) {
            console.log(err);
            setMessage("", err?.response?.data?.message || "Failed to delete account.");
        } finally {
            setLoading("");
            setShowDeleteConfirm(false);
        }
    };

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-73px)] bg-black p-5 text-white">
                <div className="mx-auto max-w-4xl">
                    <h1 className="m-0 text-2xl font-semibold text-white">
                        Settings
                    </h1>

                    {!activePanel && (
                        <div className="mt-6 rounded-md border border-gray-800 bg-[#0f0f0f]">
                            <button
                                type="button"
                                onClick={() => setActivePanel("account")}
                                className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-gray-900"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-purple-500/15 text-purple-300">
                                        <UserRound size={22} />
                                    </div>
                                    <div>
                                        <h2 className="m-0 text-lg font-semibold text-white">
                                            Account
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Profile photos, full name, logout, and account deletion
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                    

                    {activePanel === "account" && (
                        <>
                            <button
                                type="button"
                                onClick={() => setActivePanel("")}
                                className="mt-5 text-sm font-semibold text-purple-300 hover:text-purple-200"
                            >
                                Back to settings
                            </button>

                            <div className="mt-5 overflow-hidden rounded-md border border-gray-800 bg-[#0f0f0f]">
                                <div
                                    className="h-44 bg-neutral-900"
                                    style={{
                                        backgroundImage: user?.coverImage ? `url(${user.coverImage})` : undefined,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                />

                                <div className="p-5">
                                    <div className="-mt-14 flex flex-col gap-4 border-b border-gray-800 pb-5 md:flex-row md:items-end md:justify-between">
                                        <div className="flex items-end gap-4">
                                            {user?.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user?.fullName || user?.username}
                                                    className="h-28 w-28 rounded-full border-4 border-[#0f0f0f] object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#0f0f0f] bg-gray-900 text-purple-300">
                                                    <UserRound size={56} />
                                                </div>
                                            )}

                                            <div className="pb-2">
                                                <h2 className="m-0 text-2xl font-semibold text-white">
                                                    {user?.fullName || "User"}
                                                </h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    @{user?.username}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <label className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-gray-700 px-4 font-semibold text-white hover:border-purple-500 hover:text-purple-300">
                                                <Upload size={18} />
                                                {loading === "avatar" ? "Uploading..." : "Change avatar photo"}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    className="hidden"
                                                />
                                            </label>

                                            <label className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-gray-700 px-4 font-semibold text-white hover:border-purple-500 hover:text-purple-300">
                                                <Image size={18} />
                                                {loading === "cover" ? "Uploading..." : "Change display photo"}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleCoverChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="mt-5 rounded-md border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                            {error}
                                        </div>
                                    )}

                                    {success && (
                                        <div className="mt-5 rounded-md border border-green-500 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                                            {success}
                                        </div>
                                    )}

                                    <form
                                        onSubmit={handleUpdateFullName}
                                        className="mt-5"
                                    >
                                        <label className="text-sm font-medium text-gray-300">
                                            Change full name
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(event) => setFullName(event.target.value)}
                                                className="mt-2 h-11 w-full rounded-md border border-gray-700 bg-transparent px-4 text-white outline-none focus:border-purple-500"
                                                placeholder="Enter full name"
                                            />
                                        </label>

                                        <button
                                            type="submit"
                                            disabled={loading === "save"}
                                            className="mt-4 flex h-11 items-center justify-center gap-2 rounded-md bg-purple-500 px-4 font-semibold text-black transition hover:bg-purple-400 disabled:opacity-60"
                                        >
                                            <Save size={18} />
                                            {loading === "save" ? "Saving..." : "Save full name"}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="mt-5 rounded-md border border-gray-800 bg-[#0f0f0f] p-5">
                                <h2 className="m-0 text-lg font-semibold text-white">
                                    Logout
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setShowLogoutConfirm(true)}
                                    className="mt-4 flex h-11 items-center justify-center gap-2 rounded-md border border-gray-700 px-4 font-semibold text-white transition hover:border-purple-500 hover:text-purple-300"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>

                            <div className="mt-5 rounded-md border border-red-500/40 bg-red-500/5 p-5">
                                <h2 className="m-0 text-lg font-semibold text-red-300">
                                    Danger zone
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Delete account removes your videos, tweets, comments, likes, playlists, subscriptions, and watch history references.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="mt-4 flex h-11 items-center justify-center gap-2 rounded-md bg-red-600 px-4 font-semibold text-white transition hover:bg-red-500"
                                >
                                    <Trash2 size={18} />
                                    Delete account
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {showLogoutConfirm && (
                    <ConfirmModal
                        title="Are you sure want to exit logout?"
                        body="You will need to login again to upload, comment, like, or manage your account."
                        confirmText={loading === "logout" ? "Logging out..." : "Logout"}
                        tone="normal"
                        onCancel={() => setShowLogoutConfirm(false)}
                        onConfirm={handleLogout}
                    />
                )}

                {showDeleteConfirm && (
                    <ConfirmModal
                        title="Are you want to delete your account?"
                        body="If you are sure, this will delete full detail of it from your account data."
                        confirmText={loading === "delete" ? "Deleting..." : "I'm sure, delete account"}
                        tone="danger"
                        onCancel={() => setShowDeleteConfirm(false)}
                        onConfirm={handleDeleteAccount}
                    />
                )}
            </section>
        </MainLayout>
    );
}

function ConfirmModal({ title, body, confirmText, tone, onCancel, onConfirm }) {
    const isDanger = tone === "danger";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className={`w-full max-w-md rounded-md border bg-[#0f0f0f] p-5 shadow-2xl ${
                isDanger ? "border-red-500/40" : "border-gray-700"
            }`}>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="m-0 text-lg font-semibold text-white">
                            {title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            {body}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-11 rounded-md border border-gray-700 px-4 font-semibold text-white hover:border-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`h-11 rounded-md px-4 font-semibold transition ${
                            isDanger
                                ? "bg-red-600 text-white hover:bg-red-500"
                                : "bg-purple-500 text-black hover:bg-purple-400"
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
