"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { EASE, GENERAL_ORDER_LINK } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <motion.a
      href={GENERAL_ORDER_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vibe Wear on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed right-5 bottom-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-cream text-ink shadow-xl shadow-black/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-cream"
        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <MessageCircle className="size-6" aria-hidden="true" />
    </motion.a>
  );
}
