import assets from "@/assets";
import { ParallaxBanner, SectionTitle } from "@/components/common";
import { services } from "./constants/services";
import { ServiceCard } from "./_components";

const Service = () => {
  return (
    <div className="  pt-[80px]">
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Services"
        pageTitle="services"
      />
      {/*  */}
      <div className="container mx-auto  ">
        <SectionTitle
          title="Innovative digital solution services"
          buttonText="What we do"
        />

        {/* services card */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((item, idx) => (
            <div key={idx} className={`${idx === 2 ? "lg:col-span-2" : ""}`}>
              <ServiceCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
