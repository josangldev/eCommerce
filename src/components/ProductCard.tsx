import { useContext } from 'react'
import { CartContext } from '../context/CartContextDef'
import type { Product } from '../types'

interface Props {
  product: Product
}

// Componente ProductCard: muestra la información de un producto y permite añadirlo al carrito
const ProductCard = ({ product }: Props) => {
  const { dispatch } = useContext(CartContext)

  // Envía la acción para añadir el producto al carrito global
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  return (
    <div className="card-product">
      <div className="w-40 h-40 flex items-center justify-center mb-4 bg-white rounded">
        <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
      </div>
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{product.title}</h2>
      </div>
      <p className="text-xl font-bold text-gray-800 mt-2">${product.price}</p>
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handleAddToCart}
          aria-label="Agregar a la cesta"
          className="btn-primary w-auto px-4 h-12 rounded-full flex items-center justify-center gap-2 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard 