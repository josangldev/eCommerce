import { useState, useEffect } from 'react';
import Header from './components/Header'
import ProductList from './components/ProductList'
import Sidebar from './components/Sidebar'
import './App.css'
import { CartProvider } from './context/CartProvider'
import type { Product } from './types'
import Footer from './components/Footer'

// Componente principal de la aplicación
// Gestiona el estado global de productos, filtros y errores
function App() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Hook para obtener los productos desde la API al cargar la app
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const categories = ["men's clothing", "women's clothing"]
        const requests = categories.map(category =>
          fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
            .then(res => {
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
              return res.json()
            })
        )
        const results = await Promise.all(requests)
        const products = results.flat()
        setAllProducts(products)
      } catch (err) {
        setError("Failed to fetch products")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Hook para filtrar productos según búsqueda, categoría y precio
  useEffect(() => {
    let products = [...allProducts]

    if (searchQuery) {
      products = products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (categoryFilter !== 'all') {
      products = products.filter(p => p.category === categoryFilter)
    }
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number)
      products = products.filter(p => p.price >= min && p.price <= max)
    }

    setFilteredProducts(products)
  }, [searchQuery, categoryFilter, priceFilter, allProducts])

  return (
    // CartProvider provee el contexto global del carrito a toda la app
    <CartProvider>
      {/* Estructura principal: Header, Sidebar, ProductList y Footer */}
      <div className='App'>
        {/* Header gestiona la búsqueda y acceso al carrito */}
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="main-content">
          {/* Sidebar permite filtrar por categoría y precio */}
          <Sidebar 
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            priceFilter={priceFilter}
            onPriceChange={setPriceFilter}
          />
          {/* ProductList muestra los productos filtrados */}
          <ProductList 
            loading={loading}
            error={error}
            products={filteredProducts}
          />
        </main>
        {/* Footer con enlaces sociales */}
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
