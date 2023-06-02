import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthToken, getUser } from "@/api/user.api";
import { useAuthContext } from "@/hooks/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { authenticate } = useAuthContext();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = await getAuthToken(email, password);
      const user = await getUser(token);

      authenticate(user, token);
      navigate("/");
    } catch (e: unknown) {
      console.error((e as Error).message);
    }
  };

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h1 className="mb-8 text-2xl font-medium uppercase">Login</h1>
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className="space-y-2">
            <div>
              <label className="mb-2 block text-gray-600" htmlFor="email">
                Email address
              </label>
              <input
                className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                type="email"
                value={email}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
                required
                type="password"
                value={password}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="cursor-pointer rounded-sm text-primary focus:ring-0"
                id="remember"
                name="remember"
                type="checkbox"
              />
              <label
                className="ml-3 cursor-pointer text-gray-600"
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            <Link className="text-primary" to="#">
              Forgot password
            </Link>
          </div>
          <div className="mt-4">
            <button
              className="block w-full rounded border border-primary bg-primary py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have account?&nbsp;
          <Link className="text-primary" to="/register">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
