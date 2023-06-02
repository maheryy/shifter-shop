import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white pb-12 pt-16">
      <div className="container flex items-center gap-20">
        <div className="basis-1/3 self-start">
          <Logo clickable={false} />
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            ab consequuntur accusantium, ipsa perspiciatis laborum, earum
            voluptates numquam ducimus totam sunt consequatur nobis tempora
            laboriosam perferendis harum.
          </p>
        </div>
        <div className="flex basis-2/3 justify-around gap-10">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Categories
            </h3>
            <div className="mt-4 space-y-4">
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                About us
              </a>
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                Pricing
              </a>
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                Stores
              </a>
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                Blog
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Company
            </h3>
            <div className="mt-4 space-y-4">
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                About us
              </a>
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                Pricing
              </a>
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                Stores
              </a>
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                Blog
              </a>
              <Link
                className="block text-base text-gray-500 hover:text-gray-900"
                to="/business/become-seller"
              >
                Become seller
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </h3>
            <div className="mt-4 space-y-4">
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                About us
              </a>
              <a
                className="block text-base text-gray-500 hover:text-gray-900"
                href="#"
              >
                Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
