import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';

const SoftwareProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/software-services/requests/me/');
        setProjects(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load your software projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">My Software Projects</h1>

        {projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">You haven't submitted any software service requests yet.</p>
            <p className="text-gray-500 mt-2">Start by requesting a service from our <a href="/software-services" className="text-blue-600 hover:underline">Software Services page</a>.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-700 mb-2">{project.project_title}</h2>
                <p className="text-gray-600 mb-3"><strong>Service:</strong> {project.service_name}</p>
                <p className="text-gray-700 mb-4">{project.project_description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                  <span>Status: <span className="font-medium text-green-600 uppercase">{project.status}</span></span>
                  <span>Submitted: {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftwareProjectsPage;
