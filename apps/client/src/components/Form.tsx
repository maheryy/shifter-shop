import classNames from "classnames";
import { HTMLAttributes } from "react";

function Form({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  return (
    <form className={classNames("grid w-full gap-8", className)} {...props}>
      {children}
    </form>
  );
}

export default Form;
