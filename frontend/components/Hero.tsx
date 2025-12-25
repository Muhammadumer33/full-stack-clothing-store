import Link from 'next/link'
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react'

export default function Hero() {
    return (
        <div className="relative bg-gradient-to-b from-purple-50 to-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -left-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 z-10 max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold tracking-wide mb-6">
                        New Collection 2024
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight">
                        Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Elegance</span> <br />
                        in Ethnic Wear
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Discover the finest handcrafted kurtas, lehengas, and sarees.
                        Where tradition meets contemporary fashion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/products"
                            className="group bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/30 flex items-center gap-2 text-lg"
                        >
                            Shop Collection
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/about"
                            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold border-2 border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all text-lg"
                        >
                            View Lookbook
                        </Link>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
                    {[
                        { icon: Star, title: "Premium Quality", desc: "Handpicked fabrics & finest craftsmanship" },
                        { icon: ShieldCheck, title: "Authentic Designs", desc: "Exclusive patterns blending tradition & modernity" },
                        { icon: Truck, title: "Express Delivery", desc: "Fast & insured shipping across India" }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}