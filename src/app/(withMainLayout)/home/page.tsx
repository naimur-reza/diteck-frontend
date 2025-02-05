import Hero from "@/components/sections/Hero/Hero";
import WhoWeAre from "./_components/WhoWeAre";
import WhyUs from "./_components/WhyUs/WhyUs";
import SelectedWorks from "./_components/SelectedWorks/SelectedWorks";

const Home = () => {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <WhyUs />
      <SelectedWorks />
    </div>
  );
};

export default Home;
