"use client";

import Link from "next/link";
import { FadeIn } from "../../../../../../components/shared/animations";
import InteractiveGridBackground from "./interactive-grid-background";

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-start px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Interactive Grid Background */}
      <InteractiveGridBackground />

      <div className="relative z-10 max-w-4xl">
        <FadeIn delay={0.2}>
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-white bg-opacity-20 rounded-full border border-primary">
            Affordable Hosting for Everyone
          </div>
        </FadeIn>

        <FadeIn delay={0.3} duration={0.8}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Your </span>
            <span className="text-primary">
              Digital
              <br />
              Infrastructure
            </span>
            <span className="text-white"> Provider</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl">
            Build your project on a better enterprise digital infrastructure
            solution that performs, is affordable, and scalable.
          </p>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/service"
              className="px-6 py-3 font-medium text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
            >
              Our Services
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 font-medium text-white bg-primary rounded-md hover:bg-primary transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
