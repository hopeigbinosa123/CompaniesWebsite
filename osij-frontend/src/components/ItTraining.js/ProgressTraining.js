import React, { useEffect, useState } from 'react';
import { fetchProgress } from '../../api/progress';

const ProgressTraining = ({ courseId, userId }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProgress(courseId, userId)
      .then(setProgress)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [courseId, userId]);

  if (loading) return <p>Loading progress...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!progress) return <p>No progress data available.</p>;

  const {
    title,
    completedModules,
    totalModules,
    completedQuizzes,
    totalQuizzes,
    completedAssignments,
    totalAssignments,
  } = progress;

  const modulePercent = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="progress-tracker bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">Modules: {completedModules}/{totalModules}</p>
      <p className="text-sm text-gray-600">Quizzes: {completedQuizzes}/{totalQuizzes}</p>
      <p className="text-sm text-gray-600">Assignments: {completedAssignments}/{totalAssignments}</p>
      <div className="mt-4 bg-gray-200 rounded h-4 overflow-hidden">
      <div className="bg-blue-600 h-full" style={{ width: `${modulePercent}%` }} />
      </div>
        <span className="text-sm text-gray-500 mt-1 block">{modulePercent}% Complete</span>
    </div>

  );
};

export default ProgressTraining;
