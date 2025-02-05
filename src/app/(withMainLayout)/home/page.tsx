import Hero from "@/components/sections/Hero/Hero";
import WhoWeAre from "./_components/WhoWeAre";
import WhyUs from "./_components/WhyUs/WhyUs";
import SelectedWorks from "./_components/SelectedWorks/SelectedWorks";
import { teamsArray } from "@/constants";
import { TeamMemberCard } from "@/components/ui";

const Home = () => {
  return (
    <div>
      <Hero />
      <WhoWeAre />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10 my-12 px-12">
        {teamsArray.map((item, idx) => (
          <TeamMemberCard item={item} key={idx} />
        ))}
      </div>
      <WhyUs />
      <SelectedWorks />
    </div>
  );
};

export default Home;
