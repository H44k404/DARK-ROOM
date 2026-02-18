import json
from datetime import datetime, timedelta

# Categories
categories = [
    {"id": 2, "name": "Sri Lanka", "slug": "sri-lanka"},
    {"id": 3, "name": "Political", "slug": "political"},
    {"id": 4, "name": "Feature", "slug": "feature"},
    {"id": 5, "name": "International", "slug": "international"},
    {"id": 6, "name": "Other", "slug": "other"},
]

# Sample images from Unsplash
images = [
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop",
]

# Sample YouTube video IDs (using public videos for demo)
video_ids = ["dQw4w9WgXcQ", "jNQXAC9IVRw", "9bZkp7q19f0", "kJQP7kiw5Fk"]
audio_ids = ["ScMzIvxBSi4", "ZbZSe6N_BXs", "60ItHLz5WEA", "fJ9rUzIMcZQ"]

# News templates for each category with post types
news_templates = {
    "Sri Lanka": [
        ("ශ්‍රී ලංකාවේ නව ආර්ථික ප්‍රතිසංස්කරණ ප්‍රකාශයට පත් කෙරේ", "si", "රජය විසින් නව ආර්ථික ප්‍රතිසංස්කරණ පැකේජයක් ප්‍රකාශයට පත් කර ඇත.", "article"),
        ("කොළඹ නගරයේ නව මාර්ග සංවර්ධන ව්‍යාපෘතිය ආරම්භ වේ", "si", "කොළඹ නගරයේ තදබදය අවම කිරීම සඳහා නව මාර්ග සංවර්ධන ව්‍යාපෘතියක් ආරම්භ කර ඇත.", "video"),
        ("Sri Lanka Tourism Industry Shows Strong Recovery", "en", "The tourism sector reports a 45% increase in visitor arrivals this quarter.", "article"),
        ("නව තාක්ෂණික උද්‍යාන සංකීර්ණය විවෘත කෙරේ", "si", "රජය විසින් නව තාක්ෂණික උද්‍යාන සංකීර්ණයක් විවෘත කර ඇත.", "audio"),
        ("Port City Colombo Development Reaches New Milestone", "en", "Major infrastructure projects completed ahead of schedule.", "article"),
        ("ශ්‍රී ලංකාවේ අපනයන ආදායම වැඩි වේ", "si", "මෙම වසරේ අපනයන ආදායම 20%කින් වැඩි වී ඇත.", "video"),
        ("New Railway Line Connecting North and South Opens", "en", "Historic railway connection improves transportation across the island.", "article"),
        ("පාරිසරික සංරක්ෂණ ව්‍යාපෘති ආරම්භ වේ", "si", "රජය විසින් නව පාරිසරික සංරක්ෂණ ව්‍යාපෘති මාලාවක් ආරම්භ කර ඇත.", "audio"),
        ("Sri Lanka Wins International Award for Sustainable Development", "en", "Country recognized for environmental conservation efforts.", "article"),
        ("නව රැකියා අවස්ථා 50,000ක් නිර්මාණය වේ", "si", "ආර්ථික ප්‍රතිසංස්කරණ මගින් නව රැකියා අවස්ථා නිර්මාණය වී ඇත.", "video"),
        ("Digital Infrastructure Expansion Announced", "en", "Nationwide 5G network rollout to begin next quarter.", "article"),
        ("ශ්‍රී ලංකාව ආසියාතික ආර්ථික සමුළුව පවත්වයි", "si", "කොළඹ නගරයේ ප්‍රධාන ආසියාතික ආර්ථික සමුළුව පැවැත්වේ.", "audio"),
    ],
    "Political": [
        ("New Infrastructure Development Plan Unveiled", "en", "Government announces ambitious infrastructure development plan.", "article"),
        ("Education Reform Bill Passes Parliament", "en", "Parliament passes comprehensive education reform bill.", "video"),
        ("පාර්ලිමේන්තුව නව බදු ප්‍රතිසංස්කරණ අනුමත කරයි", "si", "නව බදු ප්‍රතිසංස්කරණ පනත් කෙටුම්පත අනුමත කර ඇත.", "article"),
        ("Opposition Proposes Alternative Economic Strategy", "en", "Opposition parties present comprehensive economic plan.", "audio"),
        ("ආණ්ඩුව නව සෞඛ්‍ය ප්‍රතිපත්ති ප්‍රකාශයට පත් කරයි", "si", "රජය විසින් නව සෞඛ්‍ය ප්‍රතිපත්ති පැකේජයක් ප්‍රකාශයට පත් කර ඇත.", "video"),
        ("Parliament Debates Climate Change Legislation", "en", "New environmental protection laws under consideration.", "article"),
        ("නව අධිකරණ ප්‍රතිසංස්කරණ යෝජනා කෙරේ", "si", "අධිකරණ පද්ධතිය නවීකරණය කිරීම සඳහා යෝජනා ඉදිරිපත් කර ඇත.", "audio"),
        ("Government Announces Anti-Corruption Measures", "en", "New transparency initiatives launched to combat corruption.", "article"),
        ("පළාත් සභා ප්‍රතිසංස්කරණ පනත් කෙටුම්පත ඉදිරිපත් වේ", "si", "පළාත් සභා පද්ධතිය ශක්තිමත් කිරීම සඳහා නව පනත් කෙටුම්පතක් ඉදිරිපත් කර ඇත.", "video"),
        ("Coalition Government Reaches Agreement on Budget", "en", "Major political parties agree on national budget priorities.", "article"),
        ("නව ඡන්ද ප්‍රතිසංස්කරණ යෝජනා කෙරේ", "si", "ඡන්ද පද්ධතිය නවීකරණය කිරීම සඳහා යෝජනා ඉදිරිපත් වී ඇත.", "audio"),
        ("Parliament Approves Constitutional Amendment", "en", "Historic constitutional changes passed with bipartisan support.", "article"),
    ],
    "Feature": [
        ("පාරිසරික සංරක්ෂණය සඳහා නව ව්‍යාපෘති ආරම්භ වේ", "si", "රජය විසින් පාරිසරික සංරක්ෂණය සඳහා නව ව්‍යාපෘති මාලාවක් ආරම්භ කර ඇත.", "article"),
        ("The Rise of Sustainable Agriculture in Rural Communities", "en", "Farmers embrace eco-friendly farming practices with remarkable results.", "video"),
        ("සංස්කෘතික උරුමය සුරැකීමේ නව මුලපිරීම", "si", "පුරාවිද්‍යා දෙපාර්තමේන්තුව විසින් සංස්කෘතික උරුමය සුරැකීමේ නව වැඩසටහනක් ආරම්භ කර ඇත.", "audio"),
        ("Women Entrepreneurs Transform Local Economy", "en", "Success stories of women-led businesses inspiring communities.", "article"),
        ("තරුණ නවෝත්පාදකයින් තාක්ෂණික විසඳුම් නිර්මාණය කරති", "si", "තරුණ තරුණියන් විසින් නව තාක්ෂණික විසඳුම් නිර්මාණය කර ඇත.", "video"),
        ("Traditional Crafts Experience Modern Revival", "en", "Ancient art forms find new life through contemporary adaptations.", "article"),
        ("අධ්‍යාපන ක්ෂේත්‍රයේ නව්‍ය ප්‍රවේශයන්", "si", "ගුරුවරුන් විසින් නව්‍ය අධ්‍යාපන ක්‍රම භාවිතා කරති.", "audio"),
        ("Community-Led Conservation Efforts Show Promising Results", "en", "Local initiatives protect endangered species and habitats.", "article"),
        ("ග්‍රාමීය සංවර්ධනයේ සාර්ථක කථා", "si", "ග්‍රාමීය ප්‍රජාවන් සංවර්ධනය සඳහා නව මාර්ග සොයයි.", "video"),
        ("Digital Literacy Programs Transform Education", "en", "Technology integration improves learning outcomes nationwide.", "article"),
        ("සෞඛ්‍ය සේවා ක්ෂේත්‍රයේ නව්‍යකරණ", "si", "සෞඛ්‍ය සේවා ක්ෂේත්‍රයේ නව තාක්ෂණික ප්‍රගතිය.", "audio"),
        ("Youth-Led Social Enterprises Making Impact", "en", "Young entrepreneurs address social challenges through business.", "article"),
    ],
    "International": [
        ("International Trade Summit Concludes with Major Agreements", "en", "Multiple bilateral trade agreements signed between nations.", "article"),
        ("Global Climate Conference Reaches Historic Agreement", "en", "World leaders commit to ambitious carbon reduction targets.", "video"),
        ("ආසියා පැසිෆික් කලාපයේ ආර්ථික වර්ධනය වේගවත් වේ", "si", "කලාපීය ආර්ථික වර්ධනය අපේක්ෂිත මට්ටම් ඉක්මවයි.", "audio"),
        ("UN Security Council Addresses Regional Conflicts", "en", "International community seeks peaceful resolutions.", "article"),
        ("ජාත්‍යන්තර තාක්ෂණික සමුළුව සාර්ථකව අවසන් වේ", "si", "ප්‍රධාන තාක්ෂණික සමුළුව නව සහයෝගීතා ඇති කරයි.", "video"),
        ("Global Health Organization Launches New Initiative", "en", "Worldwide vaccination program aims to eradicate diseases.", "article"),
        ("ජාත්‍යන්තර ක්‍රීඩා උළෙල සඳහා සූදානම", "si", "ප්‍රධාන ජාත්‍යන්තර ක්‍රීඩා උළෙල සඳහා සූදානම් කටයුතු ආරම්භ වේ.", "audio"),
        ("World Economic Forum Discusses Future of Work", "en", "Leaders debate automation and employment challenges.", "article"),
        ("ජාත්‍යන්තර අධ්‍යාපන සමුළුව පවත්වයි", "si", "අධ්‍යාපන ප්‍රතිසංස්කරණ පිළිබඳ ජාත්‍යන්තර සංවාදය.", "video"),
        ("International Space Agency Announces Mars Mission", "en", "Historic space exploration project receives global support.", "article"),
        ("ජාත්‍යන්තර සංගීත උළෙල සාර්ථකව පවත්වයි", "si", "ලෝක ප්‍රසිද්ධ කලාකරුවන් සහභාගී වූ සංගීත උළෙල.", "audio"),
        ("Global Trade Organization Reports Economic Growth", "en", "International trade volumes reach record highs.", "article"),
    ],
    "Other": [
        ("නව තාක්ෂණික නවෝත්පාදන ප්‍රදර්ශනය", "si", "නවීන තාක්ෂණික නවෝත්පාදන ප්‍රදර්ශනය පැවැත්වේ.", "article"),
        ("Local Food Festival Celebrates Culinary Diversity", "en", "Traditional and modern cuisines showcase cultural heritage.", "video"),
        ("ක්‍රීඩා තරඟාවලිය සාර්ථකව අවසන් වේ", "si", "ජාතික ක්‍රීඩා තරඟාවලිය විශිෂ්ට ලෙස සම්පූර්ණ වේ.", "audio"),
        ("Art Exhibition Features Contemporary Local Artists", "en", "Emerging artists gain recognition through major showcase.", "article"),
        ("සංගීත උළෙල දහස් ගණනක් ආකර්ෂණය කරයි", "si", "ජාතික සංගීත උළෙල විශාල ජනප්‍රියත්වයක් ලබයි.", "video"),
        ("Science Fair Highlights Student Innovation", "en", "Young scientists present groundbreaking research projects.", "article"),
        ("පොත් ප්‍රදර්ශනය සාහිත්‍ය ප්‍රේමීන් ආකර්ෂණය කරයි", "si", "වාර්ෂික පොත් ප්‍රදර්ශනය විශාල සාර්ථකත්වයක් ලබයි.", "audio"),
        ("Film Festival Showcases Independent Cinema", "en", "Local filmmakers receive international recognition.", "article"),
        ("ක්‍රීඩා පුහුණු මධ්‍යස්ථානය විවෘත කෙරේ", "si", "නව ක්‍රීඩා පුහුණු මධ්‍යස්ථානය තරුණයින් සඳහා විවෘත වේ.", "video"),
        ("Fashion Week Highlights Local Design Talent", "en", "Designers present innovative collections to global audience.", "article"),
        ("සෞඛ්‍ය දැනුවත් කිරීමේ වැඩසටහන ආරම්භ වේ", "si", "ජනතාව සෞඛ්‍ය දැනුවත් කිරීම සඳහා නව වැඩසටහනක්.", "audio"),
        ("Technology Expo Attracts Thousands of Visitors", "en", "Latest innovations in tech showcased at annual event.", "article"),
    ],
}

