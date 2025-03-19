import {
  RecentPost,
  SelectedWorks,
  TeamMember,
  Testimonial,
  WhoWeAre,
  WhyUs,
} from "./_components";
import HeroSection from "./_components/Hero/HeroSection/HeroSection";
import OurServicesPage from "./_components/OurServices/OurServicesPage";

const HomePage = () => {
  return (
    <div className="space-y-8 md:space-y-14 lg:space-y-20">
      <HeroSection />
      <WhoWeAre />
      <OurServicesPage />
      <WhyUs />
      <SelectedWorks />
      <TeamMember />
      <Testimonial />
      <RecentPost />
    </div>
  );
};

export default HomePage;
