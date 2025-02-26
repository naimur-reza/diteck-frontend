import { MoveRight } from "lucide-react";
import Link from "next/link";

export const LinkButtonWithIcon = ({
  text,
  link,
  invertedBorder = true,
  position = "center",
  textColor = "text-black",
  bgColor = "bg-transparent",
  isBorder = true,
  invertedBgColor = "bg-[#F2F1F6]",
  minWidth = 180,
  className,
}: {
  text: string;
  link: string;
  invertedBorder?: boolean;
  position?: "start" | "center" | "end";
  textColor?: string;
  bgColor?: string;
  isBorder?: boolean;
  invertedBgColor?: string;
  minWidth?: number;
  className?: string;
}) => {
  const positioning = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  return (
    <div
      className={`flex relative ${className} ${positioning[position]} w-full mx-auto`}
    >
      <Link className="" href={link ? link : "/"}>
        <div
          className={`relative flex items-center  w-full  cursor-pointer group  ${
            invertedBorder
              ? `px-3 pt-2 rounded-t-[20px] linkButtonWithIcon ${invertedBgColor}`
              : isBorder
              ? `border border-white/30 rounded-[20px] px-1.5 py-0.5 ${bgColor}`
              : `rounded-[20px] px-1.5 py-0.5 ${bgColor}`
          }`}
        >
          <div
            style={{ minWidth: `${minWidth}px` }}
            className={`relative flex items-center  w-full h-12 overflow-hidden`}
          >
            <span className="flex items-center w-10 h-10 rounded-[15px] bg-[#5865F2] transition-all duration-400 ease-in-out group-hover:w-full group-hover:justify-between px-3">
              <MoveRight className="text-white transition-transform duration-500 group-hover:translate-x-0" />
              <span
                className={`absolute right-3 opacity-0 font-semibold translate-y-8 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 text-white`}
              >
                {text ? text : "Get in touch"}
              </span>
            </span>

            <p
              className={`absolute right-3 font-semibold transition-all  ease-[0.4s]   group-hover:opacity-0 group-hover:-translate-y-8 opacity-100 ${textColor}`}
            >
              {text ? text : "Get in touch"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
