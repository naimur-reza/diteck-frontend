import assets from "@/assets";
import { ParallaxBanner } from "@/components/common";
import { ReactNode } from "react";
import ServiceCategory from "./_components/ServiceCategory";

const ServiceDetailsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url("https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png")`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Services"
        pageTitle="services"
      />
      <div className="flex flex-row container  xl:gap-x-24">
        {/* sidebar */}
        <div className="xl:basis-1/3 hidden xl:block ">
          {/* sidebar category menu list */}
          <ServiceCategory />
          {/* sidebar ads */}
        </div>

        {/* content */}
        <div className="xl:basis-2/3  basis-full">{children}</div>
      </div>
    </div>
  );
};

export default ServiceDetailsLayout;
