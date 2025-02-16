import Hero from "@/components/sections/Hero/Hero";
import {
  OurServices,
  RecentPost,
  SelectedWorks,
  TeamMember,
  Testimonial,
  WhoWeAre,
  WhyUs,
} from "./_components";

const HomePage = () => {
  return (
    <div className="space-y-8 md:space-y-14 lg:space-y-20">
      <Hero />
      <WhoWeAre />
      <OurServices />
      <WhyUs />
      <SelectedWorks />
      <TeamMember />
      <Testimonial />
      <RecentPost />
    </div>
  );
};

export default HomePage;
