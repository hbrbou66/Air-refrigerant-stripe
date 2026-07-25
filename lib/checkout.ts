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
