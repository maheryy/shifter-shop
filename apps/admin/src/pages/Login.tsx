import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, getUser } from "@/api/user.api";
import { useAuthContext } from "@/hooks/context";
import AdminPicture from "@/assets/images/admin.webp";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { authenticate } = useAuthContext();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const { token } = await getAuthToken({ email, password });
            const user = await getUser(token);

            authenticate(user, token);
            navigate("/");
        } catch (e: unknown) {
            console.error((e as Error).message);
        }
    };


    return (
        <>
            <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                <div
                    className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
                >
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img
                                aria-hidden="true"
                                className="object-cover w-full h-full dark:hidden"
                                src={AdminPicture}
                                alt="Office"
                            />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">
                                <h1
                                    className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
                                >
                                    Login
                                </h1>
                                <form onSubmit={onSubmit} autoComplete="off">
                                    <label className="block text-sm">
                                        <span className="text-gray-700 dark:text-gray-400">Email</span>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                            placeholder="admin@shiftershop.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </label>
                                    <label className="block mt-4 text-sm">
                                        <span className="text-gray-700 dark:text-gray-400">Password</span>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            id="password"
                                            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                            placeholder="***************"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    >
                                        Log in
                                    </button>
                                    <hr className="my-8" />
                                    <p className="mt-4">
                                        <Link
                                            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                            to="/forgot-password"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;