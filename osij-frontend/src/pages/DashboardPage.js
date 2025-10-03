
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import StudentDashboard from '../Graphics design/StudentDashboard'; // Corrected import path
import { FaBook, FaChalkboardTeacher, FaShoppingCart, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';

const DashboardPage = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await apiClient.get('/api/dashboard/');
                setDashboardData(response.data);
            } catch (err) {
                setError('Failed to load dashboard data. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-red-500">
                <FaExclamationCircle className="text-4xl mb-4" />
                <p className="text-xl">{error}</p>
            </div>
        );
    }

    const { enrolled_courses, upcoming_live_sessions, recent_orders, booked_appointments } = dashboardData;

    const DashboardCard = ({ title, icon, children }) => (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
                <div className="text-2xl text-blue-500 mr-4">{icon}</div>
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            </div>
            <div>{children}</div>
        </div>
    );

    const EmptyState = ({ message, link, linkText }) => (
        <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg">
            <p className="text-gray-500 mb-4">{message}</p>
            {link && linkText && (
                <Link to={link} className="text-blue-500 hover:underline font-semibold">
                    {linkText}
                </Link>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Your Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DashboardCard title="Enrolled Courses" icon={<FaBook />}>
                        {enrolled_courses && enrolled_courses.length > 0 ? (
                            <ul className="space-y-4">
                                {enrolled_courses.map(course => (
                                    <li key={course.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <Link to={`/courses/${course.id}`} className="font-semibold text-blue-600 hover:underline">{course.title}</Link>
                                        <p className="text-sm text-gray-600">{course.description}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <EmptyState message="You are not enrolled in any courses yet." link="/education" linkText="Browse Courses" />
                        )}
                    </DashboardCard>

                    <DashboardCard title="Upcoming Live Sessions" icon={<FaChalkboardTeacher />}>
                        {upcoming_live_sessions && upcoming_live_sessions.length > 0 ? (
                            <ul className="space-y-4">
                                {upcoming_live_sessions.map(session => (
                                    <li key={session.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <p className="font-semibold text-gray-800">{session.title}</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(session.start_time).toLocaleString()} - {new Date(session.end_time).toLocaleString()}
                                        </p>
                                        <a href={session.zoom_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Join Session</a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <EmptyState message="No upcoming live sessions." />
                        )}
                    </DashboardCard>

                    <DashboardCard title="Recent Orders" icon={<FaShoppingCart />}>
                        {recent_orders && recent_orders.length > 0 ? (
                            <ul className="space-y-4">
                                {recent_orders.map(order => (
                                    <li key={order.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <p className="font-semibold text-gray-800">Order #{order.id}</p>
                                        <p className="text-sm text-gray-600">Status: <span className={`font-medium ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                                        <p className="text-sm text-gray-600">Total: ${order.total_price}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <EmptyState message="You have no recent orders." link="/services" linkText="Browse Services" />
                        )}
                    </DashboardCard>

                    <DashboardCard title="Booked Appointments" icon={<FaCalendarAlt />}>
                        {booked_appointments && booked_appointments.length > 0 ? (
                            <ul className="space-y-4">
                                {booked_appointments.map(appointment => (
                                    <li key={appointment.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <p className="font-semibold text-gray-800">{appointment.service_name}</p>
                                        <p className="text-sm text-gray-600">With: {appointment.stylist_name}</p>
                                        <p className="text-sm text-gray-600">On: {new Date(appointment.date_time).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <EmptyState message="You have no upcoming appointments." link="/cosmetology" linkText="Book an Appointment" />
                        )}
                    </DashboardCard>
                </div>

                <div className="mt-8">
                    <StudentDashboard />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
