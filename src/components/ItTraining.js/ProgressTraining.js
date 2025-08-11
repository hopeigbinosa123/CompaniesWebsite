import React from 'react';

const ProgressTracker = ({ course }) => {
  return (
    <div className="progress-tracker">
      <h3>{course.title}</h3>
      <p>Completed modules: {course.completedModules}/{course.totalModules}</p>
      <p>Completed quizzes: {course.completedQuizzes}/{course.totalQuizzes}</p>
      <p>Completed assignments: {course.completedAssignments}/{course.totalAssignments}</p>
      <div className="progress-bar" style={{ width: `${(course.completedModules / course.totalModules) * 100}%` }} />
    </div>
  );
};

export default ProgressTracker;