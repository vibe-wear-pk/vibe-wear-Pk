"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { EASE, formatPrice, productOrderLink, type Product } from "@/lib/site";

export function ImageLightbox({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} close-up view`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-abyss/90 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-line bg-wine"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-10 inline-flex size-11 items-center justify-center rounded-full border border-cream/20 bg-espresso/80 text-ivory backdrop-blur-md focus-visible:outline-2 focus-visible:outline-cream"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <div className="relative h-[70dvh] w-full bg-espresso">
              <Image src={product.image} alt={product.alt} fill sizes="(min-width: 768px) 48rem, 100vw" className="object-contain" />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 border-t border-line p-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream/80">{product.category}</p>
                <p className="text-lg font-semibold text-ivory">{product.name}</p>
                <p className="font-display font-bold text-cream">{formatPrice(product.price)}</p>
              </div>
              <a
                href={productOrderLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink hover:bg-ivory"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Order via WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
