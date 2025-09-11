import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { enrollInCourse } from '../../api/education';

const CourseCard = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    // Wait for auth to finish loading
    if (authLoading) {
      setError('Please wait while we verify your authentication...');
      return;
    }

    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          redirectTo: '/dashboard/payment',
          courseData: {
            id: course.id,
            title: course.title,
            price: course.price || 10.00,
            description: course.description
          }
        } 
      });
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await enrollInCourse(course.id);
      // Redirect to payment page with course data
      navigate('/dashboard/payment', { 
        state: { 
          course: {
            id: course.id,
            title: course.title,
            price: course.price || 10.00,
            description: course.description
          }
        } 
      });
    } catch (error) {
      console.error('Enrollment error:', error);
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        setError('Unable to connect to the server. Please make sure the backend is running.');
      } else if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else {
        setError('Failed to enroll. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <span className="text-white text-2xl font-bold">{course.title.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">${course.price || 0}</span>
          <span className="text-sm text-gray-500">{course.duration || 'Self-paced'}</span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleEnroll}
          disabled={loading || authLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enrolling...' : authLoading ? 'Checking Auth...' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;