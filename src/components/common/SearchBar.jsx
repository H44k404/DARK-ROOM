import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, placeholder = "Search news..." }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            if (onSearch) {
                onSearch(searchTerm);
            } else {
                // Navigate to search results page (can be implemented later)
                navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            }
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="flex items-center">
                <div className={`relative transition-all duration-300 ${isExpanded ? 'w-64' : 'w-10'}`}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        onBlur={() => !searchTerm && setIsExpanded(false)}
                        placeholder={isExpanded ? placeholder : ''}
                        className={`w-full h-10 pl-10 pr-10 border border-primary-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary-black transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="absolute left-0 top-0 h-10 w-10 flex items-center justify-center text-primary-gray-600 hover:text-primary-black transition-colors"
                    >
                        <FaSearch />
                    </button>
                    {searchTerm && isExpanded && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-primary-gray-600 hover:text-primary-black transition-colors"
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
