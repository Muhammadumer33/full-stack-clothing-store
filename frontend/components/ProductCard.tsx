import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'
import OrderModal from './OrderModal'

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

export default function ProductCard({ product }: { product: Product }) {
    const [isLiked, setIsLiked] = useState(false)
    const [showOrderModal, setShowOrderModal] = useState(false)

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
        setIsLiked(wishlist.includes(product.id))
    }, [product.id])

    const toggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
        let newWishlist

        if (isLiked) {
            newWishlist = wishlist.filter((id: number) => id !== product.id)
        } else {
            newWishlist = [...wishlist, product.id]
        }

        localStorage.setItem('wishlist', JSON.stringify(newWishlist))
        setIsLiked(!isLiked)
    }

    return (
        <>
            <div className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {!product.inStock && (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                                OUT OF STOCK
                            </span>
                        )}
                        {product.inStock && (
                            <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-medium tracking-wide shadow-sm">
                                NEW
                            </span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <button
                        onClick={toggleWishlist}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all shadow-sm translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300 ${isLiked ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white'
                            }`}
                    >
                        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-2">
                        <span className="text-xs font-bold tracking-wider text-purple-600 uppercase bg-purple-50 px-2 py-1 rounded">
                            {product.category}
                        </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
                        {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div>
                            <span className="text-xs text-gray-400 font-medium block">Price</span>
                            <span className="text-xl font-bold text-gray-900">
                                Rs. {product.price.toLocaleString()}
                            </span>
                        </div>

                        <button
                            onClick={() => setShowOrderModal(true)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all transform active:scale-95 ${product.inStock
                                ? 'bg-gray-900 text-white hover:bg-purple-600 shadow-lg hover:shadow-purple-500/30'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!product.inStock}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {product.inStock ? 'Buy Now' : 'Sold Out'}
                        </button>
                    </div>
                </div>
            </div>

            {showOrderModal && (
                <OrderModal
                    product={product}
                    onClose={() => setShowOrderModal(false)}
                />
            )}
        </>
    )
}