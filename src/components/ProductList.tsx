import type { Product } from "../types"
import ProductCard from "./ProductCard"

interface ProductListProps {
    loading: boolean;
    error: string | null;
    products: Product[];
}

const ProductList = ({
    loading,
    error,
    products,
}: ProductListProps) => {

    if (loading) return <p className="text-center py-10">Loading products...</p>
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>

    return (
        <div className="product-grid">
            {products.length > 0 ? (
                products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H3z" />
                    </svg>
                    <p className="text-lg font-semibold">¡Ups! No encontramos productos con esos filtros.</p>
                    <p className="text-sm">Prueba a quitar algún filtro o busca otra cosa. ¡Seguro que encuentras algo que te guste!</p>
                </div>
            )}
        </div>
    )
}

export default ProductList