import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.imageUrl} alt={course.title} />
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <Link to={`/courses/${course.id}`}>View Course</Link>
    </div>
  );
};

export default CourseCard;