export interface CartLine {
  variantId: string;
  quantity: number;
  productSlug: string;
  name: string;
  optionLabel?: string | null;
  refrigerantCode: string;
  price: number;
  currency: string;
  image: string;
}

export interface CheckoutItem {
  variantId: string;
  quantity: number;
}

export interface CheckoutSummaryItem {
  sku: string;
  productSlug: string;
  productName: string;
  refrigerantCode: string;
  variantLabel: string;
  image: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  currency: string;
}

export interface CheckoutOrderSummary {
  items: CheckoutSummaryItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
}

export const CHECKOUT_STORAGE_KEY = "ar_checkout_items_v1";
