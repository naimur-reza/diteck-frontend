import { TeamMemberCard } from "@/components/ui";
import { SectionTitle } from "@/components/common";
import { teamsArray } from "../../_constant/teamMember";

export const TeamMember = () => {
  return (
    <div className="relative container mx-auto ">
      <SectionTitle
        buttonText="Selected Works"
        title="Meet the leadership team"
        rightText="We are all passionate and committed to deliver high quality services to our clients"
      />
      <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {teamsArray.map((item, idx) => (
          <TeamMemberCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};
