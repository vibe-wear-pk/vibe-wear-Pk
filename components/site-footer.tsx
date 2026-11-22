import { BrandLogo } from "@/components/brand-logo";
import { GENERAL_ORDER_LINK, INSTAGRAM_HANDLE, NAV_LINKS, WHATSAPP_DISPLAY } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-abyss">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="flex max-w-sm flex-col gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size={52} />
            <span className="font-display text-base font-bold uppercase tracking-[0.25em] text-ivory">Vibe Wear PK</span>
          </div>
          <p className="text-sm leading-relaxed text-taupe">
            Premium heavyweight streetwear, custom prints and embroidery. Crafted to order and delivered across
            Pakistan.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream">Explore</p>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="text-sm text-taupe transition-colors hover:text-ivory">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream">Contact</p>
          <a
            href={GENERAL_ORDER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-taupe transition-colors hover:text-ivory"
          >
            WhatsApp: {WHATSAPP_DISPLAY}
          </a>
          <a
            href="https://instagram.com/vibe_wear_pk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-taupe transition-colors hover:text-ivory"
          >
            Instagram: {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-taupe/80 md:px-8">
          © 2026 Vibe Wear PK. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
