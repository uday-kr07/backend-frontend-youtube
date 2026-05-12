function CommentSection() {

    return (

        <div className="mt-5 border border-gray-800 rounded-xl p-5">

            <h2 className="text-xl font-semibold">
                Comments
            </h2>


            <input
                type="text"
                placeholder="Add a comment"
                className="w-full mt-5 bg-transparent border border-gray-700 rounded-lg px-4 py-3 outline-none"
            />

            {/* COMMENT */}

            <div className="mt-8 flex gap-4">

                <img
                    src="https://i.pravatar.cc/100"
                    className="w-10 h-10 rounded-full"
                />

                <div>

                    <h3 className="font-semibold">
                        Phoenix Baker
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                        Looks good!
                    </p>

                </div>

            </div>

        </div>

    );
}

export default CommentSection;