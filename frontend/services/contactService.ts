import api from './api';

export interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const contactService = {
    sendMessage: async (contactData: ContactData) => {
        const response = await api.post('/contact', contactData);
        return response.data;
    },
};
