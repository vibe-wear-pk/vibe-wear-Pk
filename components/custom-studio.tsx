"use client";

import { motion } from "framer-motion";
import { CustomInquiryForm } from "@/components/custom-inquiry-form";
import { EASE } from "@/lib/site";

const steps = [
  {
    number: "01",
    title: "Upload & Describe",
    body: "Share your reference image, garment color, and print placement.",
  },
  {
    number: "02",
    title: "Digital Mockup Approval",
    body: "Our team confirms sizing, print style, and quote on WhatsApp.",
  },
  {
    number: "03",
    title: "Crafted & Dispatched",
    body: "Printed on premium fabric and delivered across Pakistan in 4–5 working days.",
  },
];

export function CustomStudio() {
  return (
    <section id="custom-design" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-wine p-6 md:p-10 lg:p-14"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-px left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-cream to-transparent"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cream/80">Bespoke Customization</p>
                <h2 className="font-display text-3xl font-extrabold uppercase tracking-wide text-balance text-ivory md:text-5xl">
                  Design your own streetwear
                </h2>
                <p className="max-w-lg leading-relaxed text-pretty text-taupe">
                  Want your own artwork, favorite song lyrics, Arabic calligraphy, or couple concept printed on
                  heavyweight fabric? Upload your reference image and send your requirements straight to our WhatsApp.
                </p>
              </div>

              <ol id="process" className="flex scroll-mt-28 flex-col gap-4" aria-label="How it works">
                {steps.map((step, index) => (
                  <motion.li
                    key={step.number}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
                    whileHover={{ x: 6 }}
                    className="flex gap-5 rounded-2xl border border-line bg-espresso/60 p-5 backdrop-blur-md"
                  >
                    <span className="font-display text-2xl font-black text-cream">{step.number}.</span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-ivory">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-taupe">{step.body}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            <CustomInquiryForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
