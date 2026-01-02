import api from './api';

export interface AdminStats {
    completed_today: number;
    completed_this_week: number;
    completed_this_month: number;
    sales_today: number;
    sales_this_week: number;
    sales_this_month: number;
    total_orders: number;
    pending_orders: number;
}

export const adminService = {
    getStats: async () => {
        const response = await api.get<AdminStats>('/admin/stats');
        return response.data;
    },

    // Add product (used in AdminPanel)
    addProduct: async (productData: any) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    updateProduct: async (productId: number, productData: any) => {
        const response = await api.put(`/products/${productId}`, productData);
        return response.data;
    },

    deleteProduct: async (productId: number) => {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    },
};
