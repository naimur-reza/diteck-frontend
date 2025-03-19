import React from "react";
import ScrollAnimationExample from "../home/_components/Example/ScrollAnimationExample";

export const metadata = {
  title: "Animation Examples - Reusable Animation Components",
  description: "Demo of reusable and scroll-triggered animation components",
};

const AnimationExamplesPage = () => {
  return (
    <div className="min-h-screen py-16">
      <ScrollAnimationExample />
    </div>
  );
};

export default AnimationExamplesPage;
