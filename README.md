# Dark Room - Sri Lankan News Website

A professional, mobile-first digital news platform built with React, Tailwind CSS, and modern web technologies. Features a clean black & white theme with full support for Sinhala and English content.

![Dark Room](https://img.shields.io/badge/Status-Ready%20for%20Backend-success)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The website will be available at `http://localhost:5173/`

## 🎯 Features

### ✨ Core Features
- **Mobile-First Design** - Optimized for mobile, tablet, and desktop
- **Bilingual Support** - Full Sinhala and English content support
- **Black & White Theme** - Professional editorial design
- **Admin Panel** - Complete content management system
- **Authentication** - Secure login and registration
- **Social Sharing** - Facebook, X/Twitter, WhatsApp integration
- **Newsletter** - Email subscription system
- **SEO Optimized** - Search engine friendly structure

### 📱 Mobile Optimized
- Touch-friendly UI (44px minimum touch targets)
- Responsive grid layouts (1/2/3 columns)
- Hamburger menu for mobile navigation
- Optimized fonts and spacing
- Fast loading times

### 🔐 Admin Panel
- Dashboard with statistics
- Create and manage posts
- Category management
- View analytics
- Image upload support

### 🌐 Pages
- Home (featured posts + latest news)
- Category pages (Sri Lanka, Political, Feature, International, Other)
- Post detail pages
- About Us
- Contact Us
- Authentication (Sign In, Register)

## 🛠️ Technology Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **React Icons** - Icons
- **Google Fonts** - Noto Sans Sinhala + Inter

## 📁 Project Structure

```
dark-room/
├── src/
│   ├── components/      # Reusable components
│   │   ├── layout/      # Header, Footer, Navbar, etc.
│   │   ├── post/        # Post-related components
│   │   ├── common/      # Shared components
│   │   └── admin/       # Admin panel components
│   ├── pages/           # Page components
│   ├── services/        # API and mock data
│   ├── context/         # React Context (Auth)
│   ├── hooks/           # Custom hooks
│   └── utils/           # Utility functions
├── public/              # Static assets
└── tailwind.config.js   # Tailwind configuration
```

## 🔑 Demo Credentials

**Admin Access:**
- Email: `admin@darkroom.lk`
- Password: `admin123`

## 🎨 Design System

### Colors
- Primary Black: `#000000`
- Primary White: `#FFFFFF`
- Gray Scale: 50-900 shades

### Typography
- **Sinhala**: Noto Sans Sinhala
- **English**: Inter
- **Fallback**: sans-serif

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 📝 Sample Data

The project includes 6 sample posts:
- 3 in Sinhala (ශ්‍රී ලංකා related content)
- 3 in English (International, Political news)
- All with featured images and view counts

## 🔄 Backend Integration

Currently using mock data. To integrate with a real backend:

1. **Set up your backend API** (Node.js, Python, etc.)
2. **Create database** using the schema in `implementation_plan.md`
3. **Update API calls** in `src/services/api.js`
4. **Replace mock data** in `src/services/mockData.js`
5. **Implement file upload** for featured images

Database schema and API structure are documented in the implementation plan.

## 🚢 Deployment

### Frontend Deployment
```bash
npm run build
```

Deploy the `dist` folder to:
- Vercel
- Netlify
- GitHub Pages
- Your hosting provider

### Environment Variables
Create a `.env` file:
```
VITE_API_URL=your_backend_api_url
```

## 📱 Testing

### Manual Testing
1. Open `http://localhost:5173/`
2. Test navigation and mobile menu
3. Click through category pages
4. View post details
5. Test share buttons
6. Try admin login
7. Create a test post
8. Test on mobile (resize to 375px)

### Sinhala Text Testing
Test with sample Sinhala text:
```
ශ්‍රී ලංකාවේ නව ආර්ථික ප්‍රතිසංස්කරණ
```

## 🎯 Next Steps

### For Production
- [ ] Integrate backend API
- [ ] Set up database
- [ ] Implement file upload
- [ ] Add real authentication
- [ ] Migrate existing content
- [ ] Configure SEO meta tags
- [ ] Set up analytics
- [ ] Deploy to hosting

### Optional Enhancements
- [ ] Search functionality
- [ ] Advanced analytics
- [ ] Multi-author support
- [ ] Content scheduling
- [ ] Image optimization
- [ ] PWA features

## 📄 Documentation

- **Implementation Plan**: See `implementation_plan.md` in artifacts
- **Walkthrough**: See `walkthrough.md` in artifacts
- **Task Checklist**: See `task.md` in artifacts

## 🤝 Support

For questions or issues:
1. Check the walkthrough documentation
2. Review the implementation plan
3. Test with demo credentials
4. Verify all dependencies are installed

## 📜 License

This project is built for client use. All rights reserved.

---

**Status**: ✅ Frontend Complete - Ready for Backend Integration  
**Version**: 1.0.0  
**Last Updated**: February 2026

Built with ❤️ for quality journalism in Sri Lanka
