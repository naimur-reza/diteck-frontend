import { LinkButtonWithIcon } from "@/components/common";
import Image from "next/image";

export const SidebarAds = () => {
  return (
    <div className="bg-primary p-16 sidebarAds  relative rounded-3xl font-medium h-[500px] min-h-[460px] text-white  w-full">
      <div className="flex items-center gap-x-2">
        <span className="size-[6px] rounded-[1px] bg-white"></span>
        <h4 className="text-lg ">Just starting out ?</h4>
      </div>
      <div>
        <h2 className="mt-2 text-[42px] z-10 relative  leading-[45px] ">
          Download a computer brochure
        </h2>
      </div>
      <div className="absolute bottom-16 right-5  ">
        <Image
          src={
            "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/service-detail_sidebar.png"
          }
          alt="image"
          width={265}
          height={266}
          className="max-w-full h-auto  "
        />
      </div>
      <div className="bg-[#F2F1F6]  absolute p-1 rounded-tl-2xl right-0 bottom-0">
        <LinkButtonWithIcon
          link="/"
          text="Get a copy"
          invertedBorder={false}
          isBorder={false}
          bgColor="bg-[#F2F1F6]"
        />
      </div>
    </div>
  );
};
