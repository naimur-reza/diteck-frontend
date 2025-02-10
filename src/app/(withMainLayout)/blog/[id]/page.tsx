import Image from "next/image";
import React from "react";
import { BiSolidQuoteLeft } from "react-icons/bi";

const page = () => {
  return (
    <div className="container mx-auto ">
      <div className="pt-36 pb-20">
        <div>
          <h2 className="text-[80px] font-semibold text-center max-w-[90%] mx-auto">
            Top Digital Agency Case Studies in Web3 Marketing
          </h2>
        </div>
        <div className="relative w-full min-h-[600px] rounded-[40px] mt-10">
          <Image
            src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/blog_12.jpg"
            fill
            alt=""
            className="rounded-[40px] object-cover"
          />
        </div>
        <div className="mx-[150px] mt-10 text-[20px] text-light">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni
          </p>
          <blockquote className="flex gap-10 my-10">
            <span className="text-primary">
              <BiSolidQuoteLeft size={72} />
            </span>
            <div className="text-black">
              <h5 className="text-[32px] font-semibold">
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
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia.
          </p>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="relative w-full min-h-[450px] rounded-[40px] mt-10">
            <Image
              src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/img_blog1.jpg"
              fill
              alt=""
              className="rounded-[40px] object-cover"
            />
          </div>
          <div className="relative w-full min-h-[450px] rounded-[40px] mt-10">
            <Image
              src="https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/img_blog2.jpg"
              fill
              alt=""
              className="rounded-[40px] object-cover"
            />
          </div>
        </div>
        <div className="mx-[150px] mt-10 text-[20px] text-light">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
