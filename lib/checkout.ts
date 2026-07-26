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

export const CHECKOUT_STORAGE_KEY = "ar_checkout_items_v1";
