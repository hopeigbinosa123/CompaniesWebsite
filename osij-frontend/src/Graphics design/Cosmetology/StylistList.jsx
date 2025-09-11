import React, { useState, useEffect } from 'react';
import { cosmetologyAPIEndpoints } from '../../api/cosmetology';

export default function StylistList() {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await cosmetologyAPIEndpoints.getStylists();
        setStylists(response);
      } catch (err) {
        setError('Failed to load stylists');
        console.error('Error fetching stylists:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStylists();
  }, []);

  if (loading) {
    return (
      <section className="py-10 px-4 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Stylists</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 border rounded-lg shadow animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-4 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Stylists</h2>
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
    <section className="py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Stylists</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {stylists.map((stylist) => (
          <div key={stylist.id} className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-pink-600">{stylist.name}</h3>
            <p className="text-gray-700 italic">{stylist.specialization}</p>
            <p className="mt-2 text-sm text-gray-600">{stylist.bio}</p>
            <div className="mt-4">
              <h4 className="font-medium text-sm text-gray-800">Experience:</h4>
              <p className="text-sm text-gray-600">{stylist.experience} years</p>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-sm text-gray-800">Services:</h4>
              <ul className="list-disc ml-5 text-sm text-gray-600">
                {stylist.services && stylist.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            {stylist.is_available && (
              <div className="mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Available
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
