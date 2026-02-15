const API_URL = '/api';

export const handleResponse = async (response) => {
    if (response.status === 401) {
        localStorage.removeItem('darkroom_token');
        localStorage.removeItem('darkroom_user');
    }
    if (!response.ok) {
        let errorMessage = 'Something went wrong';
        try {
            const error = await response.json();
            errorMessage = error.message || error.error || errorMessage;
        } catch (e) { }
        throw new Error(errorMessage);
    }
    return response.json();
};

const getHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('darkroom_token');
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
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    put: async (endpoint, data) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
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

export default api;
