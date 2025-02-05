import React from "react";

export const SectionTitle = ({
  title,
  buttonText,
  description,
}: {
  title: string;
  buttonText: string;
  description?: string;
}) => {
  return (
    <section className="flex flex-col md:flex-row gap-y-2 md:justify-between max-w-6xl mx-auto   md:items-center py-16">
      <button className="border border-[#636EDF4D] w-fit rounded-[10px] text-black text-sm px-4 py-1.5  flex items-center gap-2 hover:bg-gray-200 transition">
        <span className="w-2 h-2 rounded-[1px] bg-[#636EDF] animate-pulse "></span>
        {buttonText ? buttonText : ""}
      </button>
      <div className="">
        <h2 className="section-title  xl:max-w-3xl">
          {title ? title : "Your partners for digital success"}
        </h2>
        <p className="section-description mt-8 max-w-2xl">
          {/* {description ? description : "Your partners for digital success"} */}
          {description}
        </p>
      </div>
    </section>
  );
};
