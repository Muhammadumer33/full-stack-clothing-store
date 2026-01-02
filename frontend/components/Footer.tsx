import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/footer.png"
                                alt="Raja's Collection Logo"
                                width={200}
                                height={70}
                                className="h-16 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 mb-4">
                            Your trusted destination for premium ethnic wear and traditional clothing.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/raj.umar.184007/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://www.instagram.com/raja___umarr/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/muhammad-umer-9000942a2/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                                <Linkedin className="h-5 w-5" />
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
                        © 2026 Raja's Collection. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}