posts = []
post_id = 1
base_date = datetime(2026, 2, 13, 10, 0, 0)

for category in categories:
    templates = news_templates[category["name"]]
    for i in range(12):
        template = templates[i % len(templates)]
        title_base, lang, excerpt, post_type = template
        
        # Add variation to titles
        if i >= len(templates):
            title = f"{title_base} - Update {i - len(templates) + 1}"
        else:
            title = title_base
        
        # Calculate dates
        hours_ago = post_id * 3
        published_at = base_date - timedelta(hours=hours_ago)
        created_at = published_at - timedelta(hours=1)
        
        post = {
            "id": post_id,
            "title": title,
            "slug": f"{category['slug']}-post-{i+1}",
            "excerpt": excerpt,
            "content": f"<p>{excerpt}</p><p>Full article content would go here with more details about the story.</p>",
            "featuredImage": images[i % len(images)],
            "categoryId": category["id"],
            "categoryName": category["name"],
            "language": lang,
            "postType": post_type,
            "viewCount": 500 + (post_id * 37),
            "publishedAt": published_at.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "createdAt": created_at.strftime("%Y-%m-%dT%H:%M:%SZ"),
        }
        
        # Add video/audio IDs based on post type
        if post_type == "video":
            post["videoId"] = video_ids[i % len(video_ids)]
        elif post_type == "audio":
            post["audioId"] = audio_ids[i % len(audio_ids)]
        
        posts.append(post)
        post_id += 1

