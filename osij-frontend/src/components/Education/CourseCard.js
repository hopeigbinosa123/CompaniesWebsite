import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { enrollInCourse } from '../../api/education';

const CourseCard = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await enrollInCourse(course.id);
      alert('Successfully enrolled in the course!');
      // You can redirect or update state here
    } catch (error) {
      console.error('Enrollment error:', error);
      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert('Failed to enroll. Please try again.');
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

        <button
          onClick={handleEnroll}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enrolling...' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;