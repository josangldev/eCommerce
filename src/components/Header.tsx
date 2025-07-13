import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContextDef';
import CartView from './CartView';
import AuthView from './AuthView';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const { state } = useContext(CartContext);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isAuthVisible, setIsAuthVisible] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);

  useEffect(() => {
    if (state.cart.length > 0) {
      setCartAnim(true);
      const timeout = setTimeout(() => setCartAnim(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [state.cart.length]);

  const handleCartClick = () => {
    setIsCartVisible(prev => !prev);
    setIsAuthVisible(false); 
  };

  const handleAuthClick = () => {
    setIsAuthVisible(prev => !prev);
    setIsCartVisible(false);
  };

  return (
    <header className="bg-gray-800 text-white p-4 grid grid-cols-3 items-center gap-4">
      <div className="relative w-full max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
              type="text"
              placeholder="Buscar..."
              className="input-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
          />
      </div>

      <h1 className="text-3xl font-bold text-center">E-Shop</h1>
      
      <div className="flex items-center space-x-2 justify-self-end">
        <div className="relative">
          <button onClick={handleCartClick} className="btn-icon group relative">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400 ${cartAnim ? 'animate-bounce' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {state.cart.length > 0 && (
              <span className="badge-count">
                {state.cart.length}
              </span>
            )}
          </button>
          {isCartVisible && <CartView onClose={() => setIsCartVisible(false)} />}
        </div>
        
        <div className="relative">
          <button onClick={handleAuthClick} className="btn-icon group relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          {isAuthVisible && <AuthView onClose={() => setIsAuthVisible(false)} />}
        </div>
      </div>
    </header>
  )
}

export default Header;