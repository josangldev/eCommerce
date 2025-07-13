import { useState, useEffect } from 'react';
import Header from './components/Header'
import ProductList from './components/ProductList'
import Sidebar from './components/Sidebar'
import './App.css'
import { CartProvider } from './context/CartProvider'
import type { Product } from './types'
import Footer from './components/Footer'

function App() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

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
    <CartProvider>
      <div className='App'>
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="main-content">
          <Sidebar 
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            priceFilter={priceFilter}
            onPriceChange={setPriceFilter}
          />
          <ProductList 
            loading={loading}
            error={error}
            products={filteredProducts}
          />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
