import React from "react";

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  placeholder,
  rows = 4,
  ...rest
}) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white py-[16px] px-[25px] rounded-[20px] text-[16px] text-accent outline-0 resize-none"
      {...rest}
    />
  );
};

export default Textarea;
