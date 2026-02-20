import React, { Fragment } from 'react';
import PostCard from './PostCard';

const PostGrid = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-[#AAAAAA] text-lg">No posts found</p>
            </div>
        );
    }

    // Function to render ad banner
    const renderAdBanner = (key) => (
        <div
            key={`ad-${key}`}
            className="w-full h-[90px] bg-[#1A1A1A] border border-dashed border-[#333333] flex items-center justify-center my-[28px] text-[#555555] text-[12px] font-[600] tracking-[1px] uppercase col-span-full"
        >
            ADVERTISEMENT
        </div>
    );

    // Chunk posts into groups of 8 to insert ads
    const renderGridWithAds = () => {
        const gridItems = [];
        const chunkSize = 8;

        for (let i = 0; i < posts.length; i += chunkSize) {
            const chunk = posts.slice(i, i + chunkSize);

            // Add the grid rows for this chunk
            gridItems.push(
                <div key={`chunk-${i}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] mt-[24px]">
                    {chunk.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            );

            // Add ad banner after the chunk if it's not the last one, OR if we want it after every 8 regardless
            // The prompt says "After row 1 and row 2 (8 cards) -> ad".
            // So yes, after every chunk of 8.
            if (i + chunkSize < posts.length) {
                gridItems.push(renderAdBanner(i));
            } else if (posts.length > 8 && (i + chunkSize >= posts.length)) {
                // Should we show ad at the very bottom?
                // "So the pattern is: 8 cards -> ad -> 8 cards -> ad -> continue"
                // It doesn't explicitly say "don't show at the very end", but usually implied "between".
                // I'll leave it as "between" chunks for now.
                gridItems.push(renderAdBanner(i));
            }
        }
        return gridItems;
    };

    return (
        <Fragment>
            {renderGridWithAds()}
        </Fragment>
    );
};

export default PostGrid;
