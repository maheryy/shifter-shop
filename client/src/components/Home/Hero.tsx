import { Link } from "react-router-dom";

const Banner = ({ title, subtitle, image }: BannerProps) => {
  return (
    <section
      className="bg-cover bg-no-repeat bg-center py-24"
      style={{
        backgroundImage: `url("${image}")`,
      }}
    >
      <div className="container flex flex-col gap-12">
        <div>
          <h1 className="text-6xl text-white font-medium w-2/5">{title}</h1>
          <p className="text-white w-2/5 mt-4">{subtitle}</p>
        </div>
        <div className="">
          <Link
            to="/products"
            className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary"
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
