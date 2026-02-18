const API_URL = '/api';

export const handleResponse = async (response) => {
    if (response.status === 401) {
        console.error('API Error 401: Unauthorized. Token might be invalid or missing.');
        // localStorage.removeItem('darkroom_token');
        // localStorage.removeItem('darkroom_user');
        // window.location.href = '/'; 
    }
    if (!response.ok) {
        let errorMessage = 'Something went wrong';
        try {
            const error = await response.json();
            errorMessage = error.message || error.error || errorMessage;
            console.error(`[Full Error Response]`, { status: response.status, error });
        } catch (e) {
            console.error('Failed to parse error response:', e);
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

import { getLocalStorage } from '../utils/helpers';

const getHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    let token = getLocalStorage('darkroom_token');
    // If token was stored directly as an object for some reason, unwrap it
    if (token && typeof token === 'object' && token.token) token = token.token;
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const api = {
    get: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: getHeaders()
        });
        return handleResponse(response);
    },
    post: async (endpoint, data) => {
        const isFormData = data instanceof FormData;
        const headers = getHeaders();

        if (isFormData) {
            delete headers['Content-Type'];
        }



        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(`[API Error POST ${endpoint}]`, { status: response.status, statusText: response.statusText });
        }

        return handleResponse(response);
    },
    put: async (endpoint, data) => {
        const isFormData = data instanceof FormData;
        const headers = getHeaders();

        if (isFormData) {
            delete headers['Content-Type'];
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        return handleResponse(response);
    },
};

export const sendContactMessage = (data) => api.post('/contact', data);

export default api;
