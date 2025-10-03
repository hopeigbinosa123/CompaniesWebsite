import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const coursePromise = api.get(`/education/courses/${id}/`);
        const lessonsPromise = api.get(`/education/courses/${id}/lessons/`);
        
        let enrollmentsPromise;
        if (isAuthenticated) {
          enrollmentsPromise = api.get('/education/my-enrollments/');
        } else {
          enrollmentsPromise = Promise.resolve({ data: [] });
        }

        const [courseRes, lessonsRes, enrollmentsRes] = await Promise.all([
          coursePromise,
          lessonsPromise,
          enrollmentsPromise,
        ]);

        setCourse(courseRes.data);
        setLessons(lessonsRes.data);

        const userIsEnrolled = enrollmentsRes.data.some(enrollment => enrollment.course.toString() === id);
        setIsEnrolled(userIsEnrolled);

      } catch (err) {
        console.error(err);
        setError('Failed to load course details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchData();
    }
  }, [id, isAuthenticated, authLoading]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/education/courses/${id}` } });
      return;
    }
    // Navigate to payment page, passing course info
    navigate('/dashboard/payment', { 
      state: { 
        course: {
          id: course.id,
          title: course.title,
          price: course.price,
          description: course.description
        }
      } 
    });
  };

  if (loading || authLoading) return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
  if (error) return <ErrorMessage message={error} />;
  if (!course) return <ErrorMessage message="Course not found." />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative bg-white p-8 rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>Instructor: <span className="font-medium text-gray-700">{course.instructor_name || 'N/A'}</span></span>
              <span className="mx-2">|</span>
              <span>Duration: <span className="font-medium text-gray-700">{course.duration || 'Self-paced'}</span></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Lesson List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lessons</h2>
            <ul className="space-y-3">
              {lessons.length > 0 ? lessons.map(lesson => (
                <li key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-800">{lesson.title}</p>
                    <span className="text-xs text-gray-500 uppercase">{lesson.lesson_type}</span>
                  </div>
                  {isEnrolled ? (
                    <span className={`text-sm font-semibold ${lesson.is_completed ? 'text-green-500' : 'text-gray-400'}`}>
                      {lesson.is_completed ? '✓ Completed' : 'Incomplete'}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Enroll to view</span>
                  )}
                </li>
              )) : <p className="text-gray-500">No lessons available for this course yet.</p>}
            </ul>
          </div>

          {/* Right Column: Action Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
              <img src={course.thumbnail_url || 'https://via.placeholder.com/400x225'} alt={course.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-gray-800">${course.price}</span>
              </div>
              {isEnrolled ? (
                <Link 
                  to={`/education/courses/${id}/lessons`}
                  className="w-full text-center bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Go to Lessons
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
