import React, { useState } from 'react';
import { enrollInCourse } from '../../api/enrollments';

const EnrollmentForm = ({ courseId, onEnrollSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit enrollment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await enrollInCourse({ ...formData, courseId });
      setSuccess(true);
      setFormData({ name: '', email: '', paymentMethod: '' });
      if (onEnrollSuccess) onEnrollSuccess(); // Optional callback
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="enrollment-form bg-white p-6 rounded shadow space-y-4"
      onSubmit={handleSubmit}
    >
      <label className="block">
        <span className="text-sm font-medium">Name:</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Email:</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Payment Method:</span>
        <input
          type="text"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Enrolling...' : 'Enroll'}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">Error: {error}</p>}
      {success && <p className="text-green-600 text-sm mt-2">Enrollment successful!</p>}
    </form>
  );
};

export default EnrollmentForm;