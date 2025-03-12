import { ParallaxBanner, SectionTitle } from "@/components/common";
import type { THiring } from "@/types";
import CareerCard from "./_components/CareerCard";

interface JobResponse {
  data: THiring[];
}

async function getJobs(): Promise<JobResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/hiring-post/get-all-post?status=active`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return response.json();
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
        description="By joining our team, you'll have the opportunity to work on cutting projects, leverage the latest technologies, and make a real impact."
      />

      <div className="container mx-auto">
        <SectionTitle title="Current openings" buttonText="Apply now" />
      </div>

      <div className="container mx-auto py-10">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {jobs.map((job, index) => (
              <CareerCard key={index} {...job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Current Openings
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto">
              We do not have any open positions at the moment. Please check back
              later or send your resume to our HR department for future
              opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Career;
