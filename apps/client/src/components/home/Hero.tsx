import { Link } from "react-router-dom";

const Hero = ({ title, subtitle, image }: HeroProps) => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage: `url("${image}")`,
      }}
    >
      <div className="container grid gap-12">
        <h1 className="text-6xl font-medium text-white">{title}</h1>
        <p className="text-white md:w-1/2">{subtitle}</p>
        <Link
          className="w-fit rounded-md border border-primary bg-primary px-8 py-3 font-medium 
                    text-white hover:bg-white hover:text-primary"
          to="/products"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default Hero;
