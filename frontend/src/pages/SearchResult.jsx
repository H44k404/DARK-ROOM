import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    return (
        <div className="container-custom py-12 min-h-[50vh]">
            <h1 className="text-4xl font-bold text-white mb-8 border-b border-[#333] pb-4 font-anton">
                SEARCH RESULTS
            </h1>

            <div className="text-white">
                {query ? (
                    <p className="text-xl">
                        Showing results for: <span className="text-[var(--accent-red)] font-bold">"{query}"</span>
                    </p>
                ) : (
                    <p className="text-xl text-gray-400">Please enter a search term.</p>
                )}

                {/* Placeholder for actual search logic */}
                <div className="mt-12 p-8 bg-[#1a1a1a] rounded text-center text-gray-500">
                    <p>No results found at this time. (Search implementation pending backend integration)</p>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
