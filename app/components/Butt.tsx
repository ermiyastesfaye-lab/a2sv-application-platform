import React from "react";
interface ButtonProps {
  text: string;
  onclick?: () => void;
}

const Button = ({ text, onclick }: ButtonProps) => {
  return (
    <button
      className="bg-indigo-700 text-white py-2 px-4 rounded-lg"
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
