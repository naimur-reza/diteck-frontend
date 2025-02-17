import assets from "@/assets";
import { ParallaxBanner } from "@/components/common";
import { ReactNode } from "react";
import { ServiceCategory, SidebarAds } from "./_components";

const ServiceDetailsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="xl:min-h-screen h-full"
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
      <div className="flex flex-row container  xl:gap-x-16 my-[20px] xl:my-[70px]">
        {/* sidebar */}
        <div className="xl:basis-[30%] hidden xl:block space-y-8">
          {/* sidebar category menu list */}
          <ServiceCategory />
          {/* sidebar ads */}
          <SidebarAds />
        </div>

        {/* content */}
        <div className="xl:basis-[70%]  basis-full">{children}</div>
      </div>
    </div>
  );
};

export default ServiceDetailsLayout;
