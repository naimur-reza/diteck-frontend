import { ParallaxBanner } from "@/components/common";
import React from "react";

const OurTeamPage = () => {
  return (
    <div
      className="pt-5 bg-no-repeat bg-top"
      style={{
        backgroundImage:
          "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
      }}
    >
      <ParallaxBanner
        img="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/team_bc.jpg"
        pageTitle="Our Team"
        title="Our Team"
        description="Our people define our success. We are all passionate and committed to deliver high quality services to our clients."
      />
    </div>
  );
};

export default OurTeamPage;
