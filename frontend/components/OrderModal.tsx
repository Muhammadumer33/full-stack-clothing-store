import React, { useState } from 'react';
import { X, CreditCard, Banknote, CheckCircle, ArrowRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface OrderModalProps {
    product: Product;
    onClose: () => void;
}

export default function OrderModal({ product, onClose }: OrderModalProps) {
    const [quantity, setQuantity] = useState(1);
    const [formData, setFormData] = useState({
        customer_name: '',
        phone: '',
        email: '',
        cnic: '',
        address: '',
        payment_method: 'COD'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [orderSuccess, setOrderSuccess] = useState<{ id: number } | null>(null);

    const total = product.price * quantity;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    product_id: product.id,
                    product_name: product.name,
                    quantity,
                    total_price: total
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            const data = await response.json();
            setOrderSuccess(data);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl scale-100 transition-all">
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Thank You!</h2>
                        <p className="text-gray-500 mb-6">Your order has been placed successfully.</p>

                        <div className="bg-gray-50 rounded-2xl p-6 w-full mb-8 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-500 text-sm">Order ID</span>
                                <span className="font-mono font-bold text-gray-900">#{orderSuccess.id}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-500 text-sm">Amount</span>
                                <span className="font-bold text-gray-900">PKR {total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Estimated Delivery</span>
                                <span className="font-medium text-gray-900">3-5 Business Days</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50/50 backdrop-blur-xl sticky top-0 z-10">
                    <h2 className="text-xl font-bold font-serif text-gray-800">Complete Your Order</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-6">
                    {/* Product Summary */}
                    <div className="flex gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg bg-white" />
                        <div>
                            <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                            <p className="text-purple-600 font-bold mt-1">PKR {product.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-sm text-gray-600">Qty:</span>
                                <div className="flex items-center bg-white border rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                    >-</button>
                                    <span className="px-2 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form id="order-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    value={formData.customer_name}
                                    onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CNIC / ID Number</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                value={formData.cnic}
                                onChange={e => setFormData({ ...formData, cnic: e.target.value })}
                                placeholder="xxxxx-xxxxxxx-x"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.payment_method === 'COD' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setFormData({ ...formData, payment_method: 'COD' })}
                                >
                                    <Banknote className={`w-6 h-6 ${formData.payment_method === 'COD' ? 'text-purple-600' : 'text-gray-400'}`} />
                                    <span className={`text-sm font-medium ${formData.payment_method === 'COD' ? 'text-purple-600' : 'text-gray-500'}`}>Cash on Delivery</span>
                                </div>
                                <div
                                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.payment_method === 'Online' ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setFormData({ ...formData, payment_method: 'Online' })}
                                >
                                    <CreditCard className={`w-6 h-6 ${formData.payment_method === 'Online' ? 'text-purple-600' : 'text-gray-400'}`} />
                                    <span className={`text-sm font-medium ${formData.payment_method === 'Online' ? 'text-purple-600' : 'text-gray-500'}`}>Online Payment</span>
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    </form>
                </div>

                <div className="p-4 border-t bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="text-2xl font-bold text-gray-900">PKR {total.toLocaleString()}</span>
                    </div>
                    <button
                        form="order-form"
                        disabled={isSubmitting}
                        className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                        {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
}
