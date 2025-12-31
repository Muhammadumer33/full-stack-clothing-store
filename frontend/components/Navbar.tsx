'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ShoppingBag, Search } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'

interface Product {
    id: number
    name: string
    image: string
    category: string
    price: number
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [allProducts, setAllProducts] = useState<Product[]>([])
    const [recommendations, setRecommendations] = useState<Product[]>([])
    const [showDropdown, setShowDropdown] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Fetch all products for autocomplete
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products')
                setAllProducts(response.data)
            } catch (error) {
                console.error('Error fetching products for search:', error)
            }
        }
        fetchProducts()
    }, [])

    // Sync input with URL search param
    useEffect(() => {
        const query = searchParams.get('search')
        if (query) {
            setSearchQuery(query)
        } else if (pathname === '/products' && !query) {
            setSearchQuery('')
        }
    }, [searchParams, pathname])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)

        // Filter recommendations
        if (query.trim()) {
            const filtered = allProducts.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5) // Limit to top 5
            setRecommendations(filtered)
            setShowDropdown(true)
        } else {
            setRecommendations([])
            setShowDropdown(false)
        }

        // Live Search: Update URL if on products page
        if (pathname === '/products') {
            if (query.trim()) {
                router.replace(`/products?search=${encodeURIComponent(query)}`)
            } else {
                router.replace('/products')
            }
        }
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
            setShowDropdown(false)
        }
    }

    const handleRecommendationClick = (productName: string) => {
        setSearchQuery(productName)
        setShowDropdown(false)
        router.push(`/products?search=${encodeURIComponent(productName)}`)
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24 gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 flex-shrink-0 py-1">
                        <Image
                            src="/logo.png"
                            alt="Raja's Collection Logo"
                            width={220}
                            height={70}
                            className="h-20 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Search Bar Container */}
                    <div className="hidden md:flex flex-1 max-w-lg relative" ref={dropdownRef}>
                        <form onSubmit={handleSearchSubmit} className="w-full relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </form>

                        {/* Autocomplete Dropdown */}
                        {showDropdown && recommendations.length > 0 && (
                            <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                <ul className="py-2">
                                    {recommendations.map((product) => (
                                        <li key={product.id}>
                                            <button
                                                onClick={() => handleRecommendationClick(product.name)}
                                                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition text-left"
                                            >
                                                <div className="relative w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={product.image || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60'}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                                                    <p className="text-xs text-purple-600">{product.category}</p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center flex-shrink-0">
                        <Link href="/" className="text-gray-700 hover:text-purple-600 transition">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-purple-600 transition">
                            Products
                        </Link>
                        <Link href="/wishlist" className="text-gray-700 hover:text-purple-600 transition flex items-center gap-1">
                            Wishlist
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-purple-600 transition">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition">
                            Contact
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link
                            href="/"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            href="/about"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-4 py-2 text-gray-700 hover:bg-purple-50 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}