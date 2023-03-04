const QuantityPicker = ({ value, onChange }: QuantityPickerProps) => {
  return (
    <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
      <button
        onClick={() => onChange(value > 1 ? value - 1 : 1)}
        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
      >
        -
      </button>
      <span className="h-8 w-8 text-base flex items-center justify-center">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer"
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
