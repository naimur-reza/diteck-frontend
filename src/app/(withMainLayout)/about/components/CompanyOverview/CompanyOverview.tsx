import { PulseButton } from "@/components/ui";
import Image from "next/image";
import React from "react";
import DownloadBrochure from "../../../../../components/common/DownloadBrochure/DownloadBrochure";
import CompanyOverviewCounter from "./CompanyOverviewCounter/CompanyOverviewCounter";

const CompanyOverView = () => {
  return (
    <section>
      <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row items-center lg:gap-8 py-5">
          <PulseButton buttonText="Company overview" />
          <p className="section-title md:ml-[80px] lg:ml-[190px]">
            Bring new digital <br /> ideas to life
          </p>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[400px_1fr] gap-10 items-start">
            <div className="hidden md:block">
              <div className="relative min-w-full h-[300px] lg:h-[600px] rounded-[20px] mr-[50px]">
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
                <div className="w-full lg:max-w-[calc(100%-350px)]">
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
              </div>

              <div className="mt-5 md:block lg:hidden">
                <DownloadBrochure />
              </div>

              <div className="mt-18">
                <CompanyOverviewCounter />
              </div>
            </div>
          </div>

          {/* position brochure */}
          <div className="absolute top-[-170px] right-0 max-w-[320px] hidden lg:block">
            <DownloadBrochure />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverView;
