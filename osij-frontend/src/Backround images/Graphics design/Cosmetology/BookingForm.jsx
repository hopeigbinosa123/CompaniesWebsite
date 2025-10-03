import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    stylist: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.service || !formData.stylist || !formData.time) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/cosmetology/bookings/', {
        customer_name: formData.name,
        service: formData.service,
        stylist: formData.stylist,
        time_slot: formData.time
      });

      toast.success('Booking successful!');
      console.log('Booking response:', response.data);
      
      // Reset form
      setFormData({
        name: '',
        service: '',
        stylist: '',
        time: ''
      });

    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Prince M."
            className="w-full p-2 border rounded mt-1"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service</label>
          <select 
            id="service" 
            className="w-full p-2 border rounded mt-1"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Choose a service</option>
            <option value="Hair Styling and Coloring Workshops">Hair Styling and Coloring Workshops</option>
            <option value="Bridal Makeup Training">Bridal Makeup Training</option>
            <option value="Skin Care & Coloring Workshops">Skin Care & Coloring Workshops</option>
            <option value="Makeup">Makeup</option>
          </select>
        </div>

        <div>
          <label htmlFor="stylist" className="block text-sm font-medium text-gray-700">Select Stylist</label>
          <select 
            id="stylist" 
            className="w-full p-2 border rounded mt-1"
            value={formData.stylist}
            onChange={handleChange}
            required
          >
            <option value="">Choose a stylist</option>
            <option value="Zanele M.">Zanele M.</option>
            <option value="Thabo K.">Thabo K.</option>
            <option value="Nonhle Msimango">Nonhle Msimango</option>
          </select>
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Select Time Slot</label>
          <select 
            id="time" 
            className="w-full p-2 border rounded mt-1"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Choose a time</option>
            <option value="Mon 10am–2pm">Mon 10am–2pm</option>
            <option value="Wed 1pm–5pm">Wed 1pm–5pm</option>
            <option value="Tue 9am–12pm">Tue 9am–12pm</option>
            <option value="Fri 2pm–6pm">Fri 2pm–6pm</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </section>
  );
}