import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white pb-12 pt-16">
      <div className="container grid gap-12 md:grid-cols-2">
        <div className="grid gap-4">
          <Logo clickable={false} />
          <p className=" text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            ab consequuntur accusantium, ipsa perspiciatis laborum, earum
            voluptates numquam ducimus totam sunt consequatur nobis tempora
            laboriosam perferendis harum.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid h-fit gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </h3>
            <ul className="grid gap-2">
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  Stores
                </Link>
              </li>
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid h-fit gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Company
            </h3>
            <ul className="grid gap-2">
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  Stores
                </Link>
              </li>
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="/business/become-seller"
                >
                  Become seller
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid h-fit gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </h3>
            <ul className="grid gap-2">
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className="block text-base text-gray-500 hover:text-gray-900"
                  to="#"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
