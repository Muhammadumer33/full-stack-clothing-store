'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import axios from 'axios'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            await axios.post('http://localhost:8000/api/contact', formData)
            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 5000)
        } catch (error) {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 5000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl">
                        We'd love to hear from you. Get in touch with us!
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Have questions about our products or need assistance? Our team is here to help you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                                        <MapPin className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Visit Our Store
                                    </h3>
                                    <p className="text-gray-600">
                                        Giga Mall, DHA Phase 2, GT Road<br />
                                        Islamabad, Pakistan
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                                        <Phone className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Call Us
                                    </h3>
                                    <p className="text-gray-600">
                                        0340 8852252
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Mon-Sat: 10:00 AM - 8:00 PM
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                                        <Mail className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Email Us
                                    </h3>
                                    <p className="text-gray-600">
                                        info@rajascollection.com<br />
                                        support@rajascollection.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map Integration */}
                        <div className="mt-8 bg-gray-200 rounded-lg h-64 overflow-hidden">
                            <iframe
                                title="Giga Mall Location"
                                width="100%"
                                height="100%"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=Giga%20Mall%20DHA%20Phase%202,%20Islamabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Send Us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                {status === 'success' && (
                                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                                        Thank you for your message! We'll get back to you soon.
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}