import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

function Button({
  children,
  disabled,
  isLoading,
  type = "submit",
  ...props
}: ButtonProps) {
  const buttonClass = classNames(
    "w-full md:max-w-md py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium uppercase text-sm",
    {
      "bg-gray-200 cursor-not-allowed": disabled,
    },
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
