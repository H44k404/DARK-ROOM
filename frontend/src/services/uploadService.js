import api from './api';

const uploadService = {
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await api.post('/upload', formData);
        return response;
    },
};

export default uploadService;
