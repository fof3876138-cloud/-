export type ProductCategory = 'all' | 'scarf' | 'apron' | 'eco-handkerchief' | 'handkerchief' | 'blanket' | 'gift';

export interface Product {
  id: string;
  name: string;
  englishName: string;
  category: 'scarf' | 'apron' | 'eco-handkerchief' | 'handkerchief' | 'blanket' | 'gift';
  price: number;
  originalPrice?: number;
  tag?: string;
  image: string;
  secondaryImage?: string;
  shortDesc: string;
  fullDesc: string;
  materials: string;
  dimensions: string[];
  colors: { name: string; hex: string }[];
  dyeingMethod: string;
  careInstructions: string[];
  stockCount: number;
  leadTime: string;
  supportsCustomEmbroidery: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedDimension: string;
  selectedColor: { name: string; hex: string };
  customEmbroideryText?: string;
  withBojagiWrap: boolean;
  quantity: number;
}

export interface OrderData {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  detailAddress: string;
  giftMessage?: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  packagingFee: number;
  total: number;
  createdAt: string;
}
