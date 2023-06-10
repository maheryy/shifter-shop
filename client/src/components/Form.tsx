import classNames from "classnames";
import { HTMLAttributes } from "react";

function Form({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      className={classNames("grid gap-8 lg:grid-cols-2", className)}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
