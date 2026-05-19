import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addComment, getVideoComments } from "../../api/commentsApi";
import { useAuth } from "../../context/AuthContext";
import CommentList from "./CommentList";

function CommentSection({ videoId }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            if (!videoId) return;

            try {
                setLoading(true);
                const response = await getVideoComments(videoId);
                setComments(response.data?.docs || response.data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [videoId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            navigate("/login");
            return;
        }

        if (!content.trim() || posting) return;

        try {
            setPosting(true);
            const response = await addComment(videoId, content.trim());
            const createdComment = {
                ...response.data,
                owner: user,
                likesCount: 0,
                isLiked: false,
                createdAt: new Date().toISOString(),
            };

            setComments((items) => [createdComment, ...items]);
            setContent("");
        } catch (error) {
            console.log(error);
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className="mt-5 rounded-md border border-gray-800 p-5">
            <h2 className="m-0 text-xl font-semibold text-white">
                Comments
            </h2>

            <form
                onSubmit={handleSubmit}
                className="mt-5 flex gap-3"
            >
                <input
                    type="text"
                    placeholder={user ? "Add a comment" : "Log in to comment"}
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="h-11 min-w-0 flex-1 rounded-md border border-gray-700 bg-transparent px-4 outline-none focus:border-purple-500"
                />

                <button
                    type="submit"
                    disabled={posting || !content.trim()}
                    className="flex h-11 items-center justify-center rounded-md bg-purple-500 px-4 font-semibold text-black transition hover:bg-purple-400 disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </form>

            {loading ? (
                <p className="mt-6 text-gray-500">Loading comments...</p>
            ) : (
                <CommentList comments={comments} />
            )}
        </div>
    );
}

export default CommentSection;
