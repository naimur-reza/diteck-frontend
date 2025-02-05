import Image from "next/image";
import { Plus, PlusIcon } from "lucide-react";

interface TMemBer {
  imgUrl: string;
  name: string;
  position: string;
}
export const TeamMemberCard = ({ item }: { item: TMemBer }) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] ">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={500}
        height={500}
        className=""
      />
      <div className="absolute inset-x-0  rounded-tr-[20px]  bottom-0 bg-gradient-to-b from-transparent to-black p-4">
        <h3 className="text-white text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-300 text-sm">{item.position}</p>
      </div>
      <div className="size-12 bg-white  rounded-full absolute bottom-5 right-5 flex items-center justify-center">
        <PlusIcon size={15} />
      </div>
    </div>
  );
};
