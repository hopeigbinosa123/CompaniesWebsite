import { useState } from 'react';

const SoftwareServicesForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    project_type: '',
    budget: '',
    timeline: '',
    description: ''
  });

  const projectTypes = ['Web Development', 'Mobile App', 'Custom Software', 'API Integration', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Software service request:', formData);
    // Add API call here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Your Name" className="p-3 border rounded" />
        <input type="text" placeholder="Company Name" className="p-3 border rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="email" placeholder="Email" className="p-3 border rounded" />
        <input type="tel" placeholder="Phone" className="p-3 border rounded" />
      </div>
      <select className="w-full p-3 border rounded">
        <option value="">Select Project Type</option>
        {projectTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Estimated Budget" className="p-3 border rounded" />
        <input type="text" placeholder="Timeline" className="p-3 border rounded" />
      </div>
      <textarea placeholder="Project Description" rows="4" className="w-full p-3 border rounded"></textarea>
      <button type="submit" className="w-full bg-green-600 text-white py-3 rounded">
        Submit Request
      </button>
    </form>
  );
};

export default SoftwareServicesForm;