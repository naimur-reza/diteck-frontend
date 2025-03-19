"use client";

import {
  ScrollFadeIn,
  ScrollScaleIn,
  ScrollSlideIn,
  ScrollStaggerContainer,
  StaggerItem,
} from "../../../../../components/shared/animations";

const ScrollAnimationExample = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-24">
        <ScrollFadeIn>
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Scroll-Triggered Animations
          </h2>
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.2}>
          <p className="text-center max-w-3xl mx-auto text-gray-500">
            These animations are triggered when the elements enter the viewport.
            Scroll down to see each section animate as it comes into view.
          </p>
        </ScrollFadeIn>
      </div>

      {/* First Section */}
      <div className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ScrollSlideIn direction="left">
            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-3">Slide In Animation</h3>
              <p className="text-gray-600">
                This content slides in from the left when it enters your
                viewport. You can choose different directions: left, right, up,
                or down.
              </p>
            </div>
          </ScrollSlideIn>
          <ScrollSlideIn direction="right" delay={0.2}>
            <div className="h-80 bg-blue-100 rounded-lg shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold">
                Slide from Right
              </div>
            </div>
          </ScrollSlideIn>
        </div>
      </div>

      {/* Second Section */}
      <div className="mb-24">
        <ScrollFadeIn>
          <h3 className="text-2xl font-bold text-center mb-12">
            Fade In Animation
          </h3>
        </ScrollFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <ScrollFadeIn key={item} delay={item * 0.1}>
              <div className="p-6 bg-purple-50 rounded-lg shadow-sm h-60 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-5xl font-bold text-purple-500 mb-2">
                    {item}
                  </span>
                  <p className="text-purple-700">Fades in with delay</p>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>

      {/* Third Section */}
      <div className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ScrollSlideIn direction="up">
            <div className="h-80 bg-green-100 rounded-lg shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-green-500 font-bold">
                Slide from Bottom
              </div>
            </div>
          </ScrollSlideIn>
          <ScrollScaleIn delay={0.2}>
            <div className="p-6 bg-green-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-3">Scale In Animation</h3>
              <p className="text-gray-600">
                This content scales in with a smooth animation when it enters
                your viewport. It combines scaling and fading for a more
                dramatic effect.
              </p>
            </div>
          </ScrollScaleIn>
        </div>
      </div>

      {/* Fourth Section with Staggered Items */}
      <div className="mb-24">
        <ScrollFadeIn>
          <h3 className="text-2xl font-bold text-center mb-12">
            Staggered Animation
          </h3>
        </ScrollFadeIn>
        <ScrollStaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <StaggerItem key={i}>
                <div className="bg-orange-50 p-6 rounded-lg shadow-sm flex flex-col items-center justify-center h-40">
                  <span className="text-3xl font-bold text-orange-500 mb-2">
                    {i}
                  </span>
                  <p className="text-orange-700 text-center">Staggered item</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </ScrollStaggerContainer>
      </div>

      {/* Final Call to Action */}
      <div>
        <ScrollScaleIn>
          <div className="max-w-3xl mx-auto text-center bg-gray-50 p-10 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-4">
              Ready to use scroll animations?
            </h3>
            <p className="text-gray-600 mb-6">
              These scroll-triggered animations are completely reusable. Just
              import them from the animation components and wrap your elements.
            </p>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </div>
        </ScrollScaleIn>
      </div>
    </div>
  );
};

export default ScrollAnimationExample;
