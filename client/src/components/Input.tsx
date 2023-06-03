import classNames from "classnames";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues>
  extends React.HTMLProps<HTMLInputElement> {
  errorMessage?: string;
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
}

function Input<T extends FieldValues>({
  disabled,
  errorMessage,
  id,
  label,
  register,
  ...props
}: InputProps<T>) {
  const inputClass = classNames(
    "md:w-96 block border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400",
    {
      "bg-gray-200 cursor-not-allowed": disabled,
    },
  );

  return (
    <div className="grid w-full gap-2 md:max-w-md md:justify-center">
      <label htmlFor={id}>{label}</label>
      <input
        className={inputClass}
        disabled={disabled}
        id={id}
        {...register(id)}
        {...props}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default Input;
