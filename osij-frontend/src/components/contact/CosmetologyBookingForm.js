import { useState } from 'react';

const CosmetologyBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    preferred_stylist: '',
    date: '',
    time: '',
    notes: ''
  });

  const services = ['Haircut', 'Coloring', 'Styling', 'Makeup', 'Skincare', 'Spa Treatment'];
  const stylists = ['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Wilson', 'Any Available'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment booking:', formData);
    // Add API call here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Your Name" className="p-3 border rounded" />
        <input type="email" placeholder="Email" className="p-3 border rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="tel" placeholder="Phone" className="p-3 border rounded" />
        <select className="p-3 border rounded">
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select className="p-3 border rounded">
          <option value="">Preferred Stylist</option>
          {stylists.map(stylist => (
            <option key={stylist} value={stylist}>{stylist}</option>
          ))}
        </select>
        <input type="date" className="p-3 border rounded" />
      </div>
      <select className="w-full p-3 border rounded">
        <option value="">Preferred Time</option>
        <option value="09:00">9:00 AM</option>
        <option value="10:00">10:00 AM</option>
        <option value="11:00">11:00 AM</option>
        <option value="13:00">1:00 PM</option>
        <option value="14:00">2:00 PM</option>
        <option value="15:00">3:00 PM</option>
        <option value="16:00">4:00 PM</option>
        <option value="17:00">5:00 PM</option>
      </select>
      <textarea placeholder="Special requests or notes" rows="3" className="w-full p-3 border rounded"></textarea>
      <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded">
        Book Appointment
      </button>
    </form>
  );
};

export default CosmetologyBookingForm;