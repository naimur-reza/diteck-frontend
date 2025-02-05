import { MoveRight } from "lucide-react";

export const LinkButtonWithIcon = () => {
  return (
    <div className="relative flex items-center w-[200px] rounded-[10px] bg-white border border-gray-200 pl-1 py-1 overflow-hidden cursor-pointer group">
      {/* Icon + Background Container */}
      <span className="flex items-center w-10 h-10 rounded-[10px] bg-[#5865F2] transition-all duration-500 ease-in-out group-hover:w-full group-hover:justify-between px-3">
        <MoveRight className="text-white transition-transform duration-500 group-hover:translate-x-0" />
        <span className="absolute opacity-0  transition-all duration-500 ease-in-out group-hover:opacity-100 text-white group-hover:relative">
          Get in touch
        </span>
      </span>

      {/* Default "Get in touch" - Only Visible Before Hover */}
      <p className="absolute right-5 transition-all duration-200 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
        Get in touch
      </p>
    </div>
  );
};
