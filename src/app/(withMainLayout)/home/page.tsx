import Hero from "@/components/sections/Hero/Hero";
import {
  OurServices,
  RecentPost,
  SelectedWorks,
  TeamMember,
  WhoWeAre,
  WhyUs,
} from "./_components";

const Home = () => {
  return (
    <div className="space-y-8 md:space-y-14 lg:space-y-20">
      <Hero />
      <WhoWeAre />
      <OurServices />
      <WhyUs />
      <SelectedWorks />
      <TeamMember />
      <RecentPost />
    </div>
  );
};

export default Home;
