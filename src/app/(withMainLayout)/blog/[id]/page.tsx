import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { AiFillLinkedin } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import CommentBox from "./components/CommentBox";
import CommentForm from "./components/CommentForm";

const BlogDetailPage = () => {
  return (
    <div className="container mx-auto">
      <div className="pt-40 pb-20">
        {/* Category, Date and Author */}
        <div className="flex justify-center items-center gap-5">
          <button className="border border-[#636EDF4D] w-fit lg:min-w-fit rounded-[10px] text-black text-[14px] md:text-[18px] px-4 py-1.5  flex items-center gap-2 hover:bg-gray-200 transition">
            <span className="w-2 h-2 rounded-[1px] bg-[#636EDF] animate-pulse"></span>
            Company
          </button>
          <div className="flex gap-2 text-[12px] font-semibold uppercase">
            <p className="text-light">20 Nov 2024</p>
            <p className="text-light">admin</p>
          </div>
        </div>

        {/* Main Content */}
        <article>
          {/* Title */}
          <div>
            <h2 className="text-[30px] md:text-[52px] lg:text-[80px] font-semibold text-center lg:max-w-[90%] mx-auto mt-5">
              Top Digital Agency Case Studies in Web3 Marketing
            </h2>
          </div>
          <div className="relative w-full min-h-[300px] lg:min-h-[600px] rounded-[40px] mt-10">
            <Image
              src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/blog_12.jpg"
              fill
              alt=""
              className="rounded-[40px] object-cover"
            />
          </div>
          <div className="lg:mx-[150px] mt-10 md:text-[20px] text-light">
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni
            </p>
            <blockquote className="flex gap-5 lg:gap-10 my-10">
              <span className="text-primary">
                <BiSolidQuoteLeft size={72} />
              </span>
              <div className="text-black">
                <h5 className="text-[24px] md:text-[32px] font-semibold">
                  “African décor reflects harmony with nature which is reflected
                  in its materials.”
                </h5>
                {/* Before Line + Author Name */}
                <cite className="uppercase text-sm not-italic relative block before:content-[''] before:w-12 before:h-[2px] before:bg-black before:absolute before:top-2 before:-left-[55px] ml-[60px] font-semibold mt-2">
                  Jane Cooper
                </cite>
              </div>
            </blockquote>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-10">
            <div className="relative w-full min-h-[250px] md:min-h-[450px] rounded-[40px] mt-10">
              <Image
                src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/img_blog1.jpg"
                fill
                alt=""
                className="rounded-[40px] object-cover"
              />
            </div>
            <div className="relative w-full min-h-[250px] md:min-h-[450px] rounded-[40px] mt-10">
              <Image
                src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/img_blog2.jpg"
                fill
                alt=""
                className="rounded-[40px] object-cover"
              />
            </div>
          </div>
          <div className="lg:mx-[150px] mt-10 md:text-[20px] text-light">
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </article>

        {/* Tags and social share */}
        <div className="flex items-center justify-between flex-col sm:flex-row mt-10 lg:max-w-[90%] lg:mx-[150px]">
          <div className="flex gap-5 flex-wrap mt-10 items-center">
            {["Hotel", "Lifestyle", "Luxury", "Resort"].map((tag, idx) => (
              <Link
                href="#"
                key={idx}
                className="border px-2 py-1 rounded-md text-light hover:bg-primary hover:text-white transition-colors duration-300"
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between mt-10 gap-5">
            <span className="uppercase text-sm font-semibold">Share</span>
            <div className="flex gap-3">
              <button className="hover:text-primary cursor-pointer transition-colors duration-300">
                <RiFacebookFill />
              </button>
              <button className="hover:text-primary cursor-pointer transition-colors duration-300">
                <RiTwitterXFill />
              </button>
              <button className="hover:text-primary cursor-pointer transition-colors duration-300">
                <AiFillLinkedin />
              </button>
              <button className="hover:text-primary cursor-pointer transition-colors duration-300">
                <FaRegEnvelope />
              </button>
            </div>
          </div>
        </div>

        {/* Blog Navigator */}
        <div className="grid grid-cols-2 lg:max-w-[90%] lg:mx-[150px] px-2 py-5 md:p-10 border-y border-black mt-10 gap-5 md:gap-10">
          <div className="flex items-center gap-5">
            <div className="flex items-end flex-col justify-end  gap-5">
              <span className="text-[12px] text-right font-semibold uppercase text-light flex items-center gap-1">
                <FaChevronLeft /> <span>Previous Post</span>
              </span>
              <div>
                <h5 className="text-[24px] font-medium text-right">
                  <Link
                    href="/blog/1"
                    className="text-[24px] hover:text-primary transition-colors duration-300"
                  >
                    The Best Luxury Hotels in the World
                  </Link>
                </h5>
              </div>
            </div>
            {/* <div className="relative w-[100px] h-[100px] rounded-[20px] overflow-hidden"></div> */}
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-col  gap-5">
              <span className="text-[12px] font-semibold uppercase text-light flex items-center gap-1">
                <span>Next Post</span>
                <FaChevronRight />
              </span>
              <div>
                <h5 className="text-[24px] font-medium">
                  <Link
                    href="/blog/1"
                    className="text-[24px] hover:text-primary transition-colors duration-300"
                  >
                    The Best Luxury Hotels in the World
                  </Link>
                </h5>
              </div>
            </div>
            {/* <div className="relative w-[100px] h-[100px] rounded-[20px] overflow-hidden"></div> */}
          </div>
        </div>

        {/* Comments box */}
        <CommentBox />

        {/* Comments form */}
        <CommentForm />
      </div>
    </div>
  );
};

export default BlogDetailPage;
