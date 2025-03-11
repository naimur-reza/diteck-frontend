import Link from "next/link";
import React from "react";
import { LuArrowRight } from "react-icons/lu";
import { routes2, socialLinks, routes1 } from "./_constants/_constant";

const Footer = () => {
  return (
    <div className="bg-gradient-to-br  from-[#0A0F42] to-[#1B3A61] text-white px-[20px] md:px-[30px] pb-[50px] pt-[50px] md:pt-[150px] rounded-[40px] m-2">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-[2fr_3fr] lg:grid-cols-2 gap-10 pb-[100px]">
          <div>
            <h6 className="footer-text">Tell us about your project</h6>
            <h2 className="text-[65px] md:text-[100px] md:leading-[130px] lg:text-[135px] font-semibold font-primary mt-5">
              Let’s talk
            </h2>
          </div>
          <div>
            <form>
              <p className="footer-text">
                Get the latest inspiration & insights
              </p>
              <div className="my-5 relative lg:w-[70%]">
                <input
                  type="text"
                  placeholder="Your Email..."
                  className="bg-white p-4 placeholder:text-[#111] placeholder:font-bold rounded-2xl w-full text-[#111]"
                />
                <div className="absolute right-1 top-1">
                  <button className="bg-primary p-4 rounded-xl">
                    <LuArrowRight />
                  </button>
                </div>
              </div>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-[50px] border-t-2 border-t-[#ffffff33]">
              <div className="flex flex-col">
                {routes1.map(({ title, link }, idx) => (
                  <Link
                    key={idx}
                    href={link}
                    className="footer-text mb-1 hover:text-white transition-colors duration-300 group inline-block"
                  >
                    <span className="relative inline-block">
                      {title}
                      <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col">
                {routes2.map(({ title, link }, idx) => (
                  <Link
                    key={idx}
                    href={link}
                    className="footer-text mb-1 hover:text-white transition-colors duration-300 group inline-block"
                  >
                    <span className="relative inline-block">
                      {title}
                      <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                ))}
              </div>

              <div>
                <h3 className="footer-text">Head Office</h3>
                <address className="text-[16px] font-normal not-italic flex flex-col gap-2">
                  <span className="block">
                    34 Amin Model Town, Savar Cantonment, Savar, Dhaka - 1344, Bangladesh
                  </span>
                  <span className="block">support@enaema.com</span>
                  <span className="block footer-text text-primary w-full">
                    01926 080 600
                  </span>
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* After Main Footer */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-center border-t-2 gap-2 border-t-primary pt-[50px] text-[16px] font-semibold">
          <div>
            <p className="text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <Link
                href="https://www.enaema.com/"
                target="_blank"
                className="text-primary"
              >
                Ena Ema{" "}
              </Link>
              All Rights Reserved.
            </p>
          </div>
          <div className="flex flex-col flex-wrap lg:flex-row items-center gap-2">
            <span>Follow Us</span>
            <div className="flex flex-wrap justify-center">
              {socialLinks.map(({ title, link }, idx) => (
                <Link
                  key={idx}
                  href={link}
                  className={`pl-4 text-[#ffffff66] text-[16px] font-semibold ${'after:content-["•"] after:mx-4 before:text-[#fff]'}`}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
