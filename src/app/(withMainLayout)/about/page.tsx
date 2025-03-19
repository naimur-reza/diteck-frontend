import { Feedback, ParallaxBanner } from "@/components/common";
import { TReview } from "@/types";
import { getAllReviews } from "@/utils/fetchData/getAllReviews";
import CompanyOverView from "./components/CompanyOverview/CompanyOverview";
import ConnectWithUs from "./components/ConnectWithUs/ConnectWithUs";
import ExploreCompany from "./components/ExploreCompany/ExploreCompany";
import HighlightFeatures from "./components/HighlightFeatures/HighlightFeatures";
import OurAchievements from "./components/OurAchievements/OurAchievements";

const AboutPage = async () => {
  const { data: feedbackData = [] }: { data: TReview[] } =
    await getAllReviews();

  return (
    <div
      className="pt-5 bg-no-repeat bg-top"
      style={{
        backgroundImage:
          "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
      }}
    >
      <ParallaxBanner
        img="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/about_bc.jpg"
        pageTitle="About Us"
        title="We are Diteck"
        description="We’re a team of expert designers, web developers and marketers who’ve been delivering digital success for more than a decade."
      />
      <CompanyOverView />
      <ExploreCompany />
      <HighlightFeatures />
      <Feedback feedbackData={feedbackData} buttonText="Hear from customer" />
      <OurAchievements />
      <ConnectWithUs />
    </div>
  );
};

export default AboutPage;
