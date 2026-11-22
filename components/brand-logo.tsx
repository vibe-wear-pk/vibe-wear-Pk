import Image from "next/image";

export function BrandLogo({ size = 44 }: { size?: number }) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full ring-1 ring-line"
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/logo.jpg"
        alt="Vibe Wear logo"
        fill
        sizes={`${size}px`}
        className="scale-[1.22] object-cover"
        priority
      />
    </span>
  );
}
