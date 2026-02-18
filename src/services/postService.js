import api from './api';

export const postService = {
    getPosts: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.category) searchParams.append('category', params.category);
        if (params.type) searchParams.append('type', params.type);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.skip) searchParams.append('skip', params.skip);
        if (params.status) searchParams.append('status', params.status);

        const queryString = searchParams.toString();
        return api.get(`/posts${queryString ? `?${queryString}` : ''}`);
    },

    getPostBySlug: (slug) => {
        return api.get(`/posts/slug/${slug}`);
    },

    getPostById: (id) => {
        return api.get(`/posts/${id}`);
    },

    getCategories: () => {
        return api.get('/posts/categories');
    },

    getStats: () => {
        return api.get('/posts/stats');
    },

    createPost: (postData) => {
        return api.post('/posts', postData);
    },

    updatePost: (id, postData) => {
        return api.put(`/posts/${id}`, postData);
    },

    deletePost: (id) => {
        return api.delete(`/posts/${id}`);
    },

    approvePost: (id) => {
        return api.put(`/posts/${id}/approve`);
    }
};

export default postService;
