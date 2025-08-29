import { useState, useEffect } from 'react';
import { fetchCourses } from '../api/education';
import CourseCard from '../components/Education/CourseCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ErrorMessage from '../components/shared/ErrorMessage'; // Create this component

const EducationPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response.data);
      } catch (error) {
        setError('Failed to load courses. Please try again later.');
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">IT Training Courses</h1>
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationPage;