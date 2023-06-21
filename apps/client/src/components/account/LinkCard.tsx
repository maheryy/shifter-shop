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
      className="flex items-start justify-start gap-3 rounded p-6 shadow transition hover:bg-gray-50"
      to={link}
      {...props}
    >
      <span className="w-14 basis-14 rounded-full bg-primary p-2 text-white">
        {icon}
      </span>
      <span className="flex basis-full flex-col gap-2">
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
