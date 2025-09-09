import api from '../../api/axiosConfig'; // Add this import
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

  async function handleSubmit(e) { // Make it async
    e.preventDefault();

    const errors = {};
    if (!formData.name) errors.name = 'Name is required'; // This 'name' is for display, backend uses authenticated user
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.type) errors.type = 'Design type is required';
    if (!formData.details) errors.details = 'Details are required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    setFormErrors({});

    try {
      const payload = {
        email: formData.email,
        title: formData.name, // Using name as title for now, can be changed
        design_type: formData.type,
        description: formData.details,
      };
      
      await api.post('/graphic-design/orders/', payload); // Send to backend
      setSubmitted(true);
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        type: '',
        details: '',
      });
    } catch (error) {
      console.error('Error submitting design request:', error.response?.data || error);
      setFormErrors({ general: error.response?.data?.detail || 'Failed to submit request.' });
      setSubmitted(false); // Reset submitted state on error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl tracking-tight">
            Welcome to Osij Design Studio
          </h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-sm text-white/90">
            Submit your creative ideas and let our team bring them to life. Logos, banners, thumbnails — we’ve got you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="min-h-screen bg-gradient-to-br from-osijPurple/10 via-white to-osijPink/10 flex items-center justify-center px-4 py-24">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-xl w-full border border-gray-200 animate-fade-in">
          <h2 className="text-4xl font-black text-center text-osijPurple mb-8 flex items-center justify-center gap-2 tracking-tight">
            <span>🎨</span> Submit a Design Request
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center shadow-md animate-fade-in font-medium">
              ✅ Your design request has been submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <FormField
              label="Your Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Prince M."
              error={formErrors.name}
            />

            {/* Email */}
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. prince@example.com"
              error={formErrors.email}
            />

            {/* Design Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-1">
                Design Type
              </label>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${
                  formErrors.type ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-osijPurple hover:border-osijPurple/50'
                }`}
              >
                <option value="">Select a type</option>
                <option value="Logo">Logo</option>
                <option value="Banner">Banner</option>
                <option value="Thumbnail">Thumbnail</option>
                <option value="Web Design">Web Design</option>
              </select>
              {formErrors.type && <p className="text-red-500 text-sm mt-1">{formErrors.type}</p>}
            </div>

            {/* Details */}
            <div>
              <label htmlFor="details" className="block text-sm font-semibold text-gray-700 mb-1">
                Project Details
              </label>
              <textarea
                name="details"
                id="details"
                value={formData.details}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your design idea in terms of colors, fonts, style and more."
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 resize-none transition duration-200 ${
                  formErrors.details ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-osijPurple hover:border-osijPurple/50'
                }`}
              ></textarea>
              {formErrors.details && <p className="text-red-500 text-sm mt-1">{formErrors.details}</p>}
            </div>

            {/* Submit Button */}
            <OsijButton
              label={isLoading ? 'Submitting...' : 'Submit Request'}
              type="submit"
              disabled={isLoading}
            />
          </form>
        </div>
      </section>
    </>
  );
}

// Reusable FormField Component
function FormField({ label, name, type, value, onChange, placeholder, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-osijPurple hover:border-osijPurple/50'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default DesignOrderForm;

// This form will POST to the backend once the API is ready.
// Fields: name, email, design type, project details
// TODO: Connect to /api/design-request/ when backend is live














