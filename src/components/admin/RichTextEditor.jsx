import React, { useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange, placeholder = 'Write your content here...' }) => {
    // Custom toolbar configuration
    const modules = useMemo(() => ({
        toolbar: [
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
    }), []);

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet',
        'align',
        'link', 'image'
    ];

    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="bg-white"
            />
        </div>
    );
};

export default RichTextEditor;
