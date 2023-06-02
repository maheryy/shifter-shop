const QuantityPicker = ({ value, onChange }: QuantityPickerProps) => {
  return (
    <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center text-xl"
        onClick={() => onChange(value > 1 ? value - 1 : 1)}
      >
        -
      </button>
      <span className="flex h-8 w-8 items-center justify-center text-base">
        {value}
      </span>
      <button
        className="flex h-8 w-8 cursor-pointer items-center justify-center text-xl"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
};

interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
}

export default QuantityPicker;
