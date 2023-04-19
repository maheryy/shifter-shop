import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

const LinkCard = ({
  title,
  description,
  link,
  icon,
  ...props
}: LinkCardProps) => {
  return (
    <Link
      to={link}
      className="shadow rounded flex items-start justify-start gap-3 p-6 hover:bg-gray-50 transition"
      {...props}
    >
      <span className="basis-14 w-14 p-2 rounded-full bg-primary text-white">
        {icon}
      </span>
      <span className="basis-full flex flex-col gap-2">
        <span className="text-base font-medium capitalize">{title}</span>
        <span className="text-sm leading-5">{description}</span>
      </span>
    </Link>
  );
};

interface LinkCardProps extends ComponentPropsWithoutRef<"a"> {
  title: string;
  description: string;
  link: string;
  icon: ReactNode;
}

export default LinkCard;
