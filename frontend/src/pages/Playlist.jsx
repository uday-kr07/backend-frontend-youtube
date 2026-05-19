import { ListPlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    createPlaylist,
    deletePlaylist,
    getUserPlaylists,
} from "../api/playlistApi";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import { formatViews } from "../utils/formatViews";

function Playlist() {
    const { user } = useAuth();
    const [playlists, setPlaylists] = useState([]);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
            if (!user?._id) return;

            try {
                const response = await getUserPlaylists(user._id);
                setPlaylists(response.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, [user?._id]);

    const handleCreate = async (event) => {
        event.preventDefault();

        if (!formData.name.trim() || !formData.description.trim()) return;

        try {
            const response = await createPlaylist({
                name: formData.name.trim(),
                description: formData.description.trim(),
            });

            setPlaylists((items) => [response.data, ...items]);
            setFormData({ name: "", description: "" });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (playlistId) => {
        try {
            await deletePlaylist(playlistId);
            setPlaylists((items) => items.filter((playlist) => playlist._id !== playlistId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-83px)] bg-black p-5 text-white">
                <h1 className="m-0 text-2xl font-semibold text-white">
                    Playlists
                </h1>

                <form
                    onSubmit={handleCreate}
                    className="mt-6 grid gap-3 rounded-md border border-gray-800 bg-[#0f0f0f] p-4 lg:grid-cols-[1fr_2fr_auto]"
                >
                    <input
                        type="text"
                        placeholder="Playlist name"
                        value={formData.name}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                        className="h-11 rounded-md border border-gray-700 bg-transparent px-4 outline-none focus:border-purple-500"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                        className="h-11 rounded-md border border-gray-700 bg-transparent px-4 outline-none focus:border-purple-500"
                    />
                    <button
                        type="submit"
                        className="flex h-11 items-center justify-center gap-2 rounded-md bg-purple-500 px-4 font-semibold text-black hover:bg-purple-400"
                    >
                        <ListPlus size={18} />
                        Create
                    </button>
                </form>

                {loading ? (
                    <p className="mt-8 text-gray-500">Loading playlists...</p>
                ) : playlists.length === 0 ? (
                    <p className="mt-8 rounded-md border border-dashed border-gray-800 p-8 text-center text-gray-500">
                        No playlists yet.
                    </p>
                ) : (
                    <div className="mt-6 grid gap-4 lg:grid-cols-2">
                        {playlists.map((playlist) => (
                            <article
                                key={playlist._id}
                                className="rounded-md border border-gray-800 bg-[#0f0f0f] p-5"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="m-0 text-lg font-semibold text-white">
                                            {playlist.name}
                                        </h2>
                                        <p className="mt-2 text-sm leading-6 text-gray-400">
                                            {playlist.description}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(playlist._id)}
                                        className="rounded-md bg-gray-900 p-2 text-gray-300 hover:bg-red-500 hover:text-white"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <p className="mt-5 text-sm text-gray-500">
                                    {playlist.totalVideos || 0} videos - {formatViews(playlist.totalViews)} views
                                </p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}

export default Playlist;
