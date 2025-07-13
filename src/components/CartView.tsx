import { useContext } from 'react';
import { CartContext } from '../context/CartContextDef';
import type { CartProduct } from '../types';

interface CartViewProps {
  onClose: () => void;
}

const CartView = ({ onClose }: CartViewProps) => {
  const { state, dispatch } = useContext(CartContext);

  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };
  
  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = state.cart.reduce((sum: number, product: CartProduct) => sum + product.price * (product.quantity ?? 1), 0);

  return (
    <div className="absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-xl p-4 border w-72 z-10">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h2 className="section-title">Tu Carrito</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {state.cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          state.cart.map((product: CartProduct, index: number) => (
            <div key={`${product.id}-${index}`} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-contain rounded mr-4"/>
                <div>
                  <h3 className="font-semibold text-sm">{product.title}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              </div>
              <button onClick={() => handleRemove(product.id)} className="text-red-500 hover:text-red-700 font-semibold">
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
      
      {state.cart.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center font-bold text-xl mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
              onClick={handleClearCart}
              className="btn-danger"
          >
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView; 