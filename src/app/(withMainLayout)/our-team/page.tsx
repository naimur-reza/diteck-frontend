import {
  LinkButtonWithIcon,
  ParallaxBanner,
  SectionTitle,
} from "@/components/common";
import React from "react";
import { PulseButton, TeamMemberCard } from "@/components/ui";
import Image from "next/image";
import { TTeamMember } from "@/types";
import getAllTeamMembers from "@/utils/fetchData/getAllTeamMembers";

const OurTeamPage = async () => {
  const { data: teamMembers }: { data: TTeamMember[] } = await getAllTeamMembers();

  return (
    <div
      className="pt-5 bg-no-repeat bg-top"
      style={{
        backgroundImage:
          "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
      }}
    >
      {/* Our team banner */}
      <ParallaxBanner
        img="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/team_bc.jpg"
        pageTitle="Our Team"
        title="Our Team"
        description="Our people define our success. We are all passionate and committed to deliver high quality services to our clients."
      />

      {/* Team Member lists */}
      <section className="container mx-auto py-10">
        <div className="lg:px-32">
          <SectionTitle
            buttonText="Our expert crew"
            title="Meet the leadership team"
          />
        </div>
        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          {teamMembers?.map((item, idx) => (
            <TeamMemberCard key={idx} item={item} />
          ))}
        </div>
      </section>

      {/* Dual banner */}
      <section className="container mx-auto grid md:grid-cols-2 gap-5 py-20">
        <div className="bg-primary p-5 lg:p-20 rounded-[20px] text-white relative">
          <PulseButton
            buttonText="Join Our Team"
            isAnimate={false}
            color="text-white"
            pulseBgColor="bg-white"
          />
          <h4 className="text-[42px] font-medium leading-[42px] relative z-10">
            Start a career with excellent benefits
          </h4>
          <div className="mt-10">
            <LinkButtonWithIcon
              link="/career"
              text="Apply Now"
              invertedBorder={false}
              bgColor="bg-white"
              position="start"
            />
          </div>
          <div className="absolute w-[330px] h-[570px] -bottom-[65px] right-10 z-0 hidden lg:block">
            <Image
              src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/team-img.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div
          className="p-5 lg:p-20 rounded-[20px] relative bg-white "
          style={{
            backgroundImage:
              "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/team-bg.png)",
          }}
        >
          <PulseButton
            buttonText="Let’s collaborate"
            isAnimate={false}
            isBorder={false}
          />
          <h4 className="text-[42px] font-medium leading-[42px] relative z-10">
            Ready to grow your business?
          </h4>
          <div className="mt-10">
            <LinkButtonWithIcon
              link="/contact"
              text="Contact Us"
              invertedBorder={false}
              bgColor="bg-white"
              position="start"
            />
          </div>
          {/* diamond */}
          <div className="diamond-loading absolute w-[100px] h-[100px] -top-[40px] left-[45%] z-0 hidden lg:block">
            <Image
              src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h3_innovation.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* circle */}
          <div className="circle-loading absolute w-[150px] h-[150px] bottom-[50px] right-[120px] z-0 blur-xs hidden lg:block">
            <Image
              src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h3_cost-effective.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* <div className="loading"></div> */}
    </div>
  );
};

export default OurTeamPage;
