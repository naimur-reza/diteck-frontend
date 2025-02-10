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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10 my-12 px-12"></div>
      <WhyUs />
      <SelectedWorks />
      <RecentPost />
    </div>
  );
};
export default Home;
