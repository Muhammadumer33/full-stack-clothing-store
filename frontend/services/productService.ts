import api from './api';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    sizes: string[];
    colors: string[];
    inStock: boolean;
}

export const productService = {
    getAllProducts: async (category?: string) => {
        const url = category && category !== 'all' ? `/products?category=${category}` : '/products';
        const response = await api.get<Product[]>(url);
        return response.data;
    },

    getProductById: async (id: number) => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },
};
