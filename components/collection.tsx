"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/image-lightbox";
import { SectionHeading } from "@/components/ui";
import { CATEGORIES, EASE, PRODUCTS, formatPrice, productOrderLink, type Product } from "@/lib/site";

type Filter = (typeof CATEGORIES)[number];

function ProductCard({ product, onZoom }: { product: Product; onZoom: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-wine/70 backdrop-blur-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-espresso">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full border border-cream/20 bg-espresso/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cream backdrop-blur-md">
          {product.category}
        </span>
        <motion.button
          type="button"
          onClick={onZoom}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={`Quick view ${product.name}`}
          className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full border border-cream/20 bg-espresso/70 text-ivory backdrop-blur-md focus-visible:outline-2 focus-visible:outline-cream"
        >
          <ZoomIn className="size-5" aria-hidden="true" />
        </motion.button>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg leading-snug font-semibold text-pretty text-ivory">{product.name}</h3>
          <p className="shrink-0 font-display text-lg font-bold text-cream">{formatPrice(product.price)}</p>
        </div>
        <motion.a
          href={productOrderLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.97 }}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ivory"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Order via WhatsApp
        </motion.a>
      </div>
    </motion.article>
  );
}

export function Collection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [zoomed, setZoomed] = useState<Product | null>(null);

  const visible = filter === "All" ? PRODUCTS : PRODUCTS.filter((product) => product.category === filter);

  return (
    <section id="collection" className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <SectionHeading eyebrow="Collection" title="Featured Apparel" />
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={isActive}
                  className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                    isActive ? "border-cream text-ink" : "border-line text-taupe hover:text-ivory"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="filter-active"
                      className="absolute inset-0 rounded-full bg-cream"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative">{category}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} onZoom={() => setZoomed(product)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ImageLightbox product={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}
