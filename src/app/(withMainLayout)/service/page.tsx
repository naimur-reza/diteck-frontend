import assets from "@/assets";
import { ParallaxBanner, SectionTitle } from "@/components/common";

const Service = () => {
  return (
    <div className="  pt-[80px]">
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Services"
        pageTitle="services"
      />
      {/* card section */}
      <div className="container mx-auto  ">
        <SectionTitle
          title="Innovative digital solution services"
          buttonText="What we do"
        />
      </div>
    </div>
  );
};

export default Service;
