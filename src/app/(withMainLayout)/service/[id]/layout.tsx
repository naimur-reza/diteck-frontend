import assets from "@/assets";
import { ParallaxBanner } from "@/components/common";
import { ReactNode } from "react";

const ServiceDetailsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Services"
        pageTitle="services"
      />
      <div className="container mx-auto p-12">{children}</div>
    </div>
  );
};

export default ServiceDetailsLayout;
