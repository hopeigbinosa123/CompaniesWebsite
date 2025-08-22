import React, { useEffect, useState } from 'react';
import CourseCard from '../components/ittraining/CourseCard';

const DashboardPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div className="dashboard">
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;