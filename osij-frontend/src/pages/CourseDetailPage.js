import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/courses/${id}/`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleEnroll = () => {
    api.post(`/enroll/`, { course_id: id })
      .then(() => navigate('/dashboard/my-courses'))
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading course...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-4 text-gray-700">{course.description}</p>
      <button
        onClick={handleEnroll}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enroll Now
      </button>
    </div>
  );
}

export default CourseDetailPage;