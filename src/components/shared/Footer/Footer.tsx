import Link from "next/link";
import React from "react";
import {
  ScrollFadeIn,
  ScrollScaleIn,
  ScrollSlideIn,
  ScrollStaggerContainer,
  StaggerItem,
  TextReveal,
} from "../animations";
import FooterForm from "./_components/FooterForm";
import { routes1, routes2, socialLinks } from "./_constants/_constant";

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-[#0A0F42] to-[#1B3A61] text-white px-4 sm:px-6 md:px-8 pb-10 md:pb-16 pt-16 md:pt-24 lg:pt-32 rounded-[30px] md:rounded-[40px] m-2 shadow-xl">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-[1.5fr_2fr] lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 pb-16 md:pb-24">
          <ScrollSlideIn direction="up">
            <div className="transform transition-all duration-500 hover:translate-y-[-5px]">
              <h6 className="footer-text text-lg md:text-xl opacity-80">
                Tell us about your project
              </h6>
              <TextReveal delay={0.4} duration={0.8}>
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold font-primary mt-4 md:mt-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                  Let&apos;s talk
                </h2>
              </TextReveal>
            </div>
          </ScrollSlideIn>
          <div className="space-y-12">
            <ScrollFadeIn>
              <FooterForm />
            </ScrollFadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-4 pt-8 md:pt-12 border-t-2 border-t-[#ffffff33]">
              <ScrollStaggerContainer staggerDelay={0.1}>
                <div className="flex flex-col space-y-3">
                  {routes1.map(({ title, link }, idx) => (
                    <StaggerItem key={idx}>
                      <Link
                        href={link}
                        className="footer-text text-white/70 mb-1 hover:text-white transition-all duration-300 group inline-block"
                      >
                        <span className="relative inline-block">
                          {title}
                          <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </StaggerItem>
                  ))}
                </div>
              </ScrollStaggerContainer>

              <ScrollStaggerContainer staggerDelay={0.1}>
                <div className="flex flex-col space-y-3">
                  {routes2.map(({ title, link }, idx) => (
                    <StaggerItem key={idx}>
                      <Link
                        href={link}
                        className="footer-text text-white/70 mb-1 hover:text-white transition-all duration-300 group inline-block"
                      >
                        <span className="relative inline-block">
                          {title}
                          <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </StaggerItem>
                  ))}
                </div>
              </ScrollStaggerContainer>

              <ScrollScaleIn>
                <div className="backdrop-blur-sm bg-white/5 p-4 md:p-5 rounded-xl">
                  <h3 className="footer-text text-lg mb-3">Head Office</h3>
                  <address className="text-[16px] font-normal not-italic flex flex-col gap-3 text-white/80">
                    <span className="block">Bangladesh</span>
                    <span className="block hover:text-white transition-colors duration-300">
                      <a href="mailto:support@diteck.com">support@diteck.com</a>
                    </span>
                    <span className="block footer-text text-primary w-full hover:scale-105 transition-transform duration-300">
                      <a href="">+93826732</a>
                    </span>
                  </address>
                </div>
              </ScrollScaleIn>
            </div>
          </div>
        </div>

        {/* After Main Footer */}
        <ScrollFadeIn>
          <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-4 border-t-2 border-t-[#ffffff33] pt-8 md:pt-12 text-base md:text-[16px] font-medium">
            <div>
              <p className="text-center md:text-left text-white/80">
                © {new Date().getFullYear()}{" "}
                <Link
                  href="/"
                  target="_blank"
                  className="text-primary hover:text-white transition-colors duration-300"
                >
                  Diteck{" "}
                </Link>
                All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-white/90">Follow Us</span>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {socialLinks.map(({ title, link }, idx) => (
                  <Link
                    key={idx}
                    href={link}
                    className="text-white/60 hover:text-white px-2 transition-all duration-300 hover:scale-110"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default Footer;
