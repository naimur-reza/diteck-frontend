import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const data = [
  { title: "Date", desc: "27 August, 2024" },
  { title: "Client", desc: "Logistic Company" },
  { title: "Category", desc: "Development" },
  { title: "Location", desc: "New York, USA" },
];

const ProjectDetailPage = () => {
  return (
    <div className="container mx-auto">
      <div
        className="pt-5 md:pt-10 lg:pt-40 pb-20 bg-no-repeat bg-top bg-contain"
        style={{
          backgroundImage:
            "url(https://demo2.wpopal.com/diteck/wp-content/uploads/2024/12/404-bg.png)",
        }}
      >
        {/* Department */}
        <div className="flex justify-center items-center gap-5">
          <Link
            href={"#"}
            className="border border-[#636EDF4D] w-fit lg:min-w-fit rounded-[10px] text-black text-[14px] md:text-[18px] px-4 py-1.5  flex items-center gap-2 hover:bg-gray-200 transition"
          >
            <span className="w-2 h-2 rounded-[1px] bg-[#636EDF] animate-pulse"></span>
            Development
          </Link>
        </div>

        {/* Main Content */}
        <article>
          {/* Title */}
          <div>
            <h2 className="text-[30px] md:text-[52px] lg:text-[80px] lg:leading-[80px] font-semibold text-center lg:max-w-[60%] mx-auto mt-5 lg:mt-10">
              UI/UX Design Platform
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:max-w-[70%] mx-auto mt-10 mb-20">
            {data?.map(({ title, desc }, idx) => (
              <div className="text-center" key={idx}>
                <span className="text-light">{title}</span>
                <p className="font-medium text-[18px]">{desc}</p>
              </div>
            ))}
          </div>

          {/* Featured image */}
          <div className="relative w-full min-h-[150px] md:min-h-[300px] lg:min-h-[600px] rounded-[40px] mt-10">
            <Image
              src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/single_project_img1.jpg"
              fill
              alt=""
              className="rounded-[40px] object-cover"
            />
          </div>
          <div className="lg:max-w-[80%] mx-auto mt-10 md:text-[20px]">
            <h6 className="text-accent font-medium text-[24px] leading-[24px] pb-10">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate.
            </h6>

            {/* First */}
            <div className="grid md:grid-cols-[2fr_4fr] gap-x-20 border-t py-10">
              <div>
                <h4 className="font-medium text-[30px] lg:text-[42px] leading-[42px]">
                  Challenge & Solution
                </h4>
              </div>
              <div>
                <p className="text-[20px] text-light pb-5">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                </p>
                <ul>
                  {["Research", "Concept Design", "Implementation"].map(
                    (item, idx) => (
                      <li
                        key={idx}
                        className="border-t py-3 text-[20px] font-medium"
                      >
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Second */}
            <div className="grid md:grid-cols-[2fr_4fr] gap-x-20 border-t py-10">
              <div>
                <h4 className="font-medium text-[30px] lg:text-[42px] leading-[42px]">
                  Our Process
                </h4>
              </div>
              <div className="">
                <p className="text-[20px] text-light pb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>

          {/* Dual image */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative w-full min-h-[250px] lg:min-h-[450px] rounded-[40px]">
              <Image
                src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/single_project_img2.jpg"
                fill
                alt=""
                className="rounded-[40px] object-cover"
              />
            </div>
            <div className="relative w-full min-h-[250px] lg:min-h-[450px] rounded-[40px]">
              <Image
                src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/single_project_img3.jpg"
                fill
                alt=""
                className="rounded-[40px] object-cover"
              />
            </div>
          </div>

          {/* Third */}
          <div className="lg:max-w-[80%] mx-auto">
            <div className="grid md:grid-cols-[2fr_4fr] gap-x-20 border-t pt-10 mt-10">
              <div>
                <h4 className="font-medium text-[30px] lg:text-[42px] leading-[42px]">
                  Result Driven
                </h4>
              </div>
              <div className="">
                <p className="text-[20px] text-light pb-5">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt.
                </p>
                <ul>
                  {[
                    "Branding and identity",
                    "Websites and digital platforms",
                    "Content strategy for social media",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="border-t py-3 text-[20px] font-medium"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>

        {/* Blog Navigator */}
        <div className="grid md:grid-cols-2 px-2 mt-10 gap-1 rounded-lg">
          <div className="flex items-center justify-center gap-5 bg-white rounded-l-[20px] p-5">
            <Link href={"#"}>
              <span className="text-[24px] text-right font-semibold flex items-center gap-1">
                <FaChevronLeft /> <span>Previous Post</span>
              </span>
            </Link>
            {/* <div className="relative w-[100px] h-[100px] rounded-[20px] overflow-hidden"></div> */}
          </div>
          <div className="flex items-center justify-center gap-5 rounded-r-[20px] bg-white p-5">
            <Link href={"#"}>
              <span className="text-[24px] font-semibold flex items-center gap-1">
                <span>Next Post</span>
                <FaChevronRight />
              </span>
            </Link>
            {/* <div className="relative w-[100px] h-[100px] rounded-[20px] overflow-hidden"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
