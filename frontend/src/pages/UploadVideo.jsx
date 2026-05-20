import { Image, Loader2, Upload, Video } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideoBy } from "../api/videoApi";
import MainLayout from "../layouts/MainLayout";

function UploadVideo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        videoFile: null,
        thumbnail: null,
        isPublished: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const thumbnailPreview = useMemo(() => {
        if (!formData.thumbnail) return "";

        return URL.createObjectURL(formData.thumbnail);
    }, [formData.thumbnail]);

    useEffect(() => {
        return () => {
            if (thumbnailPreview) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview]);

    const handleChange = (event) => {
        const { name, value, files, checked, type } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : files ? files[0] : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.videoFile || !formData.thumbnail) {
            setError("Video file and thumbnail are required.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const submitData = new FormData();
            submitData.append("title", formData.title.trim());
            submitData.append("description", formData.description.trim());
            submitData.append("videoFile", formData.videoFile);
            submitData.append("thumbnail", formData.thumbnail);
            submitData.append("isPublished", String(formData.isPublished));

            await uploadVideoBy(submitData);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            setError(
                err?.response?.data?.message ||
                "Video upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <section className="min-h-[calc(100vh-73px)] bg-black p-5 text-white">
                <div className="mx-auto max-w-5xl">
                    <div className="flex flex-col gap-4 border-b border-gray-800 pb-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="m-0 text-2xl font-semibold text-white">
                                Upload video
                            </h1>
                            <p className="mt-2 text-sm text-gray-500">
                                Only logged-in users can upload. The video is saved under your account.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="h-10 rounded-md border border-gray-700 px-4 font-semibold text-white hover:border-purple-500 hover:text-purple-300"
                        >
                            Dashboard
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]"
                    >
                        <div className="rounded-md border border-gray-800 bg-[#0f0f0f] p-5">
                            {error && (
                                <div className="mb-5 rounded-md border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                    {error}
                                </div>
                            )}

                            <label className="block text-sm font-medium text-gray-300">
                                Title
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Video title"
                                    className="mt-2 h-11 w-full rounded-md border border-gray-700 bg-transparent px-4 text-white outline-none focus:border-purple-500"
                                    required
                                />
                            </label>

                            <label className="mt-5 block text-sm font-medium text-gray-300">
                                Description
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your video"
                                    rows={7}
                                    className="mt-2 w-full resize-none rounded-md border border-gray-700 bg-transparent px-4 py-3 text-white outline-none focus:border-purple-500"
                                    required
                                />
                            </label>

                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-700 bg-black/40 p-6 text-center hover:border-purple-500">
                                    <Video
                                        size={30}
                                        className="text-purple-300"
                                    />
                                    <span className="mt-3 max-w-full truncate font-semibold text-white">
                                        {formData.videoFile?.name || "Choose video"}
                                    </span>
                                    <span className="mt-1 text-xs text-gray-500">
                                        MP4, WebM, MOV
                                    </span>
                                    <input
                                        type="file"
                                        name="videoFile"
                                        accept="video/*"
                                        onChange={handleChange}
                                        className="hidden"
                                        required
                                    />
                                </label>

                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-700 bg-black/40 p-6 text-center hover:border-purple-500">
                                    <Image
                                        size={30}
                                        className="text-purple-300"
                                    />
                                    <span className="mt-3 max-w-full truncate font-semibold text-white">
                                        {formData.thumbnail?.name || "Choose thumbnail"}
                                    </span>
                                    <span className="mt-1 text-xs text-gray-500">
                                        JPG, PNG, WebP
                                    </span>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="hidden"
                                        required
                                    />
                                </label>
                            </div>

                            <label className="mt-5 flex items-center gap-3 text-sm text-gray-300">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={formData.isPublished}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-purple-500"
                                />
                                Publish immediately so everyone can find it on Home and Search
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-6 flex h-11 items-center justify-center gap-2 rounded-md bg-purple-500 px-5 font-semibold text-black transition hover:bg-purple-400 disabled:opacity-60"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                                {loading ? "Uploading..." : "Upload video"}
                            </button>
                        </div>

                        <aside className="rounded-md border border-gray-800 bg-[#0f0f0f] p-5">
                            <h2 className="m-0 text-lg font-semibold text-white">
                                Preview
                            </h2>

                            <div className="mt-4 aspect-video overflow-hidden rounded-md bg-gray-900">
                                {thumbnailPreview ? (
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-gray-500">
                                        <Image size={34} />
                                    </div>
                                )}
                            </div>

                            <h3 className="mt-4 line-clamp-2 font-semibold text-white">
                                {formData.title || "Video title"}
                            </h3>
                            <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-500">
                                {formData.description || "Video description"}
                            </p>
                        </aside>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
}

export default UploadVideo;
