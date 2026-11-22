"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ComponentProps, PointerEvent, ReactNode } from "react";
import { EASE } from "@/lib/site";

type Variant = "primary" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-cream text-ink hover:bg-ivory",
  outline: "border border-cream/70 text-cream hover:bg-cream/10",
};

type MagneticLinkProps = Omit<ComponentProps<typeof motion.a>, "children"> & {
  variant?: Variant;
  children: ReactNode;
};

export function MagneticLink({ variant = "primary", className = "", children, ...props }: MagneticLinkProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  function handleMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.25);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : ""}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cream/80">{eyebrow}</p>
      <h2 className="font-display text-3xl font-extrabold uppercase tracking-wide text-balance text-ivory md:text-5xl">
        {title}
      </h2>
      {description ? <p className="max-w-xl leading-relaxed text-pretty text-taupe">{description}</p> : null}
    </div>
  );
}
