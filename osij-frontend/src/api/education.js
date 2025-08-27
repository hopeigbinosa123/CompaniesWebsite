import api from './axiosConfig';

// Fetch all courses (for browsing - public)
export const fetchCourses = () => {
  return api.get('/education/courses/');
};

// Fetch courses the user is enrolled in (private - requires login)
export const fetchMyEnrollments = () => {
  return api.get('/education/my-enrollments/'); // Your Django endpoint for user-specific enrollments
};

// Enroll in a course
export const enrollInCourse = (courseId) => {
  return api.post(`/education/courses/${courseId}/enroll/`);
};