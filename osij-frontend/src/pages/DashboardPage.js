import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EnrolledCoursesList from '../components/Education/EnrolledCourseList'; // Import the new component

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.first_name || user?.username}!</h1>
          <p className="text-gray-600">Here's an overview of your activities.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - IT Training */}
          <div className="space-y-8">
            {/* Courses Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-600">IT Training</h2>
                <Link 
                  to="/education" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  Browse All Courses
                </Link>
              </div>
              <EnrolledCoursesList /> {/* This shows the user's courses */}
            </div>

            {/* Quick Stats or Notifications could go here later */}
          </div>

          {/* Right Column - Projects */}
          <div className="space-y-8">
            {/* Software Services Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-green-600">Software Services</h2>
              <p className="text-gray-600 mb-4">Track your development projects and requests.</p>
              <Link 
                to="/dashboard/software-projects"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View My Projects
              </Link>
            </div>

            {/* Graphic Design Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-purple-600">Graphic Design</h2>
              <p className="text-gray-600 mb-4">Check the status of your design orders.</p>
              <Link 
                to="/dashboard/design-orders"
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                View My Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Cosmetology Note */}
        <div className="mt-12 bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
          <h3 className="font-semibold text-blue-800 mb-2">Cosmetology Bookings</h3>
          <p className="text-blue-700">
            Your appointments are managed via email and SMS confirmations. No login is needed to book. 
            <Link to="/cosmetology" className="ml-2 text-blue-600 hover:underline font-medium">Book a new appointment →</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;