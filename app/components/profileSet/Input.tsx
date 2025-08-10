import React from "react";

interface InputProps {
  type: string;
  id: string;
  defaultValue?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

const Input = ({
  type,
  id,
  defaultValue,
  value,
  onChange,
  disabled,
  className,
  min,
  max,
  step,
}: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      className={`w-full px-3 py-1 border border-gray-100 rounded-xl focus:outline-none focus:ring-0 focus:border-gray-200 shadow-sm text-gray-950 ${
        className || ""
      }`}
    />
  );
};

export default Input;
