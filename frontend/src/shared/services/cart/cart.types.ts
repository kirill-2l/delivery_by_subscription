import { Product } from '@/shared/services/products';

export interface CartItem {
  product: Product;
  id: number;
  quantity: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalAmount: number;
}
