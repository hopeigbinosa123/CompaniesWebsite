import React, { useState, useEffect } from 'react';
import { cosmetologyAPIEndpoints, cosmetologyFormHelpers } from '../../api/cosmetology';

export default function BeautyServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await cosmetologyAPIEndpoints.getServices();
        setServices(response);
      } catch (err) {
        setError('Failed to load services');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-10 px-4 grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-4">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 grid md:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-pink-700 mb-2">{service.name}</h3>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Category:</span>
              <span className="text-sm font-medium">
                {cosmetologyFormHelpers.formatServiceCategory(service.category)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Price:</span>
              <span className="text-lg font-bold text-pink-600">
                ${service.price}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Duration:</span>
              <span className="text-sm font-medium">
                {cosmetologyFormHelpers.formatDuration(service.duration)}
              </span>
            </div>
          </div>
          {service.is_available && (
            <div className="mt-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Available
              </span>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
