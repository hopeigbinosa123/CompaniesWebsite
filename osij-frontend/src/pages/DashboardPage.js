import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig'; // Import the configured axios instance
import LoadingSpinner from '../components/shared/LoadingSpinner';

// Helper function to format dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Sub-component for displaying a list of items
const InfoList = ({ title, items, renderItem, viewAllLink }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      {viewAllLink && (
        <Link to={viewAllLink} className="text-sm text-blue-600 hover:underline">
          View All
        </Link>
      )}
    </div>
    {items && items.length > 0 ? (
      <ul className="space-y-3">
        {items.map(renderItem)}
      </ul>
    ) : (
      <p className="text-gray-500">No recent activity.</p>
    )}
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/auth/dashboard/');
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.first_name || user?.username}!</h1>
          <p className="text-gray-600">Here's a summary of your recent activity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <InfoList 
            title="My Courses"
            items={dashboardData?.enrollments}
            renderItem={(item) => (
              <li key={item.id} className="p-2 bg-gray-50 rounded-md">{item.course_title} - <span className="font-medium">{item.status}</span></li>
            )}
            viewAllLink="/dashboard/my-courses"
          />

          {/* Appointments */}
          <InfoList 
            title="My Appointments"
            items={dashboardData?.appointments}
            renderItem={(item) => (
              <li key={item.id} className="p-2 bg-gray-50 rounded-md">{item.service_name} on {formatDate(item.appointment_date)}</li>
            )}
             viewAllLink="/dashboard/design-orders"
          />

          {/* Design Orders */}
          <InfoList 
            title="My Design Orders"
            items={dashboardData?.design_orders}
            renderItem={(item) => (
              <li key={item.id} className="p-2 bg-gray-50 rounded-md">{item.title} - <span className="font-medium">{item.status}</span></li>
            )}
            viewAllLink="/dashboard/design-orders"
          />

          {/* Service Requests */}
          <InfoList 
            title="My Software Requests"
            items={dashboardData?.service_requests}
            renderItem={(item) => (
              <li key={item.id} className="p-2 bg-gray-50 rounded-md">{item.project_title} - <span className="font-medium">{item.status}</span></li>
            )}
            viewAllLink="/dashboard/software-projects"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
