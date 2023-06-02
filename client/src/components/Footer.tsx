import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
      <div className="container flex items-center gap-20">
        <div className="self-start basis-1/3">
          <Logo clickable={false} />
          <p className="text-gray-500 mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            ab consequuntur accusantium, ipsa perspiciatis laborum, earum
            voluptates numquam ducimus totam sunt consequatur nobis tempora
            laboriosam perferendis harum.
          </p>
        </div>
        <div className="flex justify-around gap-10 basis-2/3">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Categories
            </h3>
            <div className="mt-4 space-y-4">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                About us
              </a>
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Stores
              </a>
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Blog
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Company
            </h3>
            <div className="mt-4 space-y-4">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                About us
              </a>
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Stores
              </a>
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                Blog
              </a>
              <Link
                className="text-base text-gray-500 hover:text-gray-900 block"
                to="/business/become-seller"
              >
                Become seller
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Contact
            </h3>
            <div className="mt-4 space-y-4">
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
              >
                About us
              </a>
              <a
                href="#"
                className="text-base text-gray-500 hover:text-gray-900 block"
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
