import React from 'react';
import { BiSolidQuoteLeft } from 'react-icons/bi';

const BlogQuote = () => {
    return (
        <blockquote className="flex gap-5 lg:gap-10 my-10">
            <span className="text-primary">
                <BiSolidQuoteLeft size={72} />
            </span>
            <div className="text-black">
                <h5 className="text-[24px] md:text-[32px] font-semibold">
                    “This is a dummy quote African décor reflects harmony with
                    nature which is reflected in its materials.”
                </h5>
                {/* Before Line + Author Name */}
                <cite className="uppercase text-sm not-italic relative block before:content-[''] before:w-12 before:h-[2px] before:bg-black before:absolute before:top-2 before:-left-[55px] ml-[60px] font-semibold mt-2">
                    Jane Cooper
                </cite>
            </div>
        </blockquote>
    );
};

export default BlogQuote;