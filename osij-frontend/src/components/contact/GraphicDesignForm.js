import { useState } from 'react';
import { graphicDesignAPI, orderHelpers } from '../../api/graphicDesign';

const GraphicDesignForm = () => {
  //form data
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    design_type: '',
    description: ''
  });
  //form states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  //design types
  const designTypes = ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Print Materials', 'Website Design', 'Other'];
   //handles change
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const errors = orderHelpers.validateOrderForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      setLoading(true);
      const response = await graphicDesignAPI.createOrder(formData);
      console.log('Order created successfully:', response);
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        email: '',
        design_type: '',
        description: ''
      });
      setValidationErrors({});
      
    } catch (err) {
      console.error('Order creation error:', err);
      
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
        setError(err.message || 'Failed to submit order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        <h3 className="font-semibold mb-2">Order Submitted Successfully!</h3>
        <p className="text-sm">Thank you for your graphic design request. We'll review your order and get back to you soon.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-3 text-green-700 hover:text-green-800 underline text-sm"
        >
          Submit Another Order
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
        <label className="block text-sm font-medium mb-2">Project Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter project title"
          className={`w-full p-3 border rounded ${validationErrors.title ? 'border-red-500' : ''}`}
        />
        {validationErrors.title && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
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
        <label className="block text-sm font-medium mb-2">Design Type *</label>
        <select
          name="design_type"
          value={formData.design_type}
          onChange={handleChange}
          className={`w-full p-3 border rounded ${validationErrors.design_type ? 'border-red-500' : ''}`}
        >
          <option value="">Select Design Type</option>
          {designTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {validationErrors.design_type && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.design_type}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Project Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your project requirements, preferences, and any specific details..."
          rows="4"
          className={`w-full p-3 border rounded ${validationErrors.description ? 'border-red-500' : ''}`}
        />
        {validationErrors.description && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded font-medium ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
      >
        {loading ? 'Submitting...' : 'Request Quote'}
      </button>
    </form>
  );
};

export default GraphicDesignForm;