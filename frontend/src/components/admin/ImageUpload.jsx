import React, { useState } from 'react';
import { HiCloudUpload, HiX } from 'react-icons/hi';
import uploadService from '../../services/uploadService';

const ImageUpload = ({ label, onUpload, currentImage, id }) => {
    const [preview, setPreview] = useState(currentImage || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    React.useEffect(() => {
        setPreview(currentImage || '');
    }, [currentImage]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Reset state
        setError('');
        setLoading(true);

        // Local preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        try {
            const data = await uploadService.uploadImage(file);
            onUpload(data.url);
            setLoading(false);
        } catch (err) {
            console.error('Upload failed', err);
            setError('Failed to upload image. Please try again.');
            setLoading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onUpload('');
        setError('');
    };

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block text-xs font-bold text-gray-500 uppercase mb-2">
                {label}
            </label>

            <div className="relative">
                {preview ? (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <HiX className="text-sm" />
                        </button>
                        {loading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-medium">
                                Uploading...
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors relative">
                        <input
                            type="file"
                            id={id}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={loading}
                        />
                        <HiCloudUpload className="text-3xl text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF (Max 10MB)</p>
                    </div>
                )}
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default ImageUpload;
