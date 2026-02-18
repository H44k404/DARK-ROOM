import React, { useMemo, useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { HiX, HiRefresh } from 'react-icons/hi';
import ConfirmationModal from './ConfirmationModal';

const RichTextEditor = ({ value, onChange, placeholder = 'Write your content here...' }) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const editorRef = useRef(null);

    // Custom toolbar configuration
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                // Text formatting
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],

                // Colors
                [{ 'color': [] }, { 'background': [] }],

                // Lists and alignment
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],

                // Links and images
                ['link', 'image'],

                // Clear formatting
                ['clean']
            ],
            handlers: {
                image: function () {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();

                    input.onchange = async () => {
                        const file = input.files[0];
                        if (!file) return;

                        if (file.size > 10 * 1024 * 1024) { // 10MB limit
                            alert('File is too large! Please use images smaller than 10MB.');
                            return;
                        }

                        // Server-side upload
                        const formData = new FormData();
                        formData.append('image', file);

                        try {
                            // Show loading placeholder if needed, or just wait
                            const response = await fetch('http://localhost:5000/api/upload', {
                                method: 'POST',
                                body: formData
                            });

                            if (!response.ok) {
                                throw new Error('Upload failed');
                            }

                            const data = await response.json();
                            const range = this.quill.getSelection();
                            this.quill.insertEmbed(range.index, 'image', data.url);
                        } catch (error) {
                            console.error('Image upload failed:', error);
                            alert('Failed to upload image. Please try again.');
                        }
                    };
                }
            }
        },
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list',
        'align',
        'link', 'image'
    ];

    const handleEditorMouseDown = (e) => {
        const img = e.target.closest('img');
        if (img && editorRef.current?.contains(img)) {
            const rect = img.getBoundingClientRect();
            const containerRect = editorRef.current.getBoundingClientRect();

            setSelectedImg(img);
            setToolbarPos({
                top: rect.top - containerRect.top + 20,
                left: rect.left - containerRect.left + (rect.width / 2)
            });
        } else if (!e.target.closest('.image-management-toolbar')) {
            setSelectedImg(null);
        }
    };

    const handleReplace = (e) => {
        e.stopPropagation();
        if (!selectedImg) return;
        const newUrl = window.prompt('Enter new image URL:', selectedImg.src);
        if (newUrl && newUrl !== selectedImg.src) {
            selectedImg.src = newUrl;
            triggerChange();
        }
        setSelectedImg(null);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        if (!selectedImg) return;
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedImg) {
            selectedImg.remove();
            triggerChange();
        }
        setIsDeleteModalOpen(false);
        setSelectedImg(null);
    };

    const triggerChange = () => {
        const editor = editorRef.current?.querySelector('.ql-editor');
        if (editor) editor.dispatchEvent(new Event('input', { bubbles: true }));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectedImg && !e.target.closest('.rich-text-editor')) {
                setSelectedImg(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [selectedImg]);

    return (
        <div className="rich-text-editor relative group" ref={editorRef} onMouseDown={handleEditorMouseDown}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="bg-white"
            />

            {/* Floating Image Toolbar */}
            {selectedImg && (
                <div
                    className="image-management-toolbar absolute z-[60] flex items-center gap-2 bg-primary-black/95 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/20 -translate-x-1/2 animate-in fade-in zoom-in duration-200"
                    style={{ top: toolbarPos.top, left: toolbarPos.left }}
                >
                    <button
                        type="button"
                        onClick={handleReplace}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-primary-black rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                        <HiRefresh className="text-sm" />
                        Replace
                    </button>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                        <HiX className="text-sm" />
                        Remove
                    </button>
                </div>
            )}

            <p className="text-[10px] text-gray-400 mt-2 italic px-4">Tip: Click an image to Replace or Remove it.</p>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Image"
                message="Are you sure you want to remove this image? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isDanger={true}
            />
        </div>
    );
};

export default RichTextEditor;
