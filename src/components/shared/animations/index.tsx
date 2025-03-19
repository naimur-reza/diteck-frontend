"use client";

import { motion, useAnimation, useInView, Variant } from "framer-motion";
import { useEffect, useRef } from "react";

// Reusable animation components
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay,
      duration,
      ease: "easeOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideIn = ({
  children,
  direction = "left",
  delay = 0,
  duration = 0.7,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: -50 },
    down: { x: 0, y: 50 },
  };

  const initial = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        delay,
        duration,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      delay,
      duration,
      ease: [0.175, 0.885, 0.32, 1],
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Staggered container for animating lists of items
export const StaggerContainer = ({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Item to be used inside StaggerContainer
export const StaggerItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hover animation effect
export const HoverScale = ({
  children,
  scale = 1.05,
  className = "",
}: {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Text reveal animation
export const TextReveal = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{
        delay,
        duration,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ===== SCROLL TRIGGERED ANIMATIONS =====

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  amount?: "some" | "all" | number;
}

// Base component for scroll animations
export const ScrollAnimation = ({
  children,
  className = "",
  variants,
  once = true,
  amount = 0.3,
}: ScrollAnimationProps & {
  variants: {
    hidden: Variant;
    visible: Variant;
  };
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once,
    amount,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scroll triggered fade in animation
export const ScrollFadeIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  y = 20,
  once = true,
  amount = 0.3,
}: ScrollAnimationProps & {
  delay?: number;
  duration?: number;
  y?: number;
}) => {
  return (
    <ScrollAnimation
      className={className}
      once={once}
      amount={amount}
      variants={{
        hidden: {
          opacity: 0,
          y,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            delay,
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </ScrollAnimation>
  );
};

// Scroll triggered slide in animation
export const ScrollSlideIn = ({
  children,
  className = "",
  direction = "left",
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.3,
}: ScrollAnimationProps & {
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
}) => {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 }, // Note: Reversed for scroll animations (slides up as you scroll down)
    down: { x: 0, y: -50 }, // Note: Reversed for scroll animations
  };

  const initial = directionMap[direction];

  return (
    <ScrollAnimation
      className={className}
      once={once}
      amount={amount}
      variants={{
        hidden: {
          opacity: 0,
          ...initial,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </ScrollAnimation>
  );
};

// Scroll triggered scale in animation
export const ScrollScaleIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.3,
}: ScrollAnimationProps & {
  delay?: number;
  duration?: number;
}) => {
  return (
    <ScrollAnimation
      className={className}
      once={once}
      amount={amount}
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.8,
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration,
            delay,
            ease: [0.175, 0.885, 0.32, 1],
          },
        },
      }}
    >
      {children}
    </ScrollAnimation>
  );
};

// Scroll triggered staggered container
export const ScrollStaggerContainer = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  once = true,
  amount = 0.3,
}: ScrollAnimationProps & {
  delay?: number;
  staggerDelay?: number;
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once,
    amount,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
