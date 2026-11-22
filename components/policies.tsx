"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock, Ruler, ShieldAlert, Truck } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui";
import { EASE } from "@/lib/site";

const policies = [
  {
    icon: ShieldAlert,
    title: "Strict No-Return Policy",
    body: "Since every piece is crafted & printed to order, returns or exchanges are not accepted unless defective.",
  },
  {
    icon: Truck,
    title: "Premium Fabric Quality",
    body: "Delivery all over Pakistan.",
  },
  {
    icon: Clock,
    title: "4-5 Working Days Delivery",
    body: "Standard processing and doorstep delivery across all major cities in Pakistan.",
  },
];

const sizeChart = [
  { size: "S", chest: 42, length: 27, shoulder: 20, sleeve: 23 },
  { size: "M", chest: 44, length: 28, shoulder: 21, sleeve: 23.5 },
  { size: "L", chest: 46, length: 29, shoulder: 22, sleeve: 24 },
  { size: "XL", chest: 48, length: 30, shoulder: 23, sleeve: 24.5 },
  { size: "XXL", chest: 50, length: 31, shoulder: 24, sleeve: 25 },
];

function SizeGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-wine/70 backdrop-blur-md">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="size-chart"
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="flex items-center gap-4">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-espresso text-cream">
            <Ruler className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="font-semibold text-ivory">Oversized Fit Size Chart</span>
            <span className="text-sm text-taupe">Measurements in inches, laid flat</span>
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
          <ChevronDown className="size-5 text-cream" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="size-chart"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto px-6 pb-6">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <caption className="sr-only">Oversized fit size chart in inches</caption>
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-widest text-cream">
                    <th scope="col" className="py-3 pr-4 font-semibold">Size</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Chest</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Length</th>
                    <th scope="col" className="py-3 pr-4 font-semibold">Shoulder</th>
                    <th scope="col" className="py-3 font-semibold">Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row) => (
                    <tr key={row.size} className="border-b border-line/60 last:border-0">
                      <th scope="row" className="py-3 pr-4 font-display font-bold text-ivory">{row.size}</th>
                      <td className="py-3 pr-4 text-taupe">{row.chest}&quot;</td>
                      <td className="py-3 pr-4 text-taupe">{row.length}&quot;</td>
                      <td className="py-3 pr-4 text-taupe">{row.shoulder}&quot;</td>
                      <td className="py-3 text-taupe">{row.sleeve}&quot;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs text-taupe">
                Prefer a regular fit? Size down one. Unsure? Message us on WhatsApp with your height and weight.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Policies() {
  return (
    <section id="policies" className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading eyebrow="Size Guide & Policies" title="Before you order" />
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {policies.map(({ icon: Icon, title, body }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-4 rounded-3xl border border-line bg-wine/70 p-6 backdrop-blur-md"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-espresso text-cream">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-ivory">{title}</h3>
              <p className="leading-relaxed text-taupe">{body}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <SizeGuide />
        </motion.div>
      </div>
    </section>
  );
}
