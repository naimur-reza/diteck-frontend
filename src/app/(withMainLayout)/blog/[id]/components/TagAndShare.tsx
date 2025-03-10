import Link from 'next/link';
import React from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { FaRegEnvelope } from 'react-icons/fa';
import { RiFacebookFill, RiTwitterXFill } from 'react-icons/ri';

const TagAndShare = () => {
    return (
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
    );
};

export default TagAndShare;