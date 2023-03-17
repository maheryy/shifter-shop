import { Link } from "react-router-dom";

const Ad = ({ title, subtitle, image }: AdProps) => {
  return (
    <div
      className="border-gray-200 border-2 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center gap-12 z-50 py-10">
        <div>
          <h2 className="text-5xl text-white font-medium uppercase">{title}</h2>
          <p className="font-roboto text-white text-2xl mt-4 font-thin text-center">
            {subtitle}
          </p>
        </div>
        <Link
          to="/products"
          className="bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md"
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
