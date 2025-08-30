import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import LoadingSpinner from './components/shared/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import Page Components - Public
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Import Module Pages - Public
import EducationPage from './pages/EducationPage';
import SoftwareServicesPage from './pages/SoftwareServicesPage';
import GraphicDesignPage from './pages/GraphicDesignPage';
import CosmetologyPage from './pages/CosmetologyPage';

// Import Dashboard & Protected Pages - Require Login
import DashboardPage from './pages/DashboardPage';
import SoftwareProjectsPage from './pages/SoftwareProjectsPage';
import GraphicDesignOrdersPage from './pages/GraphicDesignOrdersPage';

import './App.css';

// Component to handle the loading state and routing
function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading application...</p>
      </div>
    );
  }

  return (
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Public Module Pages */}
          <Route path="/education" element={<EducationPage />} />
          <Route path="/software-services" element={<SoftwareServicesPage />} />
          <Route path="/graphic-design" element={<GraphicDesignPage />} />
          <Route path="/cosmetology" element={<CosmetologyPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/software-projects"
            element={
              <ProtectedRoute>
                <SoftwareProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/design-orders"
            element={
              <ProtectedRoute>
                <GraphicDesignOrdersPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;