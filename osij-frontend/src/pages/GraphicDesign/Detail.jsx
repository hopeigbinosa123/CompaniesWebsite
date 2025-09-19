import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import ErrorMessage from '../../components/shared/ErrorMessage';

const DesignerDetailPage = () => {
  const { id } = useParams();
  const [designer, setDesigner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const response = await api.get(`/graphic-design/public/designers/${id}/`);
        setDesigner(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load designer details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDesigner();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;
  if (!designer) return <ErrorMessage message="Designer not found." />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex mb-8">
          <div className="md:w-1/3">
            <img 
              src={designer.image || 'https://via.placeholder.com/400x400'} 
              alt={designer.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{designer.name}</h1>
            <p className="text-xl text-blue-600 font-semibold mb-4">{designer.speciality}</p>
            <p className="text-gray-600 mb-6">{designer.bio || 'No biography available.'}</p>
            <div className="flex space-x-4">
              <Link 
                to={`/graphic-design/order/${designer.id}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Order a Design from {designer.name}
              </Link>
              {designer.portfolio_url && (
                <a href={designer.portfolio_url} target="_blank" rel="noopener noreferrer" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                  View External Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Gallery */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Portfolio</h2>
          {designer.portfolios && designer.portfolios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designer.portfolios.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-700">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No portfolio items have been uploaded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignerDetailPage;
