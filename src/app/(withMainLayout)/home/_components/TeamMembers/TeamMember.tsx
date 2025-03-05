import { SectionTitle } from "@/components/common";
import { TeamMemberCard } from "@/components/ui";
import { TTeamMember } from "@/types";

async function getTeamMembers() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/team-member/get-all-users`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return { data: [] };
  }
}

export const TeamMember = async () => {
  const { data: teamsArray } = (await getTeamMembers()) as {
    data: TTeamMember[];
  };

  return (
    <div className="relative container mx-auto">
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
