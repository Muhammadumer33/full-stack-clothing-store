'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { Filter } from 'lucide-react'
import axios from 'axios'

interface Product {
    id: number
    name: string
    description: string
    price: number
    category: string
    image: string
    sizes: string[]
    colors: string[]
    inStock: boolean
}

export default function ProductsPage() {
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search') // Get search query

    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]) // Store filtered products
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all')

    useEffect(() => {
        fetchProducts(selectedCategory)
    }, [selectedCategory])

    // Filter products when searchParam or products change
    useEffect(() => {
        if (searchParam) {
            const lowerQuery = searchParam.toLowerCase()
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery)
            )
            setFilteredProducts(filtered)
        } else {
            setFilteredProducts(products)
        }
    }, [searchParam, products])

    const fetchProducts = async (category: string) => {
        setLoading(true)
        try {
            const url = category === 'all'
                ? 'http://localhost:8000/api/products'
                : `http://localhost:8000/api/products?category=${category}`
            const response = await axios.get(url)
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="h-5 w-5 text-purple-600" />
                                <h2 className="text-lg font-semibold">Filters</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-3">Category</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center cursor-pointer hover:text-purple-600 transition-colors">
                                            <input
                                                type="radio"
                                                name="category"
                                                value="all"
                                                checked={selectedCategory === 'all'}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="mr-2 text-purple-600 focus:ring-purple-500"
                                            />
                                            All Products
                                        </label>
                                        <label className="flex items-center cursor-pointer hover:text-purple-600 transition-colors">
                                            <input
                                                type="radio"
                                                name="category"
                                                value="men"
                                                checked={selectedCategory === 'men'}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="mr-2 text-purple-600 focus:ring-purple-500"
                                            />
                                            Men's Collection
                                        </label>
                                        <label className="flex items-center cursor-pointer hover:text-purple-600 transition-colors">
                                            <input
                                                type="radio"
                                                name="category"
                                                value="women"
                                                checked={selectedCategory === 'women'}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="mr-2 text-purple-600 focus:ring-purple-500"
                                            />
                                            Women's Collection
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1">
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                                <p className="mt-4 text-gray-600">Loading products...</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 text-gray-600 font-medium">
                                    Showing {filteredProducts.length} products
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}