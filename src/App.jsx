import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Category from './pages/Category';
import PostPage from './pages/PostPage';
import About from './pages/About';
import Contact from './pages/Contact';
import DonationPage from './pages/DonationPage';

// Auth Pages
import Register from './pages/auth/Register';
import AdminLogin from './pages/auth/AdminLogin';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import CreatePost from './pages/admin/CreatePost';
import ManagePosts from './pages/admin/ManagePosts';
import UserManagement from './pages/admin/UserManagement';
import ManageTicker from './pages/admin/ManageTicker';
import ManageSettings from './pages/admin/ManageSettings';
import SecuritySettings from './pages/admin/SecuritySettings';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/category/:slug" element={<Layout><Category /></Layout>} />
          <Route path="/post/:slug" element={<Layout><PostPage /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/donate" element={<Layout><DonationPage /></Layout>} />

          {/* Auth Routes with Layout */}
          <Route path="/register" element={<Layout><Register /></Layout>} />

          {/* Admin Login - No Layout (standalone page) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes - Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="any_admin">
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="any_admin">
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-post"
            element={
              <ProtectedRoute requiredRole="any_admin">
                <AdminLayout>
                  <CreatePost />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-posts"
            element={
              <ProtectedRoute requiredRole="any_admin">
                <AdminLayout>
                  <ManagePosts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-ticker"
            element={
              <ProtectedRoute requiredRole="any_admin">
                <AdminLayout>
                  <ManageTicker />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requiredRole="any_admin">
                <AdminLayout>
                  <ManageSettings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="super_admin">
                <AdminLayout>
                  <UserManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/security"
            element={
              <ProtectedRoute requiredRole="any_admin">
                <AdminLayout>
                  <SecuritySettings />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <Layout>
                <div className="container-custom py-12 text-center">
                  <h1 className="text-4xl font-bold text-primary-black mb-4">404</h1>
                  <p className="text-xl text-primary-gray-600">Page not found</p>
                </div>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
