import assets from "@/assets";
import { ParallaxBanner, SectionTitle } from "@/components/common";

const Home = () => {
  return (
    <div className="p-3">
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Service"
      />
      <SectionTitle
        buttonText="Who you are"
        description="We’re a team of expert designers, web developers and marketers who’ve
          been delivering digital success for more than a decade. We excel at
          marketing websites, innovative web apps and mobile applications."
        title="Your partners for digital success
"
      />
    </div>
  );
};

export default Home;
