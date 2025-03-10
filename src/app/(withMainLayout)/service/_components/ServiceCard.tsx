import { LinkButtonWithIcon } from "@/components/common";
import { TService } from "@/types";
import Image from "next/image";

export const ServiceCard = ({ item }: { item: TService }) => {
  return (
    <div className="cursor-pointer relative flex flex-col md:flex-row h-auto md:h-[500px] w-full bg-white rounded-2xl overflow-hidden gap-6 md:gap-8">
      {/* Left Side - Content */}
      <div className="px-6 py-8 md:py-12 md:px-8 lg:px-12 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2">
            {/* <Image
              src={item.icon}
              alt="icon"
              width={32}
              height={32}
              className="w-8 h-8"
            /> */}
          </div>
          <h3 className="text-2xl md:text-[32px] max-w-[320px] font-medium my-4 leading-snug">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm md:text-base max-w-[320px]">
            {item.description}
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <LinkButtonWithIcon
            link={`/service/${item.title}`}
            text="Learn more"
            invertedBorder={false}
            position="start"
            isBorder={false}
          />
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 p-2 md:p-0">
        <Image
          src={item.photo}
          alt="service"
          height={500}
          width={500}
          className="w-full h-[250px] rounded-2xl  md:h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
};