# Generate JavaScript file
js_content = """// Mock data for development
export const mockCategories = [
    { id: 1, name: 'Home', slug: 'home' },
    { id: 2, name: 'Sri Lanka', slug: 'sri-lanka' },
    { id: 3, name: 'Political', slug: 'political' },
    { id: 4, name: 'Feature', slug: 'feature' },
    { id: 5, name: 'International', slug: 'international' },
    { id: 6, name: 'Other', slug: 'other' },
];

export const mockPosts = """

js_content += json.dumps(posts, indent=4, ensure_ascii=False)

js_content += """;

// Mock users with different roles for testing RBAC
export const mockUsers = [
    {
        id: 1,
        email: 'superadmin@darkroom.lk',
        password: 'admin123',
        role: 'super_admin',
        name: 'Super Admin',
    },
    {
        id: 2,
        email: 'admin@darkroom.lk',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
    },
    {
        id: 3,
        email: 'editor@darkroom.lk',
        password: 'editor123',
        role: 'editor',
        name: 'Editor User',
    },
    {
        id: 4,
        email: 'user@darkroom.lk',
        password: 'user123',
        role: 'user',
        name: 'Regular User',
    },
];

// Helper function to get user by email
export const getUserByEmail = (email) => {
    return mockUsers.find(user => user.email === email);
};

// Backward compatibility - export first admin user as mockUser
export const mockUser = mockUsers[1];

// Helper function to get posts by category
export const getPostsByCategory = (categorySlug) => {
    if (categorySlug === 'home') {
        return mockPosts;
    }
    return mockPosts.filter(post =>
        post.categoryName.toLowerCase().replace(' ', '-') === categorySlug
    );
};

// Helper function to get posts by type
export const getPostsByType = (postType) => {
    return mockPosts.filter(post => post.postType === postType);
};

// Helper function to get post type statistics
export const getPostTypeStats = () => {
    const stats = {
        article: 0,
        video: 0,
        audio: 0,
        total: mockPosts.length
    };
    
    mockPosts.forEach(post => {
        if (post.postType === 'article') stats.article++;
        else if (post.postType === 'video') stats.video++;
        else if (post.postType === 'audio') stats.audio++;
    });
    
    return stats;
};

// Helper function to get single post
export const getPostBySlug = (slug) => {
    return mockPosts.find(post => post.slug === slug);
};

// Helper function to get featured posts
export const getFeaturedPosts = (limit = 3) => {
    return mockPosts.slice(0, limit);
};

// Helper function to get latest posts
export const getLatestPosts = (limit = 6) => {
    return [...mockPosts]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, limit);
};

// Helper function to get related posts
export const getRelatedPosts = (postId, categoryId, limit = 3) => {
    return mockPosts
        .filter(post => post.id !== postId && post.categoryId === categoryId)
        .slice(0, limit);
};

// Increment view count (mock implementation)
export const incrementViewCount = (postId) => {
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
        post.viewCount += 1;
    }
    return post;
};
"""

# Write to file
with open("src/services/mockData.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(posts)} posts across {len(categories)} categories")
print("Post type distribution:")
article_count = sum(1 for p in posts if p["postType"] == "article")
video_count = sum(1 for p in posts if p["postType"] == "video")
audio_count = sum(1 for p in posts if p["postType"] == "audio")
print(f"  Articles: {article_count}")
print(f"  Videos: {video_count}")
print(f"  Audio: {audio_count}")
print("Mock data file created successfully!")
