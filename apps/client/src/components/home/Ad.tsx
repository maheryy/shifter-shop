import { Link } from "react-router-dom";

const Ad = ({ title, subtitle, image }: AdProps) => {
  return (
    <div
      className="border-2 border-gray-200 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="flex flex-col items-center justify-center gap-12 bg-black/50 p-10">
        <h2 className="text-center text-5xl font-medium uppercase text-white">
          {title}
        </h2>
        <p className="text-center font-roboto text-2xl font-thin text-white">
          {subtitle}
        </p>
        <Link
          className="rounded-md border border-primary bg-primary px-8 py-3 font-medium 
                    text-white"
          to="/products"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

interface AdProps {
  title: string;
  subtitle: string;
  image: string;
}

export default Ad;
