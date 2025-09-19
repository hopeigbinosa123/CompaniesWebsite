import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const GraphicDesignOrderForm = () => {
  const { id: designerId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    brief: '',
    budget: '',
  });
  const [referenceFile, setReferenceFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setReferenceFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setStatus({ loading: true, error: null, success: null });

    const submissionData = new FormData();
    submissionData.append('title', formData.title);
    submissionData.append('brief', formData.brief);
    if (formData.budget) {
      submissionData.append('budget', formData.budget);
    }
    if (designerId) {
        submissionData.append('designer', designerId);
    }
    if (referenceFile) {
      submissionData.append('reference_files', referenceFile);
    }

    try {
      // Note: The ViewSet default create URL is typically the resource root.
      await api.post('/graphic-design/design-orders/', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus({ loading: false, error: null, success: 'Your order has been submitted successfully!' });
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, error: 'Failed to submit order. Please check your input and try again.', success: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Place a New Design Order</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Order Title</label>
              <input type="text" name="title" id="title" required value={formData.title} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="brief" className="block text-sm font-medium text-gray-700">Project Brief</label>
              <textarea name="brief" id="brief" required rows="6" value={formData.brief} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget (Optional)</label>
              <input type="number" name="budget" id="budget" value={formData.budget} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="reference_files" className="block text-sm font-medium text-gray-700">Reference File (Optional)</label>
              <input type="file" name="reference_files" id="reference_files" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            
            {status.error && <div className="text-red-600 bg-red-100 p-3 rounded-md">{status.error}</div>}
            {status.success && <div className="text-green-600 bg-green-100 p-3 rounded-md">{status.success}</div>}

            <div>
              <button type="submit" disabled={status.loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
                {status.loading ? 'Submitting...' : 'Submit Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GraphicDesignOrderForm;