import { Feedback, ParallaxBanner } from "@/components/common";
import ExploreCompany from "./components/ExploreCompany/ExploreCompany";
import HighlightFeatures from "./components/HighlightFeatures/HighlightFeatures";
import CompanyOverView from "./components/CompanyOverview/CompanyOverview";
import OurAchievements from "./components/OurAchievements/OurAchievements";
import ConnectWithUs from "./components/ConnectWithUs/ConnectWithUs";
import { feedbacks } from "../home/_constant/feedback";

const AboutPage = () => {
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
        title="We are Ena Ema"
        description="We’re a team of expert designers, web developers and marketers who’ve been delivering digital success for more than a decade."
      />
      <CompanyOverView />
      <ExploreCompany />
      <HighlightFeatures />
      <Feedback feedbackData={feedbacks} buttonText="Hear from customer" />
      <OurAchievements />
      <ConnectWithUs />
    </div>
  );
};

export default AboutPage;
