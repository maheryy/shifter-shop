import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  errorMessage?: string;
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  type: string;
}

function Input<T extends FieldValues>({
  errorMessage,
  id,
  label,
  register,
  type,
}: InputProps<T>) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
        id={id}
        type={type}
        {...register(id)}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default Input;
