import assets from "@/assets";
import { ParallaxBanner } from "../components/common";

const Home = () => {
  return (
    <div className="p-3">
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Service"
      ></ParallaxBanner>
    </div>
  );
};

export default Home;
