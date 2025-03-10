import { SectionTitle } from "@/components/common";
import { TTeamMember } from "@/types";
import TeamMemberContainer from "./TeamMemberContainer";

async function getTeamMembers() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/team-member/get-all-users`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch team members");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching team members:", error);
    return { data: [] };
  }
}

export const TeamMember = async () => {
  const { data: teamsArray = [] } = (await getTeamMembers()) as {
    data: TTeamMember[];
  };

  return (
    <div className="relative container mx-auto">
      <SectionTitle
        buttonText="Selected Works"
        title="Meet the leadership team"
        rightText="We are all passionate and committed to deliver high quality services to our clients"
      />
      <TeamMemberContainer teamsArray={teamsArray?.slice(0, 4)} />
    </div>
  );
};
