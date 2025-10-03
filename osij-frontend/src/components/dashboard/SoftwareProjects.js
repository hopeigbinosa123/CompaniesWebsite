
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

const SoftwareProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiClient.get('/software-services/requests/me/');
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

    const handleDeleteProject = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await apiClient.delete(`/software-services/requests/${projectId}/delete/`);
                setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
            } catch (err) {
                console.error(err);
                setError('Failed to delete project. Please try again later.');
            }
        }
    };

    if (loading) return <div className="flex justify-center items-center"><LoadingSpinner /></div>;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Software Projects</h2>
            {projects.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 text-lg">You haven't submitted any software service requests yet.</p>
                    <p className="text-gray-500 mt-2">Start by requesting a service from our <Link to="/software-services" className="text-blue-600 hover:underline">Software Services page</Link>.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-green-700 mb-2">{project.project_title}</h3>
                            <p className="text-gray-600 mb-3"><strong>Service:</strong> {project.service_name}</p>
                            <p className="text-gray-700 mb-4">{project.project_description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                                <span>Status: <span className="font-medium text-green-600 uppercase">{project.status}</span></span>
                                <span>Submitted: {new Date(project.created_at).toLocaleDateString()}</span>
                                <button onClick={() => handleDeleteProject(project.id)} className="text-red-500 hover:underline">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SoftwareProjects;
