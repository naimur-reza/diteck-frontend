import assets from "@/assets";
import { ParallaxBanner, SectionTitle } from "@/components/common";
import { services } from "./constants/services";
import { ServiceCard, WhyChooseUs } from "./_components";

const Service = () => {
  return (
    <div className="  ">
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Services"
        pageTitle="services"
      />

      <div className="container mx-auto  ">
        {/* section title */}
        <div className="my-[50px]">
          <SectionTitle
            title="Innovative digital solution services"
            buttonText="What we do"
          />
        </div>

        {/* services card */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 ">
          {services.map((item, idx) => (
            <div key={idx} className={`${idx === 2 ? "lg:col-span-2" : ""}`}>
              <ServiceCard item={item} />
            </div>
          ))}
        </div>

        {/*  why choose us */}
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Service;
