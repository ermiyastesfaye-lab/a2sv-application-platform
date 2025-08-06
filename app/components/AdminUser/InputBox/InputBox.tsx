import React from "react";
interface InputBoxProps {
  title: string;
  placeholder?: string;
  type?: string;
  value?: string;
}

const InputBox = ({ title, placeholder, type, value }: InputBoxProps) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {title}
      </label>
      <input
        value={value}
        type={type || "text"}
        placeholder={placeholder}
        className="border-b-1 border-gray-300 p-1 text-sm w-full outline-none focus:border-sky-600 "
      />
    </div>
  );
};

export default InputBox;
