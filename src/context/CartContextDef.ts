import { createContext } from 'react';
import type { Product, CartProduct } from '../types';

export interface CartState {
  cart: CartProduct[];
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
  | { type: 'INCREMENT_QUANTITY'; payload: { id: number } }
  | { type: 'DECREMENT_QUANTITY'; payload: { id: number } }
  | { type: 'LOAD_CART'; payload: CartProduct[] }
  | { type: 'CLEAR_CART' };

export const initialState: CartState = {
  cart: [],
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
}); 