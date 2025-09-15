import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

export default function GraphicDesignPage() {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/graphic-design/public/designers/')
      .then(res => {
        console.log('Fetched designers:', res.data);
        setDesigners(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch designers:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Graphic Design Services</h1>
      <p className="mb-6 text-gray-700">
        Welcome to our graphic design section. Browse designers and place your order.
      </p>

      {loading ? (
        <p>Loading designers...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designers
            .filter(designer => designer.is_active)
            .map(designer => (
              <div key={designer.id} className="border p-4 rounded shadow hover:shadow-md transition">
                <h2 className="text-xl font-semibold">{designer.name}</h2>
                <p className="text-gray-600">{designer.speciality}</p>
                <Link
                  to={`/graphic-design/order/${designer.id}`}
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Order from {designer.name}
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
