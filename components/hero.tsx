"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Clock, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import type { PointerEvent } from "react";
import { MagneticLink } from "@/components/ui";
import { EASE, INSTAGRAM_HANDLE } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const trust = [
  { icon: Clock, label: "4–5 Working Days Delivery" },
  { icon: Truck, label: "Nationwide Shipping" },
  { icon: Sparkles, label: "Custom Prints & Embroidery" },
];

function ShowcaseCard() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 160, damping: 18 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
      className="relative mx-auto w-full max-w-md [perspective:1200px]"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(140,40,60,0.55),transparent)] blur-2xl"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          onPointerMove={handleMove}
          onPointerLeave={() => {
            px.set(0);
            py.set(0);
          }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative overflow-hidden rounded-[2rem] border border-line bg-wine shadow-2xl shadow-black/50"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/sabr-hoodie.jpg"
              alt="Beige Sabr Arabic calligraphy hoodie hanging on a maroon backdrop"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-cream/15 bg-espresso/70 px-4 py-3 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/80">Featured Drop</span>
              <span className="text-sm font-semibold text-ivory">Sabr Arabic Hoodie</span>
            </div>
            <span className="rounded-full bg-cream px-3 py-1 text-sm font-bold text-ink">Rs. 1,999</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pt-14 pb-20 md:px-8 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-7">
          <motion.p
            variants={item}
            className="w-fit rounded-full border border-line bg-wine/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-cream backdrop-blur-md"
          >
            {INSTAGRAM_HANDLE} • Streetwear Pakistan
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-5xl leading-[0.95] font-black uppercase tracking-wide text-balance text-ivory sm:text-6xl xl:text-7xl"
          >
            Wear your vibe.
            <span className="block text-cream">Supreme apparel.</span>
          </motion.h1>
          <motion.p variants={item} className="max-w-lg text-lg leading-relaxed text-pretty text-taupe">
            Premium heavyweight hoodies, custom printed streetwear, and stylish t-shirts. Fast delivery all across
            Pakistan.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <MagneticLink href="#collection" className="px-7 py-3.5">
              Explore Collection
              <ArrowRight className="size-4" aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="#custom-design" variant="outline" className="px-7 py-3.5">
              Customize Your Own
            </MagneticLink>
          </motion.div>
          <motion.ul variants={item} className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-taupe">
                <Icon className="size-4 text-cream" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <ShowcaseCard />
      </div>
    </section>
  );
}
