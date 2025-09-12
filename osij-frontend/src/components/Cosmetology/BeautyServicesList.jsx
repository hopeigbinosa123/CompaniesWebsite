import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig'; // Import the configured axios instance
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

export default function BeautyServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/cosmetology/services/');
        setServices(response.data);
      } catch (err) {
        setError('Something went wrong. Was unable to load beauty services.');
        console.error('Error fetching beauty services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="py-10 px-4 grid md:grid-cols-3 gap-6">
      {services.length === 0 ? (
        <p className="text-center text-gray-600 col-span-full">No beauty services available.</p>
      ) : (
        services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-gray-600">{service.description}</p>
            <p className="text-gray-700 mt-2">Price: ${service.price}</p>
            <p className="text-gray-700">Duration: {service.duration} minutes</p>
          </div>
        ))
      )}
    </section>
  );
}