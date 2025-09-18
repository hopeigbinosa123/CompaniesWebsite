import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';

function CourseLessonsPage() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/courses/${id}/lessons/`)
      .then(res => {
        setLessons(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (loading) return <p>Loading lessons...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Course Lessons</h2>
      <ul className="space-y-4">
        {lessons.map(lesson => (
          <li key={lesson.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-bold">{lesson.title}</h3>
            <p className="text-gray-600">{lesson.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseLessonsPage;
