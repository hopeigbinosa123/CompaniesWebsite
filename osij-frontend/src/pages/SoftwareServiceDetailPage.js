
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSoftwareService } from '../api/SoftwareServices';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';

const SoftwareServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await getSoftwareService(id);
        setService(response.data);
      } catch (error) {
        setError('Unable to load service details. Please try again later.');
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!service) return <ErrorMessage message="Service not found." />;

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{service.description}</p>
          <p className="text-md text-gray-500 mb-6">Service Type: {service.service_type}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Base Price</h3>
              <p className="text-2xl font-bold text-green-600">${service.base_price}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Estimated Timeline</h3>
              <p className="text-2xl font-bold text-blue-600">{service.estimated_timeline}</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to={`/software-services/request?service_id=${service.id}`}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-semibold text-lg inline-block shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              Book This Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareServiceDetailPage;
