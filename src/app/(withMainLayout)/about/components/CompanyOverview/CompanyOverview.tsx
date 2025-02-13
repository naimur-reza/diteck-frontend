import { PulseButton } from "@/components/ui";
import Image from "next/image";
import React from "react";
import DownloadBrochure from "./DownloadBrochure/DownloadBrochure";
import CompanyOverviewCounter from "./CompanyOverviewCounter/CompanyOverviewCounter";

const CompanyOverView = () => {
  return (
    <section
      style={{
        backgroundImage:
          "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
      }}
      className="bg-cover bg-no-repeat bg-left-top pb-0"
    >
      <div className="container mx-auto pt-16">
        <div className="flex items-center gap-8 py-5">
          <PulseButton buttonText="Company overview" />
          <p className="section-title ml-[190px]">
            Bring new digital <br /> ideas to life
          </p>
        </div>
        <div>
          <div className="grid grid-cols-[400px_1fr] gap-10 items-start">
            <div>
              <div className="relative min-w-full h-[600px] rounded-[20px] mr-[50px]">
                <Image
                  src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/about-img1.jpg"
                  alt=""
                  fill
                  className="rounded-[20px] object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex items-start gap-x-5">
                <div className="max-w-[calc(100%-300px)]">
                  <p className="text-lg text-black mb-5">
                    We are a global technology provider who assists businesses
                    to accelerate their digital transformation journey while
                    achieving efficiency, scalability, and lower cost of
                    ownership.
                  </p>
                  <p className="text-light">
                    Whatever your ambition may be from embracing new digital
                    capabilities to reimagining how your business operates, we
                    can help you set a new standard of excellence and achieve
                    unprecedented levels of value. Our team can assist you in
                    transforming your business through latest tech capabilities
                    to stay ahead of the curve.
                  </p>
                </div>
                <div className="relative -top-[200px] min-w-[320px]">
                  <DownloadBrochure />
                </div>
              </div>
              <div className="relative -top-[100px]">
                <CompanyOverviewCounter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverView;
