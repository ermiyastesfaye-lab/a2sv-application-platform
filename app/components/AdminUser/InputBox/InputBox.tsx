import React from "react";
  
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputBoxProps {
  title: string;
  placeholder?: string;
  type?: string;
 register?: ReturnType<UseFormRegister<FieldValues>>;
  error?: string;
  disabled?: boolean;
}

const InputBox = ({
  title,
  placeholder,
  type,
  register,
  error,
  disabled,
}: InputBoxProps) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title}
      </label>
      <input
        disabled={disabled}
        {...register}
        type={type || "text"}
        placeholder={placeholder}
        className="border-b-1 border-gray-300 p-1 text-sm w-full outline-none focus:border-sky-600 "
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputBox;
