import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { FaPaintBrush, FaExclamationCircle } from 'react-icons/fa';

const StudentDashboard = () => {
    const [designOrders, setDesignOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDesignOrders = async () => {
            try {
                const response = await apiClient.get('/api/graphic-design/orders/my/');
                setDesignOrders(response.data);
            } catch (err) {
                setError('Failed to load design orders.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDesignOrders();
    }, []);

    const DashboardCard = ({ title, icon, children }) => (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
                <div className="text-2xl text-purple-500 mr-4">{icon}</div>
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <div>{children}</div>
        </div>
    );

    const EmptyState = ({ message, link, linkText }) => (
        <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg">
            <p className="text-gray-500 mb-4">{message}</p>
            {link && linkText && (
                <Link to={link} className="text-purple-500 hover:underline font-semibold">
                    {linkText}
                </Link>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-red-500">
                <FaExclamationCircle className="text-3xl mb-3" />
                <p className="text-lg">{error}</p>
            </div>
        );
    }

    return (
        <DashboardCard title="My Design Orders" icon={<FaPaintBrush />}>
            {designOrders.length > 0 ? (
                <ul className="space-y-4">
                    {designOrders.map(order => (
                        <li key={order.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-800">Order #{order.id} - {order.service_name}</p>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{order.brief}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <EmptyState message="You have no design orders." link="/graphic-design" linkText="Explore Design Services" />
            )}
        </DashboardCard>
    );
};

export default StudentDashboard;