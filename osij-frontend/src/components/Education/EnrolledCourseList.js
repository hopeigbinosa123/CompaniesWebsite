import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyEnrollments } from '../../api/education';
import PayPalButton from '../../components/payment/PayPalButton';

const EnrolledCoursesList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    getMyEnrollments()
      .then(res => {
        setEnrollments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const handlePaymentSuccess = (enrollmentId, paymentData) => {
    // Update enrollment status upon successful payment
    setEnrollments(prev => prev.map(e => 
      e.id === enrollmentId 
        ? { ...e, payment_status: 'completed' }
        : e
    ));
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    // You could add error state handling here if needed
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-100 text-green-800';
    if (progress >= 50) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                  {enrollment.course_price && (
                    <p className="text-sm font-medium text-gray-800">Price: ${enrollment.course_price}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getProgressColor(enrollment.progress)}`}>
                    {enrollment.progress}% Complete
                  </span>
                  {enrollment.payment_status && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(enrollment.payment_status)}`}>
                      {enrollment.payment_status}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${enrollment.progress}%` }}
                ></div>
              </div>
              {enrollment.payment_status !== 'completed' && (
                <div className="mt-3">
                  <PayPalButton
                    amount={enrollment.course_price || 10.00}
                    currency="USD"
                    onSuccess={(paymentData) => handlePaymentSuccess(enrollment.id, paymentData)}
                    onError={handlePaymentError}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesList;