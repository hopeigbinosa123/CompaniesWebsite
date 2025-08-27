import { useState } from 'react';

const GeneralContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('General inquiry submitted:', formData);
    // Add API call here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Your Name" className="w-full p-3 border rounded" />
      <input type="email" placeholder="Your Email" className="w-full p-3 border rounded" />
      <input type="text" placeholder="Subject" className="w-full p-3 border rounded" />
      <textarea placeholder="Your Message" rows="4" className="w-full p-3 border rounded"></textarea>
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded">
        Send Message
      </button>
    </form>
  );
};

export default GeneralContactForm;