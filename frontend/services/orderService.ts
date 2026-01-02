import api from './api';

export interface OrderData {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    product_name: string;
    product_image: string;
    quantity: number;
    total_price: number;
    payment_method: string;
}

export const orderService = {
    createOrder: async (orderData: OrderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    getOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    updateOrderStatus: async (orderId: number, status: string) => {
        const response = await api.put(`/orders/${orderId}/status`, { status });
        return response.data;
    },

    deleteOrder: async (orderId: number) => {
        const response = await api.delete(`/orders/${orderId}`);
        return response.data;
    },
};
