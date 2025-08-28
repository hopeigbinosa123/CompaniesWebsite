// src/pages/EducationPage.jsx
import { useState, useEffect } from 'react';
import { fetchCourses } from '../api/education';
import  CourseCard  from '../components/Education/CourseCard';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const EducationPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response.data); // Assuming your API returns an array
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4">
      <h1>IT Training Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default EducationPage;