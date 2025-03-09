import { ParallaxBanner, SectionTitle } from "@/components/common";
import { THiring } from "@/types";
import CareerCard from "./_components/CareerCard";

interface JobResponse {
  data: THiring[];
}

async function getJobs(): Promise<JobResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/hiring-post/get-all-post`,
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { data: [] };
  }
}

const Career = async () => {
  const { data: jobs } = await getJobs();
  return (
    <div className="bg-gradient-to-t from-transparent via-rose-100 to-transparent">
      <ParallaxBanner
        img="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/career_bc.jpg"
        pageTitle="Career"
        title="Career"
        description="By joining our team, you’ll have the opportunity to work on cutting projects, leverage the latest technologies, and make a real impact."
      />

      <div className="container mx-auto">
        <SectionTitle title="Current openings" buttonText="Apply now" />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-7 py-10">
        {jobs?.map((job, index) => (
          <CareerCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Career;
