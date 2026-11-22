"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, LoaderCircle, MessageCircle } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { ImageDropzone } from "@/components/image-dropzone";
import { EASE, whatsappLink } from "@/lib/site";

const APPAREL = ["Hoodie", "Oversized T-Shirt", "Sweatshirt", "Couple Hoodie Set"];
const COLORS = ["Black", "Beige", "Cream", "White", "Maroon", "Other (mention in notes)"];
const SIZES = ["S", "M", "L", "XL", "XXL"];
const PLACEMENTS = ["Back Print", "Front Print", "Front & Back", "Chest Logo + Back Print", "Sleeve Embroidery"];

type Status = "idle" | "uploading" | "sharing" | "done" | "attach-manually";
type Errors = Partial<Record<"name" | "phone", string>>;

const fieldClass =
  "w-full rounded-xl border border-line bg-espresso px-4 py-3 text-sm text-ivory placeholder:text-taupe/60 transition-colors focus:border-cream focus:outline-none focus:ring-2 focus:ring-cream/30";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ivory">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-[#F4A3A3]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({ id, label, name, options }: { id: string; label: string; name: string; options: string[] }) {
  return (
    <Field label={label} htmlFor={id}>
      <select id={id} name={name} defaultValue={options[0]} className={`${fieldClass} appearance-none`}>
        {options.map((option) => (
          <option key={option} value={option} className="bg-espresso">
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

function openWhatsApp(url: string) {
  const inIframe = window.self !== window.top;
  if (!inIframe) {
    window.location.href = url;
    return;
  }
  const opened = window.open(url, "_blank");
  if (opened) {
    opened.opener = null;
    return;
  }
  try {
    window.top!.location.href = url;
  } catch {
    window.location.href = url;
  }
}

export function CustomInquiryForm() {
  const ids = {
    name: useId(),
    phone: useId(),
    apparel: useId(),
    color: useId(),
    size: useId(),
    placement: useId(),
    notes: useId(),
  };
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const phoneDigits = phone.replace(/[^\d]/g, "");

    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Please enter your full name.";
    if (phoneDigits.length < 10 || phoneDigits.length > 15)
      nextErrors.phone = "Enter a valid WhatsApp number, e.g. 0324 4578990.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = nextErrors.name ? ids.name : ids.phone;
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const notes = String(data.get("notes") ?? "").trim();
    const buildMessage = (imageLine: string) =>
      [
        "*NEW CUSTOM DESIGN INQUIRY - VIBE WEAR PK*",
        "",
        `*Name:* ${name}`,
        `*Phone:* ${phone}`,
        `*Apparel:* ${data.get("apparel")}`,
        `*Color:* ${data.get("color")}`,
        `*Size:* ${data.get("size")}`,
        `*Print Placement:* ${data.get("placement")}`,
        `*Notes:* ${notes || "None"}`,
        "",
        `*Reference Image:* ${imageLine}`,
      ].join("\n");

    const url = whatsappLink(buildMessage(file ? `Will attach "${file.name}" in this chat` : "Not provided"));
    setStatus(file ? "attach-manually" : "done");
    openWhatsApp(url);
  }

  const busy = false;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Custom design inquiry"
      className="flex flex-col gap-5 rounded-3xl border border-line bg-espresso/50 p-5 backdrop-blur-md md:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor={ids.name} error={errors.name}>
          <input
            id={ids.name}
            name="name"
            autoComplete="name"
            placeholder="Ali Raza"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            className={fieldClass}
          />
        </Field>
        <Field label="WhatsApp Number" htmlFor={ids.phone} error={errors.phone}>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0300 1234567"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${ids.phone}-error` : undefined}
            className={fieldClass}
          />
        </Field>
        <SelectField id={ids.apparel} label="Apparel Type" name="apparel" options={APPAREL} />
        <SelectField id={ids.color} label="Color Preference" name="color" options={COLORS} />
        <SelectField id={ids.size} label="Size" name="size" options={SIZES} />
        <SelectField id={ids.placement} label="Print Placement" name="placement" options={PLACEMENTS} />
      </div>

      <ImageDropzone file={file} onChange={setFile} />

      <Field label="Design Notes" htmlFor={ids.notes}>
        <textarea
          id={ids.notes}
          name="notes"
          rows={4}
          placeholder="Lyrics, text, font style, colors, or anything else we should know..."
          className={`${fieldClass} resize-none`}
        />
      </Field>

      <AnimatePresence>
        {status === "attach-manually" ? (
          <motion.div
            role="status"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex gap-3 rounded-2xl border border-cream/40 bg-cream/10 p-4 text-sm leading-relaxed text-ivory">
              <Info className="mt-0.5 size-4 shrink-0 text-cream" aria-hidden="true" />
              <p>
                <span className="font-semibold">Your order details are ready.</span> Please attach your reference image
                directly inside the WhatsApp chat that just opened.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={busy}
        whileHover={busy ? undefined : { scale: 1.02 }}
        whileTap={busy ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-4 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ivory disabled:cursor-wait disabled:opacity-80"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {status === "uploading" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                Uploading Image...
              </>
            ) : status === "sharing" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                Opening Share Sheet...
              </>
            ) : status === "done" ? (
              <>
                <Check className="size-4" aria-hidden="true" />
                Sent — Submit Again
              </>
            ) : (
              <>
                <MessageCircle className="size-4" aria-hidden="true" />
                Send Inquiry via WhatsApp
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <p className="text-center text-xs text-taupe">
        Opens WhatsApp with your details pre-filled. No account needed.
      </p>
    </form>
  );
}
