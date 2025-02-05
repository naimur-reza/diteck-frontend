import assets from "@/assets";
import { ParallaxBanner } from "../components/common";
import Hero from "./components/Hero/Hero";

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
    </>
  );
};

export default Home;
