import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig'; // Import the configured axios instance
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

export default function StylistList() {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await api.get('/cosmetology/stylists/');
        setStylists(response.data);
      } catch (err) {
        setError('Something went wrong. Was unable to load stylists.');
        console.error('Error fetching stylists:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStylists();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Stylists</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {stylists.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">No stylists available.</p>
        ) : (
          stylists.map((stylist) => (
            <div key={stylist.id} className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-pink-600">{stylist.user.username}</h3> {/* Assuming stylist.user.username for name */}
              <p className="text-gray-700 italic">{stylist.specialization}</p>
              <p className="mt-2 text-sm text-gray-600">{stylist.bio}</p>
              <div className="mt-4">
                <h4 className="font-medium text-sm text-gray-800">Experience:</h4>
                <p className="text-sm text-gray-500">{stylist.experience} years</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}