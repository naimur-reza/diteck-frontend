import Image from "next/image";

interface TMemBer {
  imgUrl: string;
  name: string;
  position: string;
}
export const TeamMemberCard = ({ item }: { item: TMemBer }) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] ">
      
      <div className=" absolute inset-x-0 border rounded-tr-[20px] border-red-500 bottom-0 bg-gradient-to-b from-transparent to-black p-4">
        <h3 className="text-white text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-300 text-sm">{item.position}</p>
      </div>
      <div className="size-20 bg-[#F9F9F9] border border-orange-500 rounded-tl-[40px] rounded-br-[20px]  absolute bottom-0 right-0 flex items-center justify-center">
        <button className=" w-12 h-12  bg-white rounded-[10px] shadow-xl  ">
          +
        </button>
      </div>
    </div>
  );
};
