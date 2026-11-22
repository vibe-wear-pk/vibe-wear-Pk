export const WHATSAPP_NUMBER = "923244578990";
export const WHATSAPP_DISPLAY = "0324 4578990";
export const INSTAGRAM_HANDLE = "@vibe_wear_pk";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const GENERAL_ORDER_LINK = whatsappLink("Hi Vibe Wear, I want to order");

export const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Collection", href: "#collection", id: "collection" },
  { label: "Custom Studio", href: "#custom-design", id: "custom-design" },
  { label: "How It Works", href: "#process", id: "process" },
  { label: "Size Guide & Policies", href: "#policies", id: "policies" },
] as const;

export type Category = "Hoodies" | "T-Shirts" | "Couple Sets";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  alt: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sabr-hoodie",
    name: "Sabr Arabic Calligraphy Hoodie",
    category: "Hoodies",
    price: 1999,
    image: "/images/sabr-hoodie.jpg",
    alt: "Beige hoodie with maroon Arabic calligraphy reading Sabr printed on the back",
  },
  {
    id: "embroidered-tee",
    name: "Traditional Embroidered T-Shirt",
    category: "T-Shirts",
    price: 1250,
    image: "/images/embroidered-tee.jpg",
    alt: "Cream oversized t-shirt with red and brown traditional geometric embroidery on the chest and sleeve",
  },
  {
    id: "na-mithya-na-hoodie",
    name: "Sidhu Moose Wala 'Na Mithya Na' Hoodie",
    category: "Hoodies",
    price: 2450,
    image: "/images/na-mithya-na-hoodie.jpg",
    alt: "Black hoodie with red Na Mithya Na script above a monochrome portrait print on the back",
  },
  {
    id: "the-beast-hoodie",
    name: "Spotify Lyrics 'The Beast' Hoodie",
    category: "Hoodies",
    price: 2200,
    image: "/images/the-beast-hoodie.jpg",
    alt: "Black hoodie printed with The Beast by Cheema Y and Gur Sidhu song lyrics and Spotify branding",
  },
  {
    id: "boss-couple-hoodie",
    name: "The Boss & The Real Boss Couple Hoodie",
    category: "Couple Sets",
    price: 4400,
    image: "/images/boss-couple-hoodie.jpg",
    alt: "Couple wearing matching black hoodies printed with THE BOSS and THE Real BOSS on a city street",
  },
];

export const CATEGORIES = ["All", "Hoodies", "T-Shirts", "Couple Sets"] as const;

export function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-PK")}`;
}

export function productOrderLink(product: Product) {
  return whatsappLink(
    `Hi Vibe Wear, I want to order the *${product.name}* (${formatPrice(product.price)}). Please share size availability.`,
  );
}
