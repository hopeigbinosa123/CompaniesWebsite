import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const EnrolledCoursesList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    // Simulate API call - replace with actual API call
    setTimeout(() => {
      setEnrollments([
        { id: 1, course_title: 'Web Development Basics', progress: 75, enrolled_at: '2024-01-15' },
        { id: 2, course_title: 'Advanced React', progress: 30, enrolled_at: '2024-02-01' }
      ]);
      setLoading(false);
    }, 1000);
  }, [token]);

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-100 text-green-800';
    if (progress >= 50) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  if (loading) return <div>Loading your courses...</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">My Enrolled Courses</h3>
      {enrollments.length === 0 ? (
        <p className="text-gray-600">You are not enrolled in any courses yet.</p>
      ) : (
        <div className="space-y-3">
          {enrollments.map(enrollment => (
            <div key={enrollment.id} className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{enrollment.course_title}</h4>
                  <p className="text-sm text-gray-600">Enrolled on: {new Date(enrollment.enrolled_at).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getProgressColor(enrollment.progress)}`}>
                  {enrollment.progress}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${enrollment.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesList;