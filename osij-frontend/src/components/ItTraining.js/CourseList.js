import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return <p className="text-center text-gray-500">No courses available.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;