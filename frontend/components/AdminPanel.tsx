import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Save, X, LogOut, Package, ShoppingBag, CheckCircle, Calendar, TrendingUp, BarChart3, Clock } from 'lucide-react';
import { adminService, AdminStats } from '@/services/adminService';
import { orderService, OrderData } from '@/services/orderService';
import { Product } from '@/services/productService';

interface Order {
    id: number;
    customer_name: string;
    phone: string;
    address: string;
    product_name: string;
    quantity: number;
    total_price: number;
    payment_method: string;
    status: string;
}

export default function AdminPanel() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

    // Products State
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Orders State
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState({
        completed_today: 0,
        completed_this_week: 0,
        completed_this_month: 0,
        sales_today: 0,
        sales_this_week: 0,
        sales_this_month: 0,
        total_orders: 0,
        pending_orders: 0
    });

    const [error, setError] = useState('');

    // Admin credentials (in production, use proper authentication)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'rj123';

    useEffect(() => {
        if (isLoggedIn) {
            fetchProducts();
            fetchOrders();
            fetchStats();
        }
    }, [isLoggedIn, activeTab]);

    const fetchStats = async () => {
        try {
            const data = await adminService.getStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            // Re-using common logic or admin specific product fetch if needed
            // For now, using direct fetch but via adminService if we had specialized admin-read
            // Actually, adminService.addProduct and others exist, so let's use a generic fetch through api if needed
            // But let's keep it simple and use what we have
            const response = await fetch('http://localhost:8000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError('Failed to fetch products');
        }
    };

    const fetchOrders = async () => {
        try {
            const data = await orderService.getOrders();
            setOrders(data);
        } catch (error) {
            setError('Failed to fetch orders');
        }
    };

    const handleLogin = (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    const handleDelete = async (id: number) => {
        // Deprecated: using promptDeleteProduct instead
        promptDeleteProduct(id);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct({ ...product });
        setShowAddForm(false);
    };

    const handleSave = async () => {
        if (!editingProduct) return;

        try {
            const price = parseFloat(editingProduct.price.toString());
            if (isNaN(price)) {
                throw new Error("Price must be a valid number");
            }

            const payload = {
                name: editingProduct.name,
                description: editingProduct.description || "",
                price: price,
                category: editingProduct.category,
                image: editingProduct.image,
                sizes: editingProduct.sizes,
                colors: editingProduct.colors,
                inStock: editingProduct.inStock,
            };

            if (showAddForm) {
                const data = await adminService.addProduct(payload);
                console.log("Add success:", data);
            } else {
                const data = await adminService.updateProduct(editingProduct.id, payload);
                console.log("Update success:", data);
            }

            setEditingProduct(null);
            setShowAddForm(false);
            fetchProducts();
        } catch (error: any) {
            console.error("Save caught error:", error);
            setError(error.message || 'Failed to save product');
        }
    };

    const handleInputChange = (field: keyof Product, value: any) => {
        if (editingProduct) {
            setEditingProduct({ ...editingProduct, [field]: value });
        }
    };

    const handleArrayInput = (field: 'sizes' | 'colors', value: string) => {
        if (editingProduct) {
            const array = value.split(',').map(item => item.trim());
            setEditingProduct({ ...editingProduct, [field]: array });
        }
    };

    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('Order Deleted');

    const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Product Deletion State
    const [productToDelete, setProductToDelete] = useState<number | null>(null);
    const [showProductDeleteConfirm, setShowProductDeleteConfirm] = useState(false);

    const promptDeleteProduct = (id: number) => {
        setProductToDelete(id);
        setShowProductDeleteConfirm(true);
    };

    const confirmDeleteProduct = async () => {
        if (productToDelete) {
            try {
                await adminService.deleteProduct(productToDelete);
                fetchProducts();
                setShowProductDeleteConfirm(false);
                setProductToDelete(null);
                setDeleteSuccessMessage('Product Deleted');
                setShowDeleteSuccess(true);
                setTimeout(() => setShowDeleteSuccess(false), 3000);
            } catch (error) {
                setError('Failed to delete product');
            }
        }
    };

    const promptDeleteOrder = (id: number) => {
        setOrderToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteOrder = async () => {
        if (orderToDelete) {
            try {
                await orderService.deleteOrder(orderToDelete);
                fetchOrders();
                setShowDeleteConfirm(false);
                setOrderToDelete(null);
                setOrderToDelete(null);
                setDeleteSuccessMessage('Order Deleted');
                setShowDeleteSuccess(true);
                setTimeout(() => setShowDeleteSuccess(false), 3000);
            } catch (error) {
                setError('Failed to delete order');
            }
        }
    };

    const handleUpdateStatus = async (id: number, newStatus: string) => {
        try {
            await orderService.updateOrderStatus(id, newStatus);
            fetchOrders();
            fetchStats();
        } catch (error) {
            setError('Failed to update order status');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            onClick={handleLogin}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 relative">
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center transform scale-100 transition-all max-w-sm w-full mx-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Delete Order?</h3>
                        <p className="text-gray-500 text-center mb-6">Are you sure you want to delete this order? This action cannot be undone.</p>
                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteOrder}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Delete Confirmation Modal */}
            {showProductDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center transform scale-100 transition-all max-w-sm w-full mx-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <Trash2 className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Delete Product?</h3>
                        <p className="text-gray-500 text-center mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => setShowProductDeleteConfirm(false)}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteProduct}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Success Popup */}
            {showDeleteSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center transform scale-100 transition-all">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Trash2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{deleteSuccessMessage}</h3>
                        <p className="text-gray-500 text-center">The item has been successfully removed from the system.</p>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-bold text-gray-800">Raja's Collection</h1>
                        <nav className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center gap-2 ${activeTab === 'products' ? 'bg-white shadow text-purple-600' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Package size={18} />
                                Products
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-white shadow text-purple-600' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <ShoppingBag size={18} />
                                Orders
                            </button>
                        </nav>
                    </div>
                    <div className="flex gap-4">
                        {activeTab === 'products' && (
                            <button
                                onClick={() => {
                                    setShowAddForm(true);
                                    setEditingProduct({
                                        id: 0, // Placeholder ID for new product
                                        name: '',
                                        description: '',
                                        price: 0,
                                        category: 'men',
                                        image: '',
                                        sizes: [],
                                        colors: [],
                                        inStock: true,
                                    });
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
                            >
                                <Plus size={20} />
                                Add Product
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Statistics Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Completion Stats */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-green-50 rounded-xl">
                            <CheckCircle className="text-green-600" size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Completed Today ✅</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.completed_today}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-blue-50 rounded-xl">
                            <Calendar className="text-blue-600" size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">This Week</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.completed_this_week}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-purple-50 rounded-xl">
                            <TrendingUp className="text-purple-600" size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">This Month</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.completed_this_month}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-yellow-50 rounded-xl">
                            <Clock className="text-yellow-600" size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Pending Orders</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.pending_orders}</h3>
                        </div>
                    </div>

                    {/* Sales Stats */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <ShoppingBag className="text-emerald-600" size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Today Sales</p>
                            <h3 className="text-2xl font-bold text-gray-800">PKR {stats.sales_today?.toLocaleString() || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <BarChart3 className="text-emerald-600" size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Weekly Sales</p>
                            <h3 className="text-2xl font-bold text-gray-800">PKR {stats.sales_this_week?.toLocaleString() || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <BarChart3 className="text-emerald-600" size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Monthly Sales</p>
                            <h3 className="text-2xl font-bold text-gray-800">PKR {stats.sales_this_month?.toLocaleString() || 0}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <Package className="text-gray-600" size={28} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-medium">Total Orders</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.total_orders}</h3>
                        </div>
                    </div>
                </div>

                {activeTab === 'products' ? (
                    <>
                        {/* Edit/Add Form */}
                        {(editingProduct || showAddForm) && (
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-purple-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold">
                                        {showAddForm ? 'Add New Product' : 'Edit Product'}
                                    </h2>
                                    <button
                                        onClick={() => {
                                            setEditingProduct(null);
                                            setShowAddForm(false);
                                        }}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={editingProduct!.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Price (PKR)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={editingProduct!.price}
                                            onChange={(e) => handleInputChange('price', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Category</label>
                                        <select
                                            value={editingProduct!.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="men">Men</option>
                                            <option value="women">Women</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                                        <input
                                            type="url"
                                            value={editingProduct!.image}
                                            onChange={(e) => handleInputChange('image', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Sizes (comma separated)</label>
                                        <input
                                            type="text"
                                            value={editingProduct!.sizes?.join(', ')}
                                            onChange={(e) => handleArrayInput('sizes', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                            placeholder="S, M, L, XL"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Colors (comma separated)</label>
                                        <input
                                            type="text"
                                            value={editingProduct!.colors?.join(', ')}
                                            onChange={(e) => handleArrayInput('colors', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                            placeholder="Red, Blue, Green"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                                        <textarea
                                            value={editingProduct!.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={editingProduct!.inStock}
                                            onChange={(e) => handleInputChange('inStock', e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <label className="text-gray-700 font-medium">In Stock</label>
                                    </div>
                                    <div className="md:col-span-2">
                                        <button
                                            onClick={handleSave}
                                            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center gap-2"
                                        >
                                            <Save size={20} />
                                            {showAddForm ? 'Add Product' : 'Update Product'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Products Table */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">#{product.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{product.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">PKR {product.price.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleEdit(product)}
                                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600 hover:text-red-900 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Orders Table */
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">#{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{order.customer_name}</div>
                                                <div className="text-sm text-gray-500">{order.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal min-w-[200px]">
                                                <div className="text-sm text-gray-600 leading-snug">{order.address}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PKR {order.total_price.toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.payment_method === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                                                    }`}>
                                                    {order.payment_method}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                    className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-purple-500 cursor-pointer ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => promptDeleteOrder(order.id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                                                    title="Delete Order"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                                                No orders received yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
