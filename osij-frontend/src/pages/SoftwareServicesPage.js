import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';

const SoftwareServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/software-services/services/');
        setServices(response.data);
      } catch (error) {
        setError('Unable to load services. Please try again later.');
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Software Services</h1>
        
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services available at the moment.</p>
            <p className="text-sm text-gray-500 mt-2">Please check back later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {services.map((service) => (
                <Link to={`/software-services/${service.id}`} key={service.id}>
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
                    <div className="text-3xl mb-4">{service.icon || '💻'}</div>
                    <h3 className="text-xl font-semibold mb-2 text-green-600">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <p className="text-sm text-gray-500 mb-2">Type: {service.service_type}</p>
                    
                    {(service.price_range || service.duration) && (
                      <div className="border-t pt-4 mt-4">
                        {service.price_range && (
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold">Price:</span> {service.price_range}
                          </p>
                        )}
                        {service.duration && (
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Duration:</span> {service.duration}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/software-services/request"
                className="bg-green-600 text-white px-12 py-4 rounded-lg hover:bg-green-700 font-semibold text-xl inline-block shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 animate-pulse"
              >
                Request a Service
              </Link>
              <p className="text-gray-600 mt-4 text-sm">
                Can't find what you're looking for? Contact us for custom solutions.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SoftwareServicesPage;