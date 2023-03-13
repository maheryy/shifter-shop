import { FormEvent, useState } from "react";
import { useAuthContext } from "../../hooks/context";

const Profile = () => {
  const { user } = useAuthContext();
  const [firstname, setFirstname] = useState(user!.firstname || "");
  const [lastname, setLastname] = useState(user!.lastname || "");
  const [email, setEmail] = useState(user!.email || "");
  const [phone, setPhone] = useState(user!.phone || "");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <h1 className="text-xl capitalize font-medium mb-6">
        Profile information
      </h1>
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                disabled
              />
            </div>
            <div>
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium uppercase text-sm"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
