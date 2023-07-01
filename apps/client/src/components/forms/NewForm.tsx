import React from "react";

const FormsPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Forms</h2>
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="shadow-xs min-w-0 rounded-lg bg-white p-4">
          <h4 className="mb-4 font-semibold text-gray-800">Form 1</h4>
          <form>
            <label className="block">
              <span className="text-gray-700">Username</span>
              <input
                className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
                type="text"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-gray-700">Email address</span>
              <input
                className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
                type="email"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-gray-700">Password</span>
              <input
                className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
                type="password"
              />
            </label>
            <div className="mt-4 flex justify-end">
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="shadow-xs min-w-0 rounded-lg bg-white p-4">
          <h4 className="mb-4 font-semibold text-gray-800">Form 2</h4>
          <form>
            <label className="block">
              <span className="text-gray-700">Full name</span>
              <input
                className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
                type="text"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-gray-700">Email address</span>
              <input
                className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
                type="email"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-gray-700">Message</span>
              <textarea
                className="mt-1 block w-full rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0"
                rows={3}
              ></textarea>
            </label>
            <div className="mt-4 flex justify-end">
              <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormsPage;
