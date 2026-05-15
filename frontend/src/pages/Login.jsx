import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import playlogo from "../assets/PLAYLOGO.jpEg";
import { loginUser } from "../api/authApi";


function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        email: "",
        password: ""

    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true);
            setError("");


            const data = await loginUser(formData);
            console.log(data);


            navigate("/");
        } catch (error) {
            console.log(error);
            setError(
                error?.response?.data?.message ||
                "Login failed"
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
                        alt="logo"
                        className="h-12"
                    />

                </div>


                {/* TITLE */}

                <h1 className="text-3xl font-bold text-center">

                    Login

                </h1>

                <p className="text-gray-400 text-center mt-2">

                    Welcome back to Play

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

                    {/* EMAIL */}

                    <div>

                        <label className="text-sm text-gray-400">

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="
                                w-full
                                mt-2
                                bg-transparent
                                border border-gray-700
                                rounded-lg
                                px-4
                                py-3
                                outline-none
                                focus:border-purple-500
                            "
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div>

                        <label className="text-sm text-gray-400">

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="
                                w-full
                                mt-2
                                bg-transparent
                                border border-gray-700
                                rounded-lg
                                px-4
                                py-3
                                outline-none
                                focus:border-purple-500
                            "
                            required
                        />

                    </div>


                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            mt-3
                            bg-purple-600
                            hover:bg-purple-500
                            transition-all
                            py-3
                            rounded-lg
                            font-semibold
                            disabled:opacity-50
                        "
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>


                {/* REGISTER */}

                <p className="text-gray-400 text-center mt-6 text-sm">

                    Don’t have an account?{" "}

                    <Link
                        to="/register"
                        className="text-purple-400 hover:text-purple-300"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Login;