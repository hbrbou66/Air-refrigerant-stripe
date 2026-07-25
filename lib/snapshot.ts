import type { Product } from "./types";

// ---------------------------------------------------------------------------
// Bundled Air Refrigerant catalog used by the Stripe storefront.
// Prices are in USD units (389 = $389.00). Stripe Checkout Sessions are created
// from these server-side values, so product prices are never trusted from the
// browser. Keep variant IDs stable because persisted carts reference them.
// ---------------------------------------------------------------------------

const CDN = "https://cdn.fourthwall.com/offer/sh_acb4c75e-7ae8-40b3-a2a4-5197b5d8dc45";

export const SNAPSHOT_PRODUCTS: Product[] = [
  {
    id: "0f0c84eb-3f5e-453d-a822-b450dae9a825",
    name: "R22 Refrigerant 30lb (13.6kg) — Factory Sealed, U.S. Stock",
    slug: "r22-refrigerant-30lb-13-6kg-factory-sealed-u-s-stock",
    description:
      "Brand-new, factory-sealed R22 cylinders with laboratory-grade purity (99.9%+) for reliable performance and compressor longevity when servicing legacy HVAC systems. R22 remains essential for maintaining older AC units built before the EPA phaseout of ozone-depleting substances. This 30 lb cylinder is sized for full recharges on large residential or light commercial systems.",
    currency: "USD",
    images: [`${CDN}/dd99a183-106d-4bf1-bb0a-941a70beb867.jpeg`, `${CDN}/74665f15-2c36-47fe-8e99-3d8cbf1e9c3a.jpeg`, `${CDN}/08913d8b-bb02-4a96-b048-3843c1bfed00.jpeg`, `${CDN}/35ee5e39-fa61-4b91-8085-656c1a47320b.png`],
    variants: [
      { id: "fbdb9af0-0747-4a26-834a-47c645fdd0ac", name: "1 Cylinder", sku: "ZSBY-8TT0B00", price: 389, compareAtPrice: 448, currency: "USD", weightLb: 30, optionLabel: "1 Cylinder", available: true },
      { id: "3a11f0d8-4bbe-42fd-b0f6-62c93114fc7d", name: "10 Cylinders", sku: "ZSBY-QGG0B00", price: 3490, compareAtPrice: 4080, currency: "USD", weightLb: 30, optionLabel: "10 Cylinders", available: true },
      { id: "4a03423d-c8ca-4a24-bfba-0c33b21d2333", name: "20 Cylinders", sku: "ZSBY-EEE0A00", price: 6780, compareAtPrice: 7960, currency: "USD", weightLb: 30, optionLabel: "20 Cylinders", available: true },
    ],
    minPrice: 389, minComparePrice: 448,
    refrigerantCode: "R22", sizeLb: 30, sizeBucket: "bulk",
    applications: ["legacy-hvac", "residential-ac"], gwp: "1810",
  },
  {
    id: "3e6a2a2d-fe6b-451f-a900-5ed73f4c947b",
    name: "R22 Refrigerant 5lb (2.3kg) — For Older Home AC Units, Easy to Use",
    slug: "r22-refrigerant-5lb-2-3kg-for-older-home-ac-units-easy-to-use",
    description:
      "Factory-sealed R22 in a convenient 5 lb cylinder for on-site service of older home AC units. Laboratory-grade purity (99.9%+) keeps legacy systems running where every ounce of charge counts.",
    currency: "USD",
    images: [`${CDN}/26efd4ca-fdcd-416f-bd2e-59e92e08525e.png`, `${CDN}/f4161f94-088c-4020-98c9-734d3ac0905f.png`, `${CDN}/68eb9061-23fd-4817-97fe-1ada4f710c0c.png`],
    variants: [
      { id: "63b725b8-a07f-4e45-81bd-9d2b231989e4", name: "5lb", sku: "Z3CV-75M0000", price: 209.99, compareAtPrice: 259, currency: "USD", weightLb: 5, optionLabel: "5lb", available: true },
    ],
    minPrice: 209.99, minComparePrice: 259,
    refrigerantCode: "R22", sizeLb: 5, sizeBucket: "small",
    applications: ["legacy-hvac", "residential-ac"], gwp: "1810",
  },
  {
    id: "6127a721-e6ef-4a7d-a9ab-3fc7ee139918",
    name: "R22 Refrigerant 2.5lb (1.15kg) — For Older Home AC Units, Easy to Use",
    slug: "r22-refrigerant-2-5lb-1-15kg-for-older-home-ac-units-easy-to-use-new-product",
    description:
      "A compact 2.5 lb cylinder of factory-sealed R22 for quick recharges and small jobs on older home AC units. Genuine, high-purity refrigerant ready for immediate dispatch.",
    currency: "USD",
    images: [`${CDN}/d9313848-4f53-4171-bee3-2139889f28dd.png`, `${CDN}/c685b0a9-9761-489d-ad1d-26947f1d5cd9.png`, `${CDN}/ac0dbd38-f3ce-47a3-8e75-43303da53508.png`],
    variants: [
      { id: "4e9024a6-9806-42a5-bd33-ce858073ca3b", name: "2.5lb", sku: "ZJ06-9RF0000", price: 159, compareAtPrice: 199, currency: "USD", weightLb: 2.5, optionLabel: "2.5lb", available: true },
    ],
    minPrice: 159, minComparePrice: 199,
    refrigerantCode: "R22", sizeLb: 2.5, sizeBucket: "small",
    applications: ["legacy-hvac", "residential-ac"], gwp: "1810",
  },
  {
    id: "151ff625-995a-46b0-8265-1c87c2199140",
    name: "R410A Refrigerant 25lb (11.3kg) — For Home Air Conditioners & Heat Pumps, Easy to Use",
    slug: "r410a-refrigerant-25lb-11-3kg-for-home-air-conditioners-heat-pumps-easy-to-use",
    description:
      "Factory-sealed R410A with 99.9%+ purity for stable high-pressure operation and consistent cooling capacity. The industry standard for post-2010 residential AC, heat pumps, and ductless systems. This 25 lb cylinder covers full recharges on 3–5 ton systems or multiple service calls.",
    currency: "USD",
    images: [`${CDN}/25c7e4bc-6981-4ba0-9068-00952fc10bd5.png`, `${CDN}/2090f890-8e74-46dc-b261-bfa265177007.png`, `${CDN}/b2fc52c1-d180-4b40-9201-80de199f9142.png`],
    variants: [
      { id: "ad478d83-40cd-4e0d-8f58-7239965bc046", name: "1 Cylinder", sku: "ZKLE-PZ60A00", price: 239, compareAtPrice: 309, currency: "USD", weightLb: 25, optionLabel: "1 Cylinder", available: true },
      { id: "457e372e-908c-436e-99cd-645d857dd997", name: "10 Cylinders", sku: "ZKLE-0F00B00", price: 1990, compareAtPrice: 2690, currency: "USD", weightLb: 25, optionLabel: "10 Cylinders", available: true },
      { id: "bcdcff59-f58c-4859-abae-5b251ba9d4e8", name: "20 Cylinders", sku: "ZKLE-H2F0A00", price: 3780, compareAtPrice: 5180, currency: "USD", weightLb: 25, optionLabel: "20 Cylinders", available: true },
    ],
    minPrice: 239, minComparePrice: 309,
    refrigerantCode: "R410A", sizeLb: 25, sizeBucket: "bulk",
    applications: ["residential-ac"], gwp: "2088",
  },
  {
    id: "069482a9-4086-491f-81a2-75719c58d824",
    name: "R410A Refrigerant 2.5lb (1.15kg) — For Home Air Conditioners & Heat Pumps, Easy to Use",
    slug: "r410a-refrigerant-2-5lb-1-15kg-for-home-air-conditioners-heat-pumps-easy-to-use",
    description:
      "A compact 2.5 lb cylinder of factory-sealed R410A for top-ups and small service calls on home air conditioners and heat pumps. Laboratory-grade purity for reliable high-pressure performance.",
    currency: "USD",
    images: [`${CDN}/eb611405-7dc5-43f4-a429-232637110341.png`, `${CDN}/76cf6d27-bd0d-44bc-bd0c-15d2318838fa.png`, `${CDN}/5898adf4-6f37-497c-871b-efd02f744386.png`],
    variants: [
      { id: "8ceafe02-68b3-4c6a-9ace-1a21471e3f5a", name: "2.5lb", sku: "Z5DZ-7RB0000", price: 98, compareAtPrice: 168, currency: "USD", weightLb: 2.5, optionLabel: "2.5lb", available: true },
    ],
    minPrice: 98, minComparePrice: 168,
    refrigerantCode: "R410A", sizeLb: 2.5, sizeBucket: "small",
    applications: ["residential-ac"], gwp: "2088",
  },
  {
    id: "2a6095fd-df13-41b7-a63b-3338f9048749",
    name: "R410A Refrigerant 5lb (2.3kg) — For Home Air Conditioners & Heat Pumps, Easy to Use",
    slug: "r410a-refrigerant-5lb-2-3kg-for-home-air-conditioners-heat-pumps-easy-to-use",
    description:
      "Factory-sealed R410A in a 5 lb cylinder — the industry standard for residential and light commercial AC. Consistent, high-purity refrigerant for confident system recharges.",
    currency: "USD",
    images: [`${CDN}/b80ff7b5-0c12-4b19-bdb7-df802705b678.png`, `${CDN}/b6df07fc-5eeb-4eb3-aaf6-b0ffb312c911.png`, `${CDN}/68ef52fb-6624-4b78-b984-9b1aa0c4f848.png`],
    variants: [
      { id: "c7a057cb-4c47-4057-b885-bc9dbb9672dd", name: "5lb", sku: "ZZ1U-CSU0000", price: 99, compareAtPrice: 169, currency: "USD", weightLb: 5, optionLabel: "5lb", available: true },
    ],
    minPrice: 99, minComparePrice: 169,
    refrigerantCode: "R410A", sizeLb: 5, sizeBucket: "small",
    applications: ["residential-ac"], gwp: "2088",
  },
  {
    id: "97b86f1b-e4d7-4d28-b0b2-b563d684668f",
    name: "R410A Refrigerant 7.5lb (3.4kg) — For Home Air Conditioners & Heat Pumps, Easy to Use",
    slug: "r410a-refrigerant-7-5lb-3-4kg-for-home-air-conditioners-heat-pumps-easy-to-use",
    description:
      "A 7.5 lb cylinder of factory-sealed R410A delivering optimal charge capacity for recharges on 3–5 ton systems. Reliable, high-purity refrigerant for the installed base of R410A equipment.",
    currency: "USD",
    images: [`${CDN}/858cb256-5c02-49f4-b18b-57c0e927e19f.png`, `${CDN}/7194bfa5-8277-4259-87d8-e5b933c00ac9.png`, `${CDN}/58741e71-139e-4b51-92e0-c37d4a05ef5f.png`],
    variants: [
      { id: "cf4ab1e2-c38d-4e1e-8b89-954b33e9f6ae", name: "7.5lb", sku: "ZLSK-Z980000", price: 188, compareAtPrice: 258, currency: "USD", weightLb: 7.5, optionLabel: "7.5lb", available: true },
    ],
    minPrice: 188, minComparePrice: 258,
    refrigerantCode: "R410A", sizeLb: 7.5, sizeBucket: "small",
    applications: ["residential-ac"], gwp: "2088",
  },
  {
    id: "51bd79cf-3593-43ca-9911-d673ed932062",
    name: "R410A Refrigerant 10lb (4.5kg) — For Home Air Conditioners & Heat Pumps, Easy to Use",
    slug: "r410a-refrigerant-10lb-4-5kg-for-home-air-conditioners-heat-pumps-easy-to-use",
    description:
      "Factory-sealed R410A in a 10 lb cylinder — an essential inventory item for contractors maintaining post-2010 residential AC, heat pumps, and mini-splits with consistent, high-purity gas.",
    currency: "USD",
    images: [`${CDN}/a887de7c-cac8-49f2-9426-7fe1c4aa9d53.png`, `${CDN}/ab8ffa9e-4391-4b8c-81ca-43fbd4d47a59.png`, `${CDN}/e5415086-761e-4a03-a828-7f773eefb51e.png`],
    variants: [
      { id: "505c4a45-df35-45b7-85a3-1c532333f610", name: "10lb", sku: "ZJDV-CD10000", price: 198, compareAtPrice: 268, currency: "USD", weightLb: 10, optionLabel: "10lb", available: true },
    ],
    minPrice: 198, minComparePrice: 268,
    refrigerantCode: "R410A", sizeLb: 10, sizeBucket: "small",
    applications: ["residential-ac"], gwp: "2088",
  },
  {
    id: "697d8590-4fb0-4c9e-ae3b-bc4913ea1025",
    name: "R404A Refrigerant 24lb (10.9kg) Tank — High Purity for Commercial Refrigeration",
    slug: "r404a-refrigerant-24-lb-10-9-kg-tank-high-purity-for-commercial-refrigeration",
    description:
      "Factory-sealed R404A with 99.9%+ purity for precise sub-zero temperatures and reliable compressor operation in low-temperature commercial refrigeration. Remains available for servicing the installed base of freezer cases, cold storage, and transport refrigeration. This 24 lb cylinder covers full recharges on medium-sized freezer systems.",
    currency: "USD",
    images: [`${CDN}/2b2f7979-475e-40be-a9e8-293b62855be8.png`, `${CDN}/738d8e13-735e-4cb5-bfed-0d9af9704e3b.png`, `${CDN}/4ec1e1f7-ab90-4817-8c74-4187ac0c7cd7.png`],
    variants: [
      { id: "82bc43e6-8678-4e85-afb1-d168de9b90bc", name: "1 Cylinder", sku: "ZTR6-60Y0A00", price: 229, compareAtPrice: 319, currency: "USD", weightLb: 24, optionLabel: "1 Cylinder", available: true },
      { id: "94851e16-0c9b-4ad0-a0b2-701c6cbd30ba", name: "10 Cylinders", sku: "ZTR6-9HJ0B00", price: 1890, compareAtPrice: 2790, currency: "USD", weightLb: 24, optionLabel: "10 Cylinders", available: true },
      { id: "063b74fc-543c-429e-a8a5-24dc4d5d3f5c", name: "20 Cylinders", sku: "ZTR6-XK90A00", price: 3580, compareAtPrice: 5380, currency: "USD", weightLb: 24, optionLabel: "20 Cylinders", available: true },
    ],
    minPrice: 229, minComparePrice: 319,
    refrigerantCode: "R404A", sizeLb: 24, sizeBucket: "bulk",
    applications: ["commercial-refrigeration"], gwp: "3922",
  },
  {
    id: "0415825a-18dc-48b3-abba-4d35936eb8fd",
    name: "R404A Refrigerant 2.5lb (1.15kg) — For Commercial Fridges & Freezers, Easy to Use",
    slug: "r404a-refrigerant-2-5lb-1-15kg-for-commercial-fridges-freezers-easy-to-use",
    description:
      "A compact 2.5 lb cylinder of factory-sealed R404A for quick service of commercial fridges and freezers. High-purity gas for stable low-temperature performance.",
    currency: "USD",
    images: [`${CDN}/277f673c-34be-4d3f-b4e2-f32693bd186b.png`, `${CDN}/22f96f8c-65fc-4e87-833b-975f09b73c96.png`, `${CDN}/6c9aca0e-9bca-48bb-84c4-7f75c3f80ca7.png`],
    variants: [
      { id: "c9901501-0f16-4c36-80d3-5a9498b2523b", name: "2.5lb", sku: "ZDJZ-NJ50000", price: 99, compareAtPrice: 189, currency: "USD", weightLb: 2.5, optionLabel: "2.5lb", available: true },
    ],
    minPrice: 99, minComparePrice: 189,
    refrigerantCode: "R404A", sizeLb: 2.5, sizeBucket: "small",
    applications: ["commercial-refrigeration"], gwp: "3922",
  },
  {
    id: "376cd96a-f781-4327-822a-e01e26af12b7",
    name: "R404A Refrigerant 5lb (2.3kg) — For Commercial Fridges & Freezers, Easy to Use",
    slug: "r404a-refrigerant-5lb-2-3kg-for-commercial-fridges-freezers-easy-to-use",
    description:
      "Factory-sealed R404A in a 5 lb cylinder for commercial refrigeration service. Laboratory-grade purity maintains precise sub-zero temperatures in display cases and walk-ins.",
    currency: "USD",
    images: [`${CDN}/560d0455-3981-4985-8265-471be764ec5c.png`, `${CDN}/be561aea-94d3-4378-8d65-86018573a630.png`, `${CDN}/cfdaf52e-d7fb-439d-8b82-e7660582c3f5.png`],
    variants: [
      { id: "8e89270a-13c1-40dc-96e8-71f76b7fcec3", name: "5lb", sku: "ZEXQ-UYV0000", price: 169, compareAtPrice: 259, currency: "USD", weightLb: 5, optionLabel: "5lb", available: true },
    ],
    minPrice: 169, minComparePrice: 259,
    refrigerantCode: "R404A", sizeLb: 5, sizeBucket: "small",
    applications: ["commercial-refrigeration"], gwp: "3922",
  },
  {
    id: "9e82b059-ae1c-4d3d-861d-68387c36b7d4",
    name: "R404A Refrigerant 7.5lb (3.4kg) — For Commercial Fridges & Freezers, Easy to Use",
    slug: "r404a-refrigerant-7-5lb-3-4kg-for-commercial-fridges-freezers-easy-to-use",
    description:
      "A 7.5 lb cylinder of factory-sealed R404A for commercial fridge and freezer service. Reliable, temperature-stable refrigerant for critical cold-chain applications.",
    currency: "USD",
    images: [`${CDN}/6a2edbbb-b971-485c-98c8-a083267fe760.png`, `${CDN}/29b3d616-56d7-43f0-b127-e480984e6c66.png`, `${CDN}/51905e20-c9d9-4aae-85ed-d1a3e57fb759.png`],
    variants: [
      { id: "592d63ef-e996-4f28-bd53-6f2434398c5f", name: "7.5lb", sku: "ZTT4-K130000", price: 179, compareAtPrice: 269, currency: "USD", weightLb: 7.5, optionLabel: "7.5lb", available: true },
    ],
    minPrice: 179, minComparePrice: 269,
    refrigerantCode: "R404A", sizeLb: 7.5, sizeBucket: "small",
    applications: ["commercial-refrigeration"], gwp: "3922",
  },
  {
    id: "db249419-a896-416e-a189-093d3cea8e31",
    name: "R32 Refrigerant 20lb (9.5kg) — For Home AC & Heat Pumps, Easy to Use",
    slug: "r32-refrigerant-20lb-9-5kg-for-home-ac-heat-pumps-easy-to-use",
    description:
      "Single-component R32 with significantly lower GWP (675) than R410A and up to 10% higher cooling efficiency. An A2L refrigerant that is now the global standard for new residential split systems and mini-splits, requiring ~30% less charge weight than R410A. This 20 lb cylinder is ideal for 2–4 ton installations.",
    currency: "USD",
    images: [`${CDN}/ac8710de-ac81-4b55-9f29-c2fbaf8dbe41.png`, `${CDN}/5b2aa347-b196-4d57-8128-8cc335c0c490.png`, `${CDN}/7fda1e0b-a1c8-4122-8d15-3efadfa6e526.png`],
    variants: [
      { id: "890c8aed-48dc-491a-853d-062599ee61c5", name: "1 Cylinder", sku: "Z1JA-Y3R0B00", price: 289, compareAtPrice: 319, currency: "USD", weightLb: 20, optionLabel: "1 Cylinder", available: true },
      { id: "7ef4e22f-7b3b-42df-b1c9-0f55ae355a85", name: "10 Cylinders", sku: "Z1JA-PCH0B00", price: 2490, compareAtPrice: 2790, currency: "USD", weightLb: 20, optionLabel: "10 Cylinders", available: true },
      { id: "6a4194fb-2a32-42cb-be4d-25de327430be", name: "20 Cylinders", sku: "Z1JA-1GF0A00", price: 4780, compareAtPrice: 5380, currency: "USD", weightLb: 20, optionLabel: "20 Cylinders", available: true },
    ],
    minPrice: 289, minComparePrice: 319,
    refrigerantCode: "R32", sizeLb: 20.9, sizeBucket: "bulk", gwp: "675",
    applications: ["residential-ac"],
  },
  {
    id: "73b3157b-2791-429a-af8c-c4d1a841e075",
    name: "R454B Refrigerant 20.9lb (Case of 5) — Next-Gen Low-GWP AC",
    slug: "r454b-refrigerant-20-9lb-case-of-5",
    description:
      "An advanced A2L HFC/HFO blend with ultra-low GWP (466), approved by EPA SNAP as a leading replacement for R410A in new residential air conditioners, heat pumps, and light commercial VRF systems. This 20.9 lb cylinder is the ideal charge size for single- and multi-split installs up to 4 tons, helping contractors meet the AIM Act phasedown.",
    currency: "USD",
    images: [`${CDN}/6e48a696-c81a-4019-900c-e21d1ee94e92.png`, `${CDN}/379b47b5-b5be-41bd-a59a-ffbb1c6c2eef.png`, `${CDN}/db1598b3-032a-4178-b515-39b42ffcdbf5.png`],
    variants: [
      { id: "6f2bfed0-eb9c-4867-9779-9865dfafb666", name: "20.9lb (Case of 5)", sku: "ZAXR-AKR0000", price: 489, compareAtPrice: 589, currency: "USD", weightLb: 20.9, optionLabel: "20.9lb", available: true },
    ],
    minPrice: 489, minComparePrice: 589,
    refrigerantCode: "R454B", sizeLb: 20.9, sizeBucket: "bulk", gwp: "466", blendNote: "R32/R1234yf",
    applications: ["residential-ac"],
  },
  {
    id: "6161e195-1e70-473d-8b32-96f25c109beb",
    name: "R407C Refrigerant 25lb (11.3kg) — For Retrofit Systems Replacing R22, Easy to Use",
    slug: "r407c-refrigerant-25lb-11-3kg-for-retrofit-systems-replacing-r22-easy-to-use",
    description:
      "A zeotropic HFC blend (R32/R125/R134a) engineered as a proven retrofit alternative for R22 in existing AC and medium-temperature refrigeration. Operates at comparable pressures to R22 and delivers stable performance in rooftop units, chillers, and light commercial HVAC. This 25 lb cylinder supports full system conversions on 3–5 ton units.",
    currency: "USD",
    images: [`${CDN}/b45a0e98-8235-401f-887b-d61b1c1a40aa.png`, `${CDN}/8d2adb86-fcdb-463c-b035-1869e6e8e233.png`, `${CDN}/e0699432-14b7-4dc5-bcce-5e34f2223acf.png`],
    variants: [
      { id: "b29cc90d-6585-47b9-ac83-3420addb0377", name: "1 Cylinder", sku: "Z2LG-ZR00A00", price: 249, compareAtPrice: 319, currency: "USD", weightLb: 25, optionLabel: "1 Cylinder", available: true },
      { id: "7b074cf8-a3f2-4b8f-bd03-440c0107de62", name: "10 Cylinders", sku: "Z2LG-ARV0B00", price: 2090, compareAtPrice: 2790, currency: "USD", weightLb: 25, optionLabel: "10 Cylinders", available: true },
      { id: "9b4b6ffd-3a25-422c-88b3-a5b2d490cfad", name: "20 Cylinders", sku: "Z2LG-DQA0A00", price: 3980, compareAtPrice: 5380, currency: "USD", weightLb: 25, optionLabel: "20 Cylinders", available: true },
    ],
    minPrice: 249, minComparePrice: 319,
    refrigerantCode: "R407C", sizeLb: 25, sizeBucket: "bulk", gwp: "1774", blendNote: "R32/R125/R134a",
    applications: ["r22-replacements", "commercial-refrigeration"],
  },
  {
    id: "0944fe9f-8b85-4e1b-9688-f191b3720471",
    name: "R407A Refrigerant 25lb (11.3kg) — For Commercial Refrigeration Systems, Easy to Use",
    slug: "r407a-refrigerant-25lb-11-3kg-for-commercial-refrigeration-systems-easy-to-use",
    description:
      "A zeotropic HFC blend (R32/R125/R134a) formulated for medium- and low-temperature commercial refrigeration, serving as a reliable retrofit alternative for R502 and R22. Compatible with POE lubricants for supermarket freezer cases, coolers, and cold storage. This 25 lb cylinder supports full system conversions or major repairs.",
    currency: "USD",
    images: [`${CDN}/1eec3513-e130-430e-b93a-171f1559d2c9.png`, `${CDN}/eb932dcc-7572-4da9-828b-1f84de05875c.png`, `${CDN}/2e06642e-598b-425f-be86-b883c42049e9.png`],
    variants: [
      { id: "44122251-c79f-47f1-ac9b-a1a3dafba570", name: "1 Cylinder", sku: "ZZXP-7QE0A00", price: 249, compareAtPrice: 319, currency: "USD", weightLb: 25, optionLabel: "1 Cylinder", available: true },
      { id: "6bb69c9f-135c-496f-bf9b-151f5c706aed", name: "10 Cylinders", sku: "ZZXP-FDZ0B00", price: 2090, compareAtPrice: 2790, currency: "USD", weightLb: 25, optionLabel: "10 Cylinders", available: true },
      { id: "64e79682-752a-4123-8838-d428813712ee", name: "20 Cylinders", sku: "ZZXP-SB40A00", price: 3980, compareAtPrice: 5380, currency: "USD", weightLb: 25, optionLabel: "20 Cylinders", available: true },
    ],
    minPrice: 249, minComparePrice: 319,
    refrigerantCode: "R407A", sizeLb: 25, sizeBucket: "bulk", gwp: "2107", blendNote: "R32/R125/R134a",
    applications: ["commercial-refrigeration", "r22-replacements"],
  },
  {
    id: "d7a6afa8-949d-4bce-8aa4-e726ffbdbb21",
    name: "R134A Refrigerant 30lb (13.6kg) — For Auto, Home AC & Refrigerator Repair, Easy to Use",
    slug: "r134a-refrigerant-30lb-13-6kg-for-auto-home-ac-refrigerator-repair-easy-to-use",
    description:
      "A widely adopted HFC refrigerant with zero ozone depletion potential, originally developed as the primary replacement for R12 in automotive AC and medium-temperature refrigeration. This 30 lb cylinder provides ample capacity for multiple auto AC recharges, display cases, beverage coolers, and light chillers.",
    currency: "USD",
    images: [`${CDN}/04fcc4cf-8be3-4407-b5a3-8478e529e7c1.png`, `${CDN}/40c4cfa9-a269-4dbc-9dfd-d34ac9e8d936.png`, `${CDN}/ce185c9a-2752-43fb-8d89-448f4d92255e.png`],
    variants: [
      { id: "d9b3b53b-014c-43e2-ad85-b102fc97f3a7", name: "1 Cylinder", sku: "Z1GM-PZV0B00", price: 319, compareAtPrice: 389, currency: "USD", weightLb: 30, optionLabel: "1 Cylinder", available: true },
      { id: "41aeccc9-212b-46d4-8b34-3d7f71b2e40e", name: "10 Cylinders", sku: "Z1GM-SGA0B00", price: 2790, compareAtPrice: 3490, currency: "USD", weightLb: 30, optionLabel: "10 Cylinders", available: true },
      { id: "cb9151fc-9163-4157-9ad4-6fe040a361cc", name: "20 Cylinders", sku: "Z1GM-S9G0A00", price: 5380, compareAtPrice: 6780, currency: "USD", weightLb: 30, optionLabel: "20 Cylinders", available: true },
    ],
    minPrice: 319, minComparePrice: 389,
    refrigerantCode: "R134A", sizeLb: 30, sizeBucket: "bulk", gwp: "1430",
    applications: ["auto-ac", "residential-ac", "commercial-refrigeration"],
  },
  {
    id: "f4a2e7fa-35d1-4946-af4a-aedb8b3342e0",
    name: "R438A (MO99) Refrigerant 25lb (11.3kg) — R22 Replacement, Easy to Use",
    slug: "r438a-mo99-refrigerant-25lb-11-3kg-for-older-home-ac-units-replacing-r22-easy-to-use",
    description:
      "A zero-ozone-depleting HFC blend (also known as MO99) formulated as a true drop-in replacement for R22 in existing AC and medium-temperature refrigeration. Compatible with mineral oil and alkylbenzene lubricants already in legacy equipment for fast, no-retrofit conversions. This 25 lb cylinder supports complete system conversions.",
    currency: "USD",
    images: [`${CDN}/e3053c8e-6ed9-45e0-bd03-995fca95f9ff.png`, `${CDN}/0321f422-1e9a-4625-8740-f395786a045d.png`, `${CDN}/60fac1c3-285d-448b-b1d7-c9a252193d84.png`],
    variants: [
      { id: "1dab91d3-5ac0-46a8-8258-3d2a565ac203", name: "25lb", sku: "Z96X-75H0000", price: 299, compareAtPrice: 399, currency: "USD", weightLb: 25, optionLabel: "25lb", available: true },
    ],
    minPrice: 299, minComparePrice: 399,
    refrigerantCode: "R438A", sizeLb: 25, sizeBucket: "bulk", gwp: "2265", blendNote: "MO99 / R22 drop-in",
    applications: ["r22-replacements", "residential-ac"],
  },
  {
    id: "b7254486-7c4b-4e8d-bf85-e2f2f8b03143",
    name: "R422D Refrigerant 25lb (11.3kg) — R22 Replacement for Commercial Systems, Easy to Use",
    slug: "r422d-refrigerant-25lb-11-3kg-for-commercial-refrigeration-systems-replacing-r22-easy-to-use",
    description:
      "A leading non-ozone-depleting retrofit solution designed as a direct drop-in replacement for R22 in existing AC and medium-temperature refrigeration. This 25 lb cylinder provides sufficient charge for complete conversions on residential heat pumps, rooftop units, and light commercial AC — minimizing downtime.",
    currency: "USD",
    images: [`${CDN}/5b7bf3b5-d91e-438e-9d45-4a6d88eccf7e.png`, `${CDN}/fed1eb81-bbe1-41dc-b937-78743a06e399.png`, `${CDN}/a2b88c20-4a5d-4ac4-92bf-5e037c1fe7fd.png`],
    variants: [
      { id: "112e26a2-6b60-44aa-80ba-85525f6d7e1e", name: "25lb", sku: "ZBAK-94W0000", price: 399, compareAtPrice: 499, currency: "USD", weightLb: 25, optionLabel: "25lb", available: true },
    ],
    minPrice: 399, minComparePrice: 499,
    refrigerantCode: "R422D", sizeLb: 25, sizeBucket: "bulk", gwp: "2729", blendNote: "R22 drop-in",
    applications: ["r22-replacements", "commercial-refrigeration"],
  },
  {
    id: "2506cddf-1424-4fbc-a1c6-5c8a93277c40",
    name: "R507 Refrigerant 25lb (11.3kg) — For Low-Temperature Commercial Refrigeration, Easy to Use",
    slug: "r507-refrigerant-25lb-11-3kg-for-low-temperature-commercial-refrigeration-systems-easy-to-use",
    description:
      "Factory-sealed R507 with 99.9%+ purity, the industry-standard replacement for R502 in low-temperature commercial refrigeration. Zero ozone depletion potential and consistent performance down to -40°F for supermarket display cases, walk-in freezers, and cold-chain logistics. This 25 lb cylinder covers full charges or major repairs.",
    currency: "USD",
    images: [`${CDN}/fc466b4f-88ed-4728-a96f-4745c44a0691.png`, `${CDN}/280b1403-ce29-4eb1-8aec-d6242f4b4a66.png`, `${CDN}/5014cff7-b72a-40f1-877e-02385a148bb9.png`],
    variants: [
      { id: "eba3fde1-7934-4de9-ab21-bf62c1021656", name: "25lb", sku: "Z19E-RS60000", price: 389, compareAtPrice: 495, currency: "USD", weightLb: 25, optionLabel: "25lb", available: true },
    ],
    minPrice: 389, minComparePrice: 495,
    refrigerantCode: "R507", sizeLb: 25, sizeBucket: "bulk", gwp: "3985", blendNote: "R125/R143a",
    applications: ["commercial-refrigeration"],
  },
];
