// Centralized site configuration, contact info, and reference content.
// Business specifics marked `TODO: confirm` need owner/legal review before launch.

export const SITE = {
  name: "Air Refrigerant",
  legalName: "Air Refrigerant",
  tagline: "EPA Certified Refrigerant & Freon Supplier — Bulk Wholesale Distributor, USA",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://airrefrigerant.site",
  description:
    "EPA-certified refrigerant & Freon wholesale supplier. 100% virgin gas (AHRI-700) in DOT-approved cylinders, with free FedEx/UPS delivery nationwide and no hazmat fees.",
  phone: "(619) 248-0429",
  phoneHref: "tel:+16192480429",
  email: "support@airrefrigerant.shop",
  whatsapp: "https://wa.me/8613072144617",
  // WhatsApp chat button (US support line)
  whatsappChat: "https://wa.me/17084276618",
  whatsappChatNumber: "+1 708-427-6618",
  facebook: "https://www.facebook.com/61576811963921",
  address: {
    line1: "13602 12th St Ste A",
    city: "Chino",
    state: "CA",
    zip: "91710",
    country: "USA",
  },
  warehouses: ["Guilderland Center, New York", "Chino, California (LA area)"],
  social: "1,200+ HVAC pros rely on us for genuine refrigerants.",
} as const;

export const TRUST_BADGES = [
  { label: "EPA Certified", icon: "shield" },
  { label: "AHRI-700 Virgin Gas", icon: "drop" },
  { label: "DOT-Approved Cylinders", icon: "cylinder" },
  { label: "No Hazmat Fees", icon: "truck" },
] as const;

export const HERO_BULLETS = [
  "100% Virgin Gas (AHRI-700)",
  "DOT-Approved Steel Cylinder",
  "Free FedEx/UPS Delivery",
  "No Hazmat Fees",
] as const;

export const GUARANTEES = [
  { title: "Free Shipping & Fast Delivery", body: "Free FedEx/UPS on every order, shipped fast from U.S. warehouses — no hazmat surcharges.", icon: "truck" },
  { title: "Sufficient Quantity Guarantee", body: "Deep inventory of 100% virgin refrigerant, ready for immediate dispatch in bulk or small cans.", icon: "stack" },
  { title: "Payment Security", body: "Encrypted checkout powered by Stripe with trusted payment methods. Your details stay protected.", icon: "lock" },
  { title: "24/7 Customer Service", body: "Talk to refrigerant specialists any time by phone, email, or WhatsApp for orders and support.", icon: "headset" },
] as const;

export interface Review {
  name: string;
  role: string;
  quote: string;
  image: string;
}

// All 6 reviews from the reference data. Images load live from the brand CDN.
export const REVIEWS: Review[] = [
  {
    name: "Emily S.",
    role: "Homeowner",
    quote:
      "Ordered R22 refrigerant for my home AC unit. The delivery was fast, and the refrigerant was exactly what I needed. Very happy with the customer service and the price was reasonable for a small order.",
    image: "https://airrefrigerant.com/cdn/shop/files/review-1.png",
  },
  {
    name: "John H.",
    role: "HVAC Contractor",
    quote:
      "I've been purchasing refrigerants in bulk for our HVAC business from this supplier for a few months. Great prices, fast delivery, and top-quality refrigerants like R454B. Highly recommend for anyone needing bulk supplies.",
    image: "https://airrefrigerant.com/cdn/shop/files/review-2.png",
  },
  {
    name: "Mark T.",
    role: "Industrial Buyer",
    quote:
      "We order large quantities of refrigerants for our industrial operations. The pricing on R22 and R410A is unbeatable, and the shipping is always prompt. Fantastic service and highly reliable.",
    image: "https://airrefrigerant.com/cdn/shop/files/review-3.png",
  },
  {
    name: "Chris M.",
    role: "Car Owner",
    quote:
      "I've been using R134A for my car's AC, and I ordered it online here. Great experience! The website was easy to navigate, and the delivery was on time. I'll definitely order again.",
    image: "https://airrefrigerant.com/cdn/shop/files/review-4.jpg",
  },
  {
    name: "David P.",
    role: "HVAC Service Provider",
    quote:
      "We have a lot of HVAC projects, and we need a constant supply of refrigerants. This supplier's bulk pricing on Freon and other refrigerants like R410 is excellent. We get our orders quickly and never run out of stock.",
    image: "https://airrefrigerant.com/cdn/shop/files/review-5.png",
  },
  {
    name: "Sarah L.",
    role: "Home AC User",
    quote:
      "Needed Freon for my home AC, and I found this supplier. The shipping was quick, and the price for the 30lb cylinder was very reasonable. The customer service team was super helpful.",
    image: "https://airrefrigerant.com/cdn/shop/files/review-6.png",
  },
];
