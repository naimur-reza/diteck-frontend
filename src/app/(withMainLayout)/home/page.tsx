import Hero from "@/components/sections/Hero/Hero";
import {
  OurServices,
  RecentPost,
  SelectedWorks,
  WhoWeAre,
  WhyUs,
} from "./_components";

const Home = () => {
  return (
    // Used space for global styling
    <div className="space-y-8 md:space-y-14 lg:space-y-20">
      <Hero />
      <WhoWeAre />
      <OurServices />
      <WhyUs />
      <SelectedWorks />
      <RecentPost />
    </div>
  );
};

export default Home;
