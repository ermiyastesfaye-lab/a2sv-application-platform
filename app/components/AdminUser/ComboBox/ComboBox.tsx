import React from "react";

interface Option {
  value: string;
  label: string;
}

interface ComboBoxProps {
  label: string;
  options: Option[];
  register?: any;
  error?: any;

  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ComboBox = ({
  label,
  options,
  register,
  error,
  onChange,
}: ComboBoxProps) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="border rounded-lg border-gray-300 p-2 text-sm outline-none focus:border-sky-400 w-full"
        {...register}
        onChange={onChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default ComboBox;
