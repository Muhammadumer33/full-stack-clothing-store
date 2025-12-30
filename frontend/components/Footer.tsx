import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Raja's Collection</h3>
                        <p className="text-gray-400 mb-4">
                            Your trusted destination for premium ethnic wear and traditional clothing.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-400 hover:text-white transition">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/wishlist" className="text-gray-400 hover:text-white transition">
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/products?category=men" className="text-gray-400 hover:text-white transition">
                                    Men's Collection
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=women" className="text-gray-400 hover:text-white transition">
                                    Women's Collection
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Best Sellers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-purple-400 mt-1" />
                                <span className="text-gray-400">
                                    Giga Mall, DHA Phase 2, GT Road, Islamabad, Pakistan
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-purple-400" />
                                <span className="text-gray-400">0340 8852252</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-purple-400" />
                                <span className="text-gray-400">info@rajascollection.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2025 Raja's Collection. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}