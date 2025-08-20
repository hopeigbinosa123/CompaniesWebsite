import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log('Fetching course with ID:', id);
        const response = await fetch(`${process.env.REACT_APP_API_URL}education/courses/${id}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched course:', data);
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
      <img
        src={course.imageUrl || '/placeholder.jpg'}
        alt={course.title}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <p className="text-gray-700 mb-2">{course.description}</p>
      <p className="text-sm text-gray-500">Category: {course.category}</p>

      {Array.isArray(course.tags) && course.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {course.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;