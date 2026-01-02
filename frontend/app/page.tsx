'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { productService, Product } from '@/services/productService'

export default function Home() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts()
                setProducts(data.slice(0, 6)) // Show only 6 products on home
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }


        fetchProducts()
    }, [])

    return (
        <div className="bg-gray-50/50">
            <Hero />

            {/* Featured Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">Curated For You</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2 mb-6">
                        Featured Collection
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                        Explore our handpicked selection of premium ethnic wear, designed to make you stand out.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-500 font-medium">Loading collection...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="text-center mt-16">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold border border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all shadow-sm hover:shadow-md text-lg"
                            >
                                View All Products
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </>
                )}
            </section>

            {/* Categories Section */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                            Shop by Category
                        </h2>
                        <p className="text-xl text-gray-500 font-light">
                            Find the perfect outfit for every occasion
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Link
                            href="/products?category=men"
                            className="group relative h-96 rounded-2xl overflow-hidden block"
                        >
                            <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/30 transition-colors z-10 w-full h-full"></div>
                            {/* CSS Gradient fallbacks since we don't have distinct category images yet, but styling is premium */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 group-hover:scale-105 transition-transform duration-700"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8">
                                <h3 className="text-4xl font-serif font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Men's Collection</h3>
                                <p className="text-white/90 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Kurtas, Sherwanis & More</p>
                                <span className="mt-6 px-6 py-2 bg-white text-gray-900 rounded-full font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                                    Explore Now
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/products?category=women"
                            className="group relative h-96 rounded-2xl overflow-hidden block"
                        >
                            <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/30 transition-colors z-10 w-full h-full"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-700 via-rose-700 to-red-900 group-hover:scale-105 transition-transform duration-700"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8">
                                <h3 className="text-4xl font-serif font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Women's Collection</h3>
                                <p className="text-white/90 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Sarees, Lehengas & More</p>
                                <span className="mt-6 px-6 py-2 bg-white text-gray-900 rounded-full font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                                    Explore Now
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}