import React from "react";

interface Option {
  value: string;
  label: string;
}

interface ComboBoxProps {
  label: string;
  options: Option[];
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ComboBox = ({ label, options, name, value, onChange }: ComboBoxProps) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="border rounded-lg border-gray-300 p-2 text-sm outline-none focus:border-sky-400 w-full"
        name={name}
        value={value}
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
    </div>
  );
};

export default ComboBox;
