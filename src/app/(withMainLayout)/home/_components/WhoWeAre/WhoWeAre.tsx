import assets from "@/assets";
import { SectionTitle } from "@/components/common";
import Image from "next/image";
import { services } from "../../_constant/homeData";

const WhoWeAre = () => {
  return (
    <div className="container mx-auto">
      <div>
        <div className="container mx-auto pb-5">
          <SectionTitle
            buttonText="Who you are"
            description="We’re a team of expert designers, web developers and marketers who’ve
          been delivering digital success for more than a decade. We excel at
          marketing websites, innovative web apps and mobile applications."
            title="Your partners for digital success"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 gap-8 mt-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="p-4 hover:-translate-y-2.5 transform duration-300 md:p-6 lg:p-7 tracking-tight rounded-3xl bg-background   "
          >
            <service.icon size={60} className="text-primary mb-4" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-2 mt-10 md:mt-14 lg:mt-20">
              {service.title}
            </h2>
            <p className="text-light text-sm lg:text-base">
              {service.description}
            </p>
          </div>
        ))}

        <div className="relative  bg-primary p-4 md:p6 lg:p-7 !pb-0 rounded-3xl text-white    md:col-span-3 lg:col-span-1 min-h-[300px] md:min-h-[460px] lg:min-h-auto">
          <h1 className="text-xl font-medium mb-2">Need Help?</h1>
          <p className="text-3xl md:text-5xl lg:text-2xl font-medium">
            Free Advice.
          </p>
          <p className="text-3xl md:text-5xl lg:text-2xl font-medium">
            Book a callback
          </p>
          <div className=" w-full ">
            <Image
              height={423}
              width={300}
              className=" absolute max-w-40 md:max-w-70   lg:max-w-46 right-1/2 translate-x-1/2 bottom-0 "
              src={assets.images.phoneGirl}
              alt="Who we are"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
