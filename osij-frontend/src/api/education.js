import api from './axiosConfig';

// Fetch all courses
export const fetchCourses = () => {
  return api.get('/education/courses/'); // Now calls /api/education/courses/
};

// Enroll in a course
export const enrollInCourse = (courseId) => {
  return api.post('/education/enrollments/', { course: courseId });
};

// Get user's enrollments
export const getMyEnrollments = () => {
  return api.get('/education/my-enrollments/');
};