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
    <div>
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
