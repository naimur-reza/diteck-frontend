import { MoveRight } from "lucide-react";
import Link from "next/link";

export const LinkButtonWithIcon = ({
  text,
  link,
  invertedBorder = true,
  position = "center",
  textColor = "text-black",
}: {
  text: string;
  link: string;
  invertedBorder?: boolean;
  position?: "start" | "center" | "end";
  textColor?: string;
}) => {
  const positioning = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };
  return (
    <div className={`flex relative ${positioning[position]} w-full mx-auto`}>
      <Link className="" href={link ? link : "/"}>
        <div
          className={`relative  flex items-center min-w-[180px] w-fit   h-12       ${
            invertedBorder
              ? "bg-[#F2F1F6] px-3 pt-5 rounded-t-[20px] linkButtonWithIcon"
              : "border border-gray-200  bg-white rounded-[20px] px-1 py-1"
          }     cursor-pointer group`}
        >
          <div className="relative  flex items-center min-w-[180px] w-fit   h-12 overflow-hidden">
            <span className="flex items-center w-10 h-10 rounded-[15px] bg-[#5865F2]  transition-all duration-500 ease-in-out group-hover:w-full group-hover:justify-between px-3">
              <MoveRight className="text-white transition-transform duration-500 group-hover:translate-x-0" />
              <span
                className={`absolute right-5 opacity-0 translate-y-8 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 text-white`}
              >
                {text ? text : "Get in touch"}
              </span>
            </span>

            <p
              className={`absolute right-3  transition-all  duration-300 ease-in-out  group-hover:-translate-y-8 group-hover:opacity-0 ${textColor}`}
            >
              {text ? text : "Get in touch"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
