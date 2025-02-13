import { ParallaxBanner, SectionTitle } from "@/components/common";

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
    </div>
  );
};

export default Career;
