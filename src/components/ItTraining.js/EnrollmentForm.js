import React, { useState } from 'react';
//this is the enrollment form where the student will enroll
const EnrollmentForm = ({ onEnroll }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnroll(formData);
  };

  return (
    <form className="enrollment-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Payment Method:
        <input type="text" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} />
      </label>
      <button type="submit">Enroll</button>
    </form>
  );
};

export default EnrollmentForm;