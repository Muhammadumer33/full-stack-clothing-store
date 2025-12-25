import { Award, Heart, Users, Star } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-5xl font-bold mb-4">About Raja's Collection</h1>
                    <p className="text-xl max-w-3xl">
                        Bringing you the finest ethnic wear with a perfect blend of tradition and modernity
                    </p>
                </div>
            </div>

            {/* Story Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <div className="prose max-w-none text-gray-700 space-y-4">
                        <p className="text-lg leading-relaxed">
                            Founded by <strong>Raja Umar</strong> in 2010, Raja's Collection began with a simple vision: to make premium ethnic wear
                            accessible to everyone who appreciates quality and craftsmanship. What started as a small
                            boutique in Rawalpindi has grown into one of Pakistan's most trusted names in traditional clothing.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Our journey has been driven by our passion for preserving traditional craftsmanship while
                            embracing contemporary designs. Every piece in our collection tells a story of skilled
                            artisans, quality materials, and attention to detail that sets us apart.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Today, we serve thousands of satisfied customers across Pakistan, offering everything from
                            everyday ethnic wear to exquisite pieces for special occasions. Our commitment to quality,
                            authenticity, and customer satisfaction remains unwavering.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                <Award className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                            <p className="text-gray-600">
                                We never compromise on the quality of our fabrics and craftsmanship
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                <Heart className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Customer Love</h3>
                            <p className="text-gray-600">
                                Your satisfaction is our top priority, always
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                <Users className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Artisan Support</h3>
                            <p className="text-gray-600">
                                We work directly with skilled artisans to support their craft
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                <Star className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                            <p className="text-gray-600">
                                Striving for excellence in every aspect of our business
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-xl p-8 md:p-12 text-white">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">15+</div>
                            <div className="text-purple-200">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">50K+</div>
                            <div className="text-purple-200">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-purple-200">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">100+</div>
                            <div className="text-purple-200">Artisan Partners</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-xl text-gray-700 leading-relaxed">
                        To preserve and promote traditional ethnic wear while making it accessible and relevant
                        for the modern generation. We believe in sustainable fashion that respects our heritage,
                        supports local artisans, and delivers exceptional value to our customers.
                    </p>
                </div>
            </section>
        </div>
    )
}