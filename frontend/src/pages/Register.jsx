import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import playlogo from "../assets/PLAYLOGO.jpeg";
import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";


function Register() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({

        username: "",
        fullName: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value

        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true);
            setError("");


            const submitData = new FormData();

            submitData.append("username", formData.username);
            submitData.append("fullName", formData.fullName);
            submitData.append("email", formData.email);
            submitData.append("password", formData.password);
            submitData.append("avatar", formData.avatar);

            if (formData.coverImage) {

                submitData.append(
                    "coverImage",
                    formData.coverImage
                );
            }


            const data = await registerUser(submitData);
                console.log(data);

            login(data.data);

            navigate("/profile");

        } catch (error) {

            console.log(error);

            setError(
                error?.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
            <div className="w-full max-w-md border border-gray-800 rounded-2xl p-8 bg-[#0f0f0f]">

                {/* LOGO */}

                <div className="flex justify-center mb-8">

                    <img
                        src={playlogo}
                        className="h-12"
                    />
                </div>


                {/* TITLE */}

                <h1 className="text-3xl font-bold text-center">
                    Create Account
                </h1>

                <p className="text-gray-400 text-center mt-2">
                    Join Play today
                </p>

                {/* ERROR */}

                {error && (

                    <div className="mt-5 bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>

                )}


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col gap-5"
                >
                    {/* USERNAME */}

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
                        required
                    />


                    {/* FULL NAME */}

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
                        required
                    />


                    {/* EMAIL */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
                        required
                    />


                    {/* PASSWORD */}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
                        required
                    />


                    {/* AVATAR */}

                    <div>
                        <label className="text-sm text-gray-400">
                            Avatar
                        </label>

                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full mt-2 text-sm"
                            required
                        />

                    </div>


                    {/* COVER IMAGE */}

                    <div>

                        <label className="text-sm text-gray-400">
                            Cover Image
                        </label>

                        <input
                            type="file"
                            name="coverImage"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full mt-2 text-sm"
                        />

                    </div>


                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-500 transition-all py-3 rounded-lg font-semibold disabled:opacity-50"
                    >

                        {loading
                            ? "Creating..."
                            : "Create Account"
                        }

                    </button>

                </form>


                {/* LOGIN */}

                <p className="text-gray-400 text-center mt-6 text-sm">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-purple-400 hover:text-purple-300"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Register;
