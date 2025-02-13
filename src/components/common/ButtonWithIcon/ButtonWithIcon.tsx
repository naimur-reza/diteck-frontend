import { MoveRight } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonWithIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  text,
  ...rest
}) => {
  return (
    <button {...rest}>
      <div className="relative flex items-center min-w-[180px] max-w-fit h-12 rounded-[10px] bg-white border border-gray-200 px-1 py-1 overflow-hidden cursor-pointer group">
        <span className="flex items-center overflow-hidden w-10 h-10 rounded-[10px] bg-[#5865F2] transition-all duration-500 ease-in-out group-hover:w-full group-hover:justify-between px-3">
          <MoveRight className="text-white transition-transform duration-500 group-hover:translate-x-0" />
          <span className="absolute right-3 overflow-hidden opacity-0 translate-y-8 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 text-white ">
            {text || "Button"}
          </span>
        </span>

        <p className="absolute right-3 transition-all overflow-hidden duration-400 ease-in-out group-hover:-translate-y-8">
          {text || "Button"}
        </p>
      </div>
    </button>
  );
};
