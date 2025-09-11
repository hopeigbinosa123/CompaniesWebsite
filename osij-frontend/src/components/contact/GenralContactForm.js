import { useState } from 'react';
import { contactAPIEndpoints, contactFormHelpers } from '../../api/contact';
 // General Contact Form Component
const GeneralContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contact_type: 'general'
  });
  // State variables for form submission
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Handles form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error when user starts typing
    if (error) setError('');
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const errors = contactFormHelpers.validateContactForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await contactAPIEndpoints.submitContactForm(formData);
      console.log('Contact form submitted successfully:', response);
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contact_type: 'general'
      });
      setValidationErrors({});
      
    } catch (err) {
      console.error('Contact form submission error:', err);
      
      if (err.response?.data) {
        // Handle backend validation errors
        const backendErrors = {};
        Object.keys(err.response.data).forEach(key => {
          backendErrors[key] = err.response.data[key][0] || err.response.data[key];
        });
        setValidationErrors(backendErrors);
        setError('Please fix the errors below and try again.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        setError(err.message || 'Failed to submit message. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        <h3 className="font-semibold mb-2">Message Sent Successfully!</h3>
        <p className="text-sm">Thank you for contacting us. We'll get back to you as soon as possible.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-3 text-green-700 hover:text-green-800 underline text-sm"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-2">Your Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={`w-full p-3 border rounded ${validationErrors.name ? 'border-red-500' : ''}`}
        />
        {validationErrors.name && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Your Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={`w-full p-3 border rounded ${validationErrors.email ? 'border-red-500' : ''}`}
        />
        {validationErrors.email && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Subject *</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this regarding?"
          className={`w-full p-3 border rounded ${validationErrors.subject ? 'border-red-500' : ''}`}
        />
        {validationErrors.subject && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.subject}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Your Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe your inquiry in detail..."
          rows="4"
          className={`w-full p-3 border rounded ${validationErrors.message ? 'border-red-500' : ''}`}
        />
        {validationErrors.message && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded font-medium ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default GeneralContactForm;