import React from 'react';

const CourseDetails = ({ course }) => {
  return (
    <div className="course-details">
      <img src={course.imageUrl} alt={course.title} />
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Duration: {course.duration} hours</p>
      <p>Instructor: {course.instructor}</p>
      <h3>Course Syllabus:</h3>
      <ul>
        {course.syllabus.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;