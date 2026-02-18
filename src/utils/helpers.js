// Role constants
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    EDITOR: 'editor',
    USER: 'user',
};

// Role hierarchy - higher number = more permissions
export const ROLE_HIERARCHY = {
    [ROLES.USER]: 0,
    [ROLES.EDITOR]: 1,
    [ROLES.ADMIN]: 2,
    [ROLES.SUPER_ADMIN]: 3,
};

// Role display names
export const ROLE_DISPLAY_NAMES = {
    [ROLES.SUPER_ADMIN]: 'Super Admin',
    [ROLES.ADMIN]: 'Admin',
    [ROLES.EDITOR]: 'Editor',
    [ROLES.USER]: 'User',
};

// Check if user has required role or higher
export const hasRole = (userRole, requiredRole) => {
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

// SEO utilities
export const generatePageTitle = (title, siteName = 'Dark Room') => {
    return title ? `${title} | ${siteName}` : siteName;
};

export const generateMetaTags = ({ title, description, image, url, type = 'article' }) => {
    return {
        title: generatePageTitle(title),
        description,
        openGraph: {
            title,
            description,
            image,
            url,
            type,
            siteName: 'Dark Room',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            image,
        },
    };
};

// Format date utilities
export const formatDate = (dateString, locale = 'en') => {
    const date = new Date(dateString);

    if (locale === 'si') {
        return date.toLocaleDateString('si-LK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(dateString);
};

// Text utilities
export const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

export const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

export const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

// Share utilities
export const shareOnFacebook = (url) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
};

export const shareOnTwitter = (url, text) => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
};

export const shareOnWhatsApp = (url, text) => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(shareUrl, '_blank');
};

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

// Validation utilities
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 8;
};

// Local storage utilities
export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (err) {
        console.error('Error saving to localStorage:', err);
        return false;
    }
};

export const getLocalStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
        console.error('Error reading from localStorage:', err);
        return defaultValue;
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (err) {
        console.error('Error removing from localStorage:', err);
        return false;
    }
};

// Number formatting
export const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

// Debounce utility
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Image utilities
export const getImageUrl = (path) => {
    if (!path) return '/placeholder-image.jpg';
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_API_URL || ''}${path}`;
};

export const getResponsiveImageSrcSet = (imagePath, sizes = [400, 800, 1200]) => {
    return sizes.map(size => `${imagePath}?w=${size} ${size}w`).join(', ');
};

export const extractYouTubeID = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};
