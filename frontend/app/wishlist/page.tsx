'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { Heart } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

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

export default function Wishlist() {
    const [products, setProducts] = useState<Product[]>([])
    const [wishlistIds, setWishlistIds] = useState<number[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Load wishlist IDs from localStorage
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
        setWishlistIds(storedWishlist)

        // Fetch all products
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products')
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Filter products to show only those in the wishlist
    const wishlistProducts = products.filter(product => wishlistIds.includes(product.id))

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-500 font-medium">Loading wishlist...</p>
                    </div>
                ) : wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {wishlistProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-purple-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Start exploring our collection and save your favorite items here.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors shadow-lg hover:shadow-purple-500/30"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
