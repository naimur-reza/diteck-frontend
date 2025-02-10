import Hero from "@/components/sections/Hero/Hero";
import RecentPost from "./_components/RecentPosts/RecentPost";
import SelectedWorks from "./_components/SelectedWorks/SelectedWorks";
import WhoWeAre from "./_components/WhoWeAre";
import WhyUs from "./_components/WhyUs/WhyUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <WhyUs />
      <SelectedWorks />
      <RecentPost />
    </div>
  );
};

export default Home;
