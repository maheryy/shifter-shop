import { Link } from "react-router-dom";

const Logo = ({ clickable = true }: LogoProps) => {
  const linkProps: LinkProps = clickable
    ? { to: "/" }
    : { to: "#", className: "pointer-events-none" };

  return (
    <Link {...linkProps} className="grid items-center text-xl">
      Shifter Shop
    </Link>
  );
};

interface LogoProps {
  clickable?: boolean;
}

interface LinkProps {
  to: string;
  className?: string;
}

export default Logo;
