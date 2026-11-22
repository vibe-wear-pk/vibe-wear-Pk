"use client";

import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/site";

export function MotionProvider({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-cream"
        style={{ scaleX }}
      />
      {children}
    </MotionConfig>
  );
}
