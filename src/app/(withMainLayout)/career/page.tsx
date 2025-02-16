import { ParallaxBanner, SectionTitle } from "@/components/common";
import CareerCard from "./_components/CareerCard";

const Career = () => {
  return (
    <div className="container bg-gradient-to-t from-transparent via-rose-100 to-transparent">
      <ParallaxBanner
        img="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/career_bc.jpg"
        pageTitle="Career"
        title="Career"
        description="By joining our team, you’ll have the opportunity to work on cutting projects, leverage the latest technologies, and make a real impact."
      />
      <SectionTitle title="Current openings" buttonText="Apply now" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 py-10">
        {jobs.map((job, index) => (
          <CareerCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Career;

const jobs = [
  {
    title: "Senior Frontend Developer",
    location: "Hanoi, Vietnam",
    type: "Full-time",
    description:
      "We are looking for a Senior Frontend Developer to join our team. You will be responsible for developing and maintaining the frontend of our web applications.",
  },
  {
    title: "Senior Backend Developer",
    location: "Hanoi, Vietnam",
    type: "Full-time",
    description:
      "We are looking for a Senior Backend Developer to join our team. You will be responsible for developing and maintaining the backend of our web applications.",
  },
  {
    title: "Senior Fullstack Developer",
    location: "Hanoi, Vietnam",
    type: "Full-time",
    description:
      "We are looking for a Senior Fullstack Developer to join our team. You will be responsible for developing and maintaining the frontend and backend of our web applications.",
  },
  {
    title: "Senior DevOps Engineer",
    location: "Hanoi, Vietnam",
    type: "Full-time",
    description:
      "We are looking for a Senior DevOps Engineer to join our team. You will be responsible for managing and maintaining our infrastructure.",
  },
];
