import React from "react";
interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="bg-indigo-700 text-white py-2 px-4 rounded-lg">
      {text}
    </button>
  );
};

export default Button;
