import { Link } from "react-router-dom";

const Banner = ({ title, subtitle, image }: BannerProps) => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage: `url("${image}")`,
      }}
    >
      <div className="container flex flex-col gap-12">
        <div>
          <h1 className="w-2/5 text-6xl font-medium text-white">{title}</h1>
          <p className="mt-4 w-2/5 text-white">{subtitle}</p>
        </div>
        <div className="">
          <Link
            className="rounded-md border border-primary bg-primary px-8 py-3 font-medium 
                    text-white hover:bg-transparent hover:text-primary"
            to="/products"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

interface BannerProps {
  title: string;
  subtitle: string;
  image: string;
}

export default Banner;
