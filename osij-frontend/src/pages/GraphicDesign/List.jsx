import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import ErrorMessage from '../../components/shared/ErrorMessage';

const DesignerCard = ({ designer }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
    <Link to={`/graphic-design/designers/${designer.id}`}>
      <img 
        src={designer.image || 'https://via.placeholder.com/400x300'} 
        alt={designer.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{designer.name}</h3>
        <p className="text-sm text-blue-600 font-medium">{designer.speciality}</p>
      </div>
    </Link>
  </div>
);

const DesignerListPage = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await api.get('/graphic-design/public/designers/');
        setDesigners(response.data.results || response.data); // Adjust based on pagination
      } catch (err) {
        console.error(err);
        setError('Failed to load designers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDesigners();
  }, []);

  if (loading) return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Our Designers</h1>
          <p className="text-lg text-gray-600 mt-2">Creative professionals ready to bring your vision to life.</p>
        </div>
        {designers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {designers.map(designer => (
              <DesignerCard key={designer.id} designer={designer} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No designers are available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default DesignerListPage;