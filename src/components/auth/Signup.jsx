import { Brain } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const Signup = function ({ handleSetUser }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        console.log(e);
        const formData = new FormData(e.target);

        const userObject = {};
        for (const [key, value] of formData) {
            userObject[key] = value;
        }
        localStorage.setItem("user", JSON.stringify(userObject));
        handleSetUser(userObject);

        setTimeout(() => {
            setIsLoading(false);

            navigate("/dashboard");
            toast.success("Account Created");
        }, 2000);
    };

    return (
        <div className="flex-grow flex flex-col items-center justify-center w-full px-4">
            <div className="w-full max-w-md rounded-2xl bg-gray-100 p-8 flex flex-col items-center">
                <div className="text-center w-full">
                    <div className="flex justify-center">
                        <div className="p-4 bg-[#52357B] rounded-3xl">
                            <Brain className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#52357B] to-[#5459AC] text-transparent bg-clip-text text-2xl font-bold mb-2  py-3">
                        Study AI
                    </div>
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold mb-2">
                            Join StudyAI
                        </h1>
                        <p className="text-gray-600">
                            Start your smart learning journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-left text-sm font-medium text-gray-700 mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                name="name"
                                disabled={isLoading}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Name"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-left text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                disabled={isLoading}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="student@university.edu"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-left text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                disabled={isLoading}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="disabled:opacity-30 disabled:cursor-not-allowed  w-full bg-gradient-to-r from-[#52357B] to-[#5459AC] text-white py-3 px-5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Create Account
                        </button>
                    </form>
                    <div className="py-4">
                        <Link
                            to="/auth/login"
                            className="text-[#52357B] hover:text-[#5459AC]"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
