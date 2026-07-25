// Policy copy rewritten in Air Refrigerant's voice. Business specifics are
// marked "TODO: confirm" and must be reviewed by the owner/legal before launch.

import { PROMO } from "./promo";

export interface PolicySection { heading: string; body: string[] }
export interface Policy { slug: string; title: string; summary: string; sections: PolicySection[] }

export const POLICIES: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How Air Refrigerant collects, uses, and protects your information.",
    sections: [
      { heading: "Information we collect", body: [
        "When you place an order, request a quote, or contact us, we collect the details you provide — such as your name, company, email, phone number, and shipping address. Payment information is handled by Stripe; we do not store full card numbers on our servers.",
        "We also collect basic technical data (such as device, browser, and pages visited) to keep the site secure and improve your experience.",
      ]},
      { heading: "How we use your information", body: [
        "We use your information to process orders and quotes, arrange FedEx/UPS delivery, provide customer support, send order updates, and — only with your consent — share product news and offers.",
        "We may use information to meet legal, tax, and refrigerant-sale compliance obligations.",
      ]},
      { heading: "Sharing", body: [
        "We share information with service providers who help us operate — including our checkout/payments provider, shipping carriers, and email tools — strictly to deliver your order and support. We do not sell your personal information. // TODO: confirm full list of processors with legal.",
      ]},
      { heading: "Your choices", body: [
        "You can unsubscribe from marketing at any time and request access to or deletion of your data by emailing us. // TODO: confirm data-rights process and applicable jurisdictions (e.g., CCPA).",
      ]},
      { heading: "Contact", body: [
        "Questions about privacy? Email support@airrefrigerant.shop. // TODO: confirm dedicated privacy contact.",
      ]},
    ],
  },
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    summary: "Free shipping, processing times, and delivery details.",
    sections: [
      { heading: "Limited-time offer", body: [
        `This offer is valid until ${PROMO.validUntil}. All orders will be shipped on ${PROMO.shipDate}.`,
        "Free FedEx/UPS shipping applies to every order placed during this offer, with no hazmat surcharges.",
      ]},
      { heading: "Free shipping on all orders", body: [
        "We offer free FedEx/UPS shipping on every order within the contiguous United States, with no hazmat surcharges. // TODO: confirm coverage for AK/HI and any exclusions.",
      ]},
      { heading: "Processing & dispatch", body: [
        "Orders are dispatched from our EPA-certified U.S. warehouses, typically within 1–2 business days of payment. // TODO: confirm exact processing window and cut-off times.",
        "Refrigerant cylinders ship in DOT-approved packaging in compliance with carrier and hazardous-materials regulations.",
      ]},
      { heading: "Delivery & tracking", body: [
        "Transit times generally range from 2–7 business days depending on destination. A live tracking link is emailed once your order ships. // TODO: confirm carrier SLAs.",
      ]},
      { heading: "Damaged or lost shipments", body: [
        "Inspect your shipment on arrival. If a cylinder arrives damaged or an order is lost in transit, contact us within 48 hours so we can file a carrier claim and make it right. // TODO: confirm claim window and process.",
      ]},
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    summary: "Returns, refunds, and exchanges for refrigerant products.",
    sections: [
      { heading: "Our commitment", body: [
        "We stand behind every cylinder we ship. If something isn't right, we'll work with you to resolve it quickly.",
      ]},
      { heading: "Returns", body: [
        "Because refrigerants are regulated hazardous materials, returns are limited for safety and compliance reasons. Unopened, factory-sealed cylinders may be eligible for return within 30 days of delivery, subject to inspection. // TODO: confirm return eligibility, restocking fees, and who pays return shipping.",
      ]},
      { heading: "Refunds", body: [
        "Approved refunds are issued to your original payment method after the returned product is received and inspected. Please allow 5–10 business days for the credit to appear. // TODO: confirm refund timeline.",
      ]},
      { heading: "Defective or incorrect items", body: [
        "If you receive a defective or incorrect product, contact us within 48 hours with photos and your order number and we'll arrange a replacement or refund at no cost to you.",
      ]},
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    summary: "The terms that govern your use of this site and purchases.",
    sections: [
      { heading: "Agreement", body: [
        "By using this website and placing orders, you agree to these terms. If you do not agree, please do not use the site.",
      ]},
      { heading: "Eligibility & refrigerant regulations", body: [
        "Many refrigerants are regulated under EPA Section 608 and may only be sold to EPA-certified technicians or for resale. By purchasing, you represent that you are EPA-certified or are buying for resale, and that you will handle, use, and dispose of refrigerants in compliance with all applicable federal, state, and local laws. // TODO: confirm certification-verification requirements with legal.",
      ]},
      { heading: "Orders & pricing", body: [
        "All prices are shown in USD and are subject to change. We reserve the right to refuse or cancel any order, including for suspected fraud or regulatory non-compliance. Product availability is not guaranteed until your order is confirmed.",
      ]},
      { heading: "Checkout & payment", body: [
        "Checkout and payment are processed securely by Stripe. Your purchase is also subject to Stripe's applicable terms.",
      ]},
      { heading: "Limitation of liability", body: [
        "To the maximum extent permitted by law, Air Refrigerant is not liable for indirect or consequential damages arising from product use or site use. Products are intended for use by qualified professionals. // TODO: confirm warranty and liability language with legal.",
      ]},
    ],
  },
];

export function getPolicy(slug: string) {
  return POLICIES.find((p) => p.slug === slug);
}
