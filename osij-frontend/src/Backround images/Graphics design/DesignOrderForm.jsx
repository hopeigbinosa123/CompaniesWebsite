import React, { useState } from 'react';
import OsijButton from './OsijButton';

function DesignOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    details: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.type) errors.type = 'Design type is required';
    if (!formData.details) errors.details = 'Details are required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setFormErrors({});

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setIsLoading(false);
      setFormData({
        name: '',
        email: '',
        type: '',
        details: '',
      });
    }, 1500);
  }

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Request a Design</h2>
        
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            Your design request has been submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded mt-1 ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g. Prince M."
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded mt-1 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="e.g. prince@example.com"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          {/* Design Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Design Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full p-2 border rounded mt-1 ${formErrors.type ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a design type</option>
              <option value="Logo">Logo Design</option>
              <option value="Flyer">Flyer Design</option>
              <option value="Business Card">Business Card</option>
              <option value="Social Media">Social Media Graphics</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.type && (
              <p className="mt-1 text-sm text-red-600">{formErrors.type}</p>
            )}
          </div>

          {/* Project Details */}
          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">
              Project Details *
            </label>
            <textarea
              id="details"
              name="details"
              rows="4"
              value={formData.details}
              onChange={handleChange}
              className={`w-full p-2 border rounded mt-1 ${formErrors.details ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Describe your project requirements, preferred colors, style, etc."
            ></textarea>
            {formErrors.details && (
              <p className="mt-1 text-sm text-red-600">{formErrors.details}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DesignOrderForm;












