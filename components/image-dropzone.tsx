"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useId, useRef, useState, type DragEvent } from "react";
import { EASE } from "@/lib/site";

const ACCEPTED = ["image/png", "image/jpeg", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ImageDropzone({ file, onChange }: { file: File | null; onChange: (file: File | null) => void }) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function accept(candidate: File | undefined) {
    if (!candidate) return;
    if (!ACCEPTED.includes(candidate.type)) {
      setError("Please upload a PNG, JPG, or WEBP image.");
      return;
    }
    if (candidate.size > MAX_BYTES) {
      setError("Image must be under 10 MB.");
      return;
    }
    setError(null);
    onChange(candidate);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    accept(event.dataTransfer.files[0]);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ivory">Reference Design Image</span>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(event) => {
          accept(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <AnimatePresence mode="wait" initial={false}>
        {file && preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-espresso p-3 sm:flex-row sm:items-center"
          >
            {/* Object URL previews cannot be optimized by next/image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Selected reference design preview"
              className="aspect-square w-full rounded-xl object-cover sm:size-28"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ivory">{file.name}</p>
                <p className="text-xs text-taupe">{formatBytes(file.size)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ivory hover:border-cream/60"
                >
                  <RefreshCw className="size-3.5" aria-hidden="true" />
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={() => onChange(null)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ivory hover:border-cream/60"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.label
            key="dropzone"
            htmlFor={inputId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: dragging ? 1.02 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
              dragging ? "border-cream bg-cream/5" : "border-line bg-espresso hover:border-cream/50"
            }`}
          >
            <motion.span
              animate={{ y: dragging ? -4 : [0, -4, 0] }}
              transition={dragging ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex size-12 items-center justify-center rounded-full bg-wine text-cream"
            >
              <ImagePlus className="size-5" aria-hidden="true" />
            </motion.span>
            <span className="text-sm text-ivory">
              <span className="font-semibold text-cream underline underline-offset-4">Click to upload</span> or drag
              and drop
            </span>
            <span className="text-xs text-taupe">PNG, JPG, WEBP up to 10 MB</span>
          </motion.label>
        )}
      </AnimatePresence>
      {error ? (
        <p role="alert" className="text-xs text-[#F4A3A3]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
