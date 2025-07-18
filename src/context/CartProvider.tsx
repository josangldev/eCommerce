import { useReducer, useEffect } from 'react';
import { CartContext, initialState } from './CartContextDef';
import type { CartState, CartAction } from './CartContextDef';

// Reducer que maneja las acciones principales del carrito: añadir, eliminar, incrementar, decrementar, cargar y limpiar
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find(p => p.id === action.payload.id);
      let newCart;
      if (existing) {
        newCart = state.cart.map(p =>
          p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter((product) => product.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case 'INCREMENT_QUANTITY': {
      const newCart = state.cart.map(p =>
        p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case 'DECREMENT_QUANTITY': {
      const newCart = state.cart
        .map(p =>
          p.id === action.payload.id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter(p => p.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case 'LOAD_CART': {
      return { ...state, cart: action.payload };
    }
    case 'CLEAR_CART': {
      localStorage.removeItem('cart');
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

// CartProvider expone el estado y las acciones del carrito a toda la app
interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Al montar, carga el carrito guardado en localStorage si existe
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}; 