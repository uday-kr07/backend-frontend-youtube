import CommentCard from "./CommentCard";

function CommentList({ comments = [] }) {
    if (!comments.length) {
        return (
            <p className="mt-6 rounded-md border border-dashed border-gray-800 p-6 text-center text-gray-500">
                No comments yet.
            </p>
        );
    }

    return (
        <div className="mt-4">
            {comments.map((comment) => (
                <CommentCard
                    key={comment._id}
                    comment={comment}
                />
            ))}
        </div>
    );
}

export default CommentList;
