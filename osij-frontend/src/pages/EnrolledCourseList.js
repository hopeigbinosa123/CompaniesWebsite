import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

function EnrolledCoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/education/my-enrollments/')
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <p>Loading your courses...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Enrolled Courses</h2>
      <ul className="space-y-4">
        {courses.map(course => (
          <li key={course.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <Link
              to={`/education/courses/${course.id}/lessons`}
              className="text-blue-600 hover:underline"
            >
              View Lessons
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnrolledCoursesList;