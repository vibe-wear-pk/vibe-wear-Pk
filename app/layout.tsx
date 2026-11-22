import type { Metadata, Viewport } from "next";
import { Archivo, Outfit } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe Wear PK | Premium Streetwear & Custom Apparel Pakistan",
  description:
    "Premium heavyweight hoodies, custom printed streetwear, and stylish t-shirts by Vibe Wear PK. Order on WhatsApp with fast delivery all across Pakistan in 4-5 working days.",
  keywords: [
    "Vibe Wear PK",
    "streetwear Pakistan",
    "custom hoodies Pakistan",
    "printed hoodies",
    "couple hoodies",
    "embroidered t-shirts",
  ],
  icons: { icon: "/images/logo.jpg" },
  openGraph: {
    title: "Vibe Wear PK | Wear Your Vibe",
    description:
      "Premium heavyweight hoodies, custom prints and embroidered tees. Delivered across Pakistan.",
    images: ["/images/sabr-hoodie.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#240B10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-dvh bg-espresso font-sans text-taupe">{children}</body>
    </html>
  );
}
