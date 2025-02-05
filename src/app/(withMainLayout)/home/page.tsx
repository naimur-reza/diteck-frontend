import assets from "@/assets";
import { ParallaxBanner, SectionTitle } from "@/components/common";
import { TeamMemberCard } from "@/components/ui";
import { teamsArray } from "@/constants";

const Home = () => {
  return (
    <div className="p-3">
      <ParallaxBanner
        img={assets.banner.serviceBanner.src}
        title="Our Service"
      />

      <div className="grid grid-cols-4 gap-x-10 my-12">
        {teamsArray.map((item, idx) => (
          <TeamMemberCard item={item} key={idx} />
        ))}
      </div>
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
