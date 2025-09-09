// src/api/education.js
import api from './axiosConfig';

export const fetchCourses = () => api.get('/education/courses/');
export const enrollInCourse = (courseId) => api.post('/education/enroll/', { course_id: courseId });
export const getMyEnrollments = () => api.get('/education/my-enrollments/');
export const fetchCourseDetail = (id) => api.get(`/education/courses/${id}/`);
export const fetchCourseLessons = (id) => api.get(`/education/courses/${id}/lessons/`);
