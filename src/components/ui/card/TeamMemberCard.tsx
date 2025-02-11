import { PlusIcon } from "lucide-react";

interface TMemBer {
  imgUrl: string;
  name: string;
  position: string;
}
export const TeamMemberCard = ({ item }: { item: TMemBer }) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] group cursor-pointer ">
      {/* image */}
      <div
        className="relative teamMember bg-cover  bg-no-repeat h-[500px]  w-full   "
        style={{
          backgroundImage: `url(${item.imgUrl})`,
        }}
      ></div>
      <div className=" z-10 absolute inset-x-0 h-0 group-hover:h-[300px] duration-500  bottom-0 bg-gradient-to-t from-[#5963c8]/[5] to-[#5963c8]/[2%] "></div>

      {/* content  */}
      <div className=" absolute inset-x-0 h-[140px]   bottom-0 bg-gradient-to-b from-transparent to-black p-4">
        <div className="max-w-md text-white relative z-20">
          <h3 className="   text-3xl lg:text-4xl xl:text-[40px] xl:leading-14  font-bold mt-4">
            {item.name}
          </h3>
          <p className=" text-[16px]  ">{item.position}</p>
        </div>
      </div>

      {/* plus icon */}
      <div className="size-16 bg-[#F2F1F6] border-0 z-40 border-[#F2F1F6]  rounded-tl-[20px] absolute bottom-0 right-0   flex items-center justify-center">
        <div className="p-3 group-hover:bg-primary duration-500 group-hover:text-white bg-white size-12 flex justify-center items-center rounded-lg">
          <PlusIcon size={18} />
        </div>
      </div>
    </div>
  );
};
