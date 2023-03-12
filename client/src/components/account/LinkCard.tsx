import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";

const LinkCard = ({
  title,
  description,
  link,
  Icon,
  ...props
}: LinkCardProps) => {
  return (
    <Link
      to={link}
      className="shadow rounded flex items-start justify-start gap-3 p-6 hover:bg-slate-100 transition"
      {...props}
    >
      <span className="basis-14 w-14 p-2 rounded-full bg-primary text-white">
        <Icon />
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
  Icon: string;
  link: string;
}

export default LinkCard;
