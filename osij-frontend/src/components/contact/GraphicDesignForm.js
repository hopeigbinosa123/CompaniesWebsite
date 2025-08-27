import { useState } from 'react';

const GraphicDesignForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    design_type: '',
    quantity: '',
    deadline: '',
    description: '',
    reference_files: null
  });

  const designTypes = ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Print Materials', 'Website Design', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Graphic design inquiry:', formData);
    // Add API call here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Your Name" className="p-3 border rounded" />
        <input type="email" placeholder="Email" className="p-3 border rounded" />
      </div>
      <select className="w-full p-3 border rounded">
        <option value="">Select Design Type</option>
        {designTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="number" placeholder="Quantity" className="p-3 border rounded" />
        <input type="date" placeholder="Deadline" className="p-3 border rounded" />
      </div>
      <textarea placeholder="Project Description & Requirements" rows="4" className="w-full p-3 border rounded"></textarea>
      <div>
        <label className="block text-sm font-medium mb-2">Reference Files (Optional)</label>
        <input type="file" className="w-full p-2 border rounded" />
      </div>
      <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded">
        Request Quote
      </button>
    </form>
  );
};

export default GraphicDesignForm;