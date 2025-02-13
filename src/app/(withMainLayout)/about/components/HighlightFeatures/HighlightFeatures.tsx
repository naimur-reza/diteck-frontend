import { highlightFeatures } from "@/app/(withMainLayout)/home/_constant/highlightFeatures";
import { SectionTitle } from "@/components/common";
import React from "react";
import SingleFeature from "./SingleFeature";
import Image from "next/image";

const HighlightFeatures = () => {
  return (
    <section className="container mx-auto py-20">
      <SectionTitle
        buttonText="Highlight features"
        title="We are leader in digital solutions"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
        {/* first col */}
        <div className="flex flex-col gap-5">
          <div className="hidden md:block max-w-full rounded-[20px] overflow-hidden">
            <iframe
              className="max-w-full rounded-[20px] transform scale-[1.7]"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="A Man Using Laptop"
              width="640"
              height="360"
              src="https://www.youtube.com/embed/1aX-7dDGAYQ?controls=0&rel=0&playsinline=1&enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=1aX-7dDGAYQ"
              id="widget2"
              style={{ width: "100%", height: "600px" }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="hidden md:block bg-cover bg-no-repeat bg-center h-[500px] rounded-[20px] w-full border"
              style={{
                backgroundImage:
                  "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h3_img-1.jpg)",
              }}
            />
            <div className="bg-primary rounded-[20px] w-full p-14 flex flex-col justify-between">
              <p className="text-[32px] font-medium text-white leading-8">
                “We are committed to providing supportive and positive work”
              </p>
              <div className="relative mt-10 pb-5">
                <Image
                  src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/h3_signature.png"
                  alt=""
                  width={120}
                  height={80}
                  className="object-cover"
                />
                <span className="text-white font-medium text-[18px] block">
                  Founder of Ena Ema
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* second col */}
        <div>
          <div>
            <p className="text-[20px] text-[#484848]">
              We’re a team of expert designers, web developers and marketers
              who’ve been delivering digital success for more than a decade. We
              excel at marketing websites, innovative web apps and mobile
              applications.
            </p>
          </div>
          <div className="mt-[500px]">
            {highlightFeatures.map((feature, idx) => (
              <SingleFeature key={idx} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightFeatures;
