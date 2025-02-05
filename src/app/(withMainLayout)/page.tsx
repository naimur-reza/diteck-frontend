import assets from "@/assets";
import { ParallaxBanner } from "../components/common";
import Hero from "./components/Hero/Hero";
import WhyUs from "./components/WhyUs/WhyUs";

const Home = () => {
  return (
    <>
      <Hero />

      <div className="p-3">
        <ParallaxBanner
          img={assets.banner.serviceBanner.src}
          title="Our Service"
        />
      </div>

      <WhyUs />
    </>
  );
};

export default Home;
