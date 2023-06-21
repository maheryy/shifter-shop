import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return alert("Passwords do not match");
    }
  };

  return (
    <div className="contain py-16">
      <div className="mx-auto max-w-lg overflow-hidden rounded px-6 py-7 shadow">
        <h1 className="mb-8 text-2xl font-medium uppercase">
          Create an account
        </h1>
        <form autoComplete="off" onSubmit={onSubmit}>
          <div className="space-y-2">
            <div className="flex gap-5">
              <div className="flex-1">
                <label className="mb-2 block text-gray-600" htmlFor="firstname">
                  First name
                </label>
                <input
                  className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
                  id="firstname"
                  name="firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Bobby"
                  type="text"
                  value={firstname}
                />
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-gray-600" htmlFor="lastname">
                  Last name
                </label>
                <input
                  className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
                  id="lastname"
                  name="lastname"
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Johnson"
                  type="text"
                  value={lastname}
                />
              </div>
            </div>
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
                placeholder="*********"
                type="password"
                value={password}
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-600" htmlFor="confirm">
                Confirm password
              </label>
              <input
                className="block w-full rounded border border-gray-300 px-4 py-3 text-sm text-gray-600 placeholder:text-gray-400 focus:border-primary focus:ring-0"
                id="confirm"
                name="confirm"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="*********"
                type="password"
                value={passwordConfirm}
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              className="block w-full rounded border border-primary bg-primary py-2 text-center font-roboto font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
              type="submit"
            >
              create account
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have account?&nbsp;
          <Link className="text-primary" to="/login">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
