import React, { useState, useEffect } from 'react';
import { submitServiceRequest, getSoftwareServices } from '../../api/SoftwareServices';
import { useNavigate } from 'react-router-dom';
const SoftwareServicesForm = () => {
  
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    service: '', // Will be set when services are loaded
    project_title: '',
    project_description: '',
    budget: '',
    timeline: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate= useNavigate();

  // Navigate to software projects page
  useEffect(() => {
    if (success) {
    const timer= setTimeout(() => { navigate('/dashboard/software-projects');}, 2000);

    return () => clearTimeout(timer);
    
     
    }
  }, [success, navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getSoftwareServices();
        setServices(response.data);
        if (response.data.length > 0) {
          setFormData(prevData => ({
            ...prevData,
            service: response.data[0].id
          }));
        }
      } catch (err) {
        console.error('something went wrong when fetching services:', err);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await submitServiceRequest(formData);
      console.log('Software service request submitted:', response);
      setSuccess(true);
      // Reset form
      setFormData({
        service: services.length > 0 ? services[0].id : '', 
        project_title: '',
        project_description: '',
        budget: '',
        timeline: '',
      });
    } catch (err) {
      setError('was unable to submit request. Please try again.');
      console.error('Error submitting software service request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Your software service request has been submitted successfully! We'll contact you soon.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          name="project_title"
          value={formData.project_title}
          onChange={handleInputChange}
          placeholder="Project Title" 
          className="p-3 border rounded" 
          required 
        />
        <input 
          type="number" 
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          placeholder="Estimated Budget" 
          className="p-3 border rounded" 
        />
      </div>
      <select 
        name="service"
        value={formData.service}
        onChange={handleInputChange}
        className="w-full p-3 border rounded"
        required
      >
        <option value="">Select Service</option>
        {services.map(service => (
          <option key={service.id} value={service.id}>{service.title}</option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          name="timeline"
          value={formData.timeline}
          onChange={handleInputChange}
          placeholder="Timeline" 
          className="p-3 border rounded" 
        />
      </div>
      <textarea 
        name="project_description"
        value={formData.project_description}
        onChange={handleInputChange}
        placeholder="Project Description" 
        rows="4" 
        className="w-full p-3 border rounded"
        required
      ></textarea>
      <button 
        type="submit" 
        disabled={submitting}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting Request...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default SoftwareServicesForm;