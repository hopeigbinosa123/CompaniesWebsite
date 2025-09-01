// src/api/education.js
import api from './axiosConfig';

export const fetchCourses = () => api.get('/education/courses/');
export const enrollInCourse = (courseId) => api.post('/enroll/', { course_id: courseId });
export const getMyEnrollments = () => api.get('/my-enrollments/');
export const fetchCourseDetail = (id) => api.get(`/courses/${id}/`);
export const fetchCourseLessons = (id) => api.get(`/courses/${id}/lessons/`);

