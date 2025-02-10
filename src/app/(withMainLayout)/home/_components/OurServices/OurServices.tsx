import { SectionTitle } from "@/components/common";

const OurServices = () => {
  return (
    <div className="container relative border pt-8 md:pt-10 lg:pt-14 rounded-card overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0F42]  rounded-card" />
      <div className="absolute w-[600px] h-[350px] -top-1/2 left-1/2 -translate-x-1/2 blur-[100px] bg-green-400/30 rounded-card" />

      <div className="relative z-10">
        <SectionTitle
          color="text-white"
          buttonText="Our services"
          title="Digital services to grow your business"
        />
      </div>
    </div>
  );
};

export default OurServices;
