// Core Product Types
export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

// User Types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Category Types
export interface Category {
  title: string;
  items: Product[];
}

// State Types
export interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  cartItemsCount: number;
  cartTotal: number;
}

export interface UserState {
  currentUser: User | null;
}

export interface ProductsState {
  products: Record<string, Product[]>;
  loading: boolean;
  error: string | null;
}

// Action Types
export type CartAction =
  | { type: 'SET_CART_ITEMS'; payload: { cartItems: CartItem[] } }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_CART_OPEN'; payload: boolean };

export type UserAction = { type: 'SET_CURRENT_USER'; payload: User | null };
