import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  type = "text",
  placeholder,
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-white py-[16px] px-[25px] rounded-[20px] text-[16px] text-accent outline-0"
      {...rest}
    />
  );
};

export default Input;
