
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import LoadingSpinner from './components/shared/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPolicy from './components/shared/PrivacyPolicy.js';

// Public Module Pages
import EducationPage from './pages/EducationPage';
import SoftwareServicesPage from './pages/SoftwareServicesPage';
import SoftwareServiceDetailPage from './pages/SoftwareServiceDetailPage';
import RequestServicePage from './pages/RequestServicePage';
import DesignerListPage from './pages/GraphicDesign/List.jsx';
import DesignerDetailPage from './pages/GraphicDesign/Detail.jsx';
import GraphicDesignOrderForm from './pages/GraphicDesign/OrderForm.jsx';
import CosmetologyStylistDetail from './pages/Cosmetology/Detail.jsx';
import CosmetologyBookingForm from './pages/Cosmetology/BookingForm.jsx';
import CosmetologyServiceDetail from './pages/Cosmetology/ServiceDetail.jsx';
import CosmetologyPage from './pages/CosmetologyPage.jsx';

// Protected Dashboard Pages
import DashboardPage from './pages/DashboardPage';
import SoftwareProjectsPage from './pages/SoftwareProjectsPage';
import GraphicDesignOrdersPage from './pages/GraphicDesignOrdersPage';
import PaymentPage from './pages/PaymentPage';

// Education Module Extensions
import CourseDetailPage from './pages/CourseDetailPage';
import CourseLessonsPage from './pages/CourseLessonsPage';
import EnrolledCoursesList from './pages/EnrolledCourseList';

// 404 Page
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

// Main App Content
function AppContent() {
  const { loading } = useAuth();
  const location = useLocation();

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
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

            {/* Graphic Design */}
            <Route path="/graphic-design" element={<DesignerListPage />} />
            <Route path="/graphic-design/designers/:id" element={<DesignerDetailPage />} />
            <Route path="/graphic-design/order/:id" element={<GraphicDesignOrderForm />} />

            {/* Cosmetology */}
            <Route path="/cosmetology" element={<CosmetologyPage />} />
            <Route path="/cosmetology/stylists/:id" element={<CosmetologyStylistDetail />} />
            <Route path="/cosmetology/services/:id" element={<CosmetologyServiceDetail />} />
            <Route path="/cosmetology/stylists/:id/book" element={<CosmetologyBookingForm />} />

            {/* Education */}
            <Route path="/education" element={<EducationPage />} />
            <Route path="/education/courses/:id" element={<CourseDetailPage />} />
            <Route path="/education/courses/:id/lessons" element={<CourseLessonsPage />} />

            {/* Software Services */}
            <Route path="/software-services" element={<SoftwareServicesPage />} />
            <Route path="/software-services/:id" element={<SoftwareServiceDetailPage />} />
              
              {/* Protected  */}
            <Route path="/software-services/request" element={  <ProtectedRoute><RequestServicePage /></ProtectedRoute>} />

            {/* Protected Dashboard Routes */}
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
            <Route
              path="/dashboard/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/my-courses"
              element={
                <ProtectedRoute>
                  <EnrolledCoursesList />
                </ProtectedRoute>
              }
            />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

// App Wrapper with Auth Context
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
