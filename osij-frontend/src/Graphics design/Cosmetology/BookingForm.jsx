<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/axiosConfig';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    notes: '',
    service: '',
    stylist: '',
    appointment_date: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [stylistRes, serviceRes] = await Promise.all([
          api.get('/cosmetology/stylists/'),
          api.get('/cosmetology/services/'),
        ]);
        setStylists(Array.isArray(stylistRes.data) ? stylistRes.data : []);
        setServices(Array.isArray(serviceRes.data) ? serviceRes.data : []);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load services or stylists');
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { notes, service, stylist, appointment_date } = formData;

    if (!notes || !service || !stylist || !appointment_date) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/cosmetology/bookings/', formData);
      toast.success('Booking successful!');
      console.log('Booking response:', response.data);
      setFormData({
        notes: '',
        service: '',
        stylist: '',
        appointment_date: '',
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
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Book an Appointment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-md mx-auto bg-white p-6 rounded-lg shadow"
      >
        {/* Name Field */}
=======
// TODO: Connect this form to backend POST endpoint
// Fields: name, service, stylist, time slot

export default function BookingForm() {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Book an Appointment</h2>
      <form className="space-y-5 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
>>>>>>> 85c791e3ee0afe40bdf0c04b1c9583601f3a28dd
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            id="notes"
            type="text"
            placeholder="e.g. Prince M."
            className="w-full p-2 border rounded mt-1"
<<<<<<< HEAD
            value={formData.notes}
            onChange={handleChange}
            required
=======
>>>>>>> 85c791e3ee0afe40bdf0c04b1c9583601f3a28dd
          />
        </div>

        {/* Service Dropdown */}
        <div>
<<<<<<< HEAD
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Select Service
          </label>
          <select
            id="service"
            className="w-full p-2 border rounded mt-1"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name || 'Unnamed Service'}
              </option>
            ))}
=======
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service</label>
          <select id="service" className="w-full p-2 border rounded mt-1">
            <option>Choose a service</option>
            <option>Hair Styling and Coloring Workshops</option>
            <option>Bridal Makeup Training</option>
            <option>Skin Care & Coloring Workshops</option>
            <option>Makeup</option>
>>>>>>> 85c791e3ee0afe40bdf0c04b1c9583601f3a28dd
          </select>
        </div>

        {/* Stylist Dropdown */}
        <div>
<<<<<<< HEAD
          <label htmlFor="stylist" className="block text-sm font-medium text-gray-700">
            Select Stylist
          </label>
          <select
            id="stylist"
            className="w-full p-2 border rounded mt-1"
            value={formData.stylist}
            onChange={handleChange}
            required
          >
            <option value="">Choose a stylist</option>
            {stylists.length > 0 ? (
              stylists.map((stylist, index) => {
                if (!stylist || typeof stylist !== 'object') return null;

                const id = stylist.id ?? `fallback-${index}`;
                const username =
                  typeof stylist.username === 'string' ? stylist.username.trim() : 'Unnamed';
                const specialization =
                  typeof stylist.specialization === 'string'
                    ? stylist.specialization
                    : 'No specialization';

                return (
                  <option key={id} value={stylist.id ?? ''}>
                    {username} ({specialization})
                  </option>
                );
              })
            ) : (
              <option disabled>No stylists available</option>
            )}
=======
          <label htmlFor="stylist" className="block text-sm font-medium text-gray-700">Select Stylist</label>
          <select id="stylist" className="w-full p-2 border rounded mt-1">
            <option>Choose a stylist</option>
            <option>Zanele M.</option>
            <option>Thabo K.</option>
            <option>Nonhle Msimango</option>
>>>>>>> 85c791e3ee0afe40bdf0c04b1c9583601f3a28dd
          </select>
        </div>

        {/* Time Slot Dropdown */}
        <div>
<<<<<<< HEAD
          <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700">
            Select Time Slot
          </label>
          <select
            id="appointment_date"
            className="w-full p-2 border rounded mt-1"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          >
            <option value="">Choose a time</option>
            <option value="2025-09-15T10:00:00">Mon 10am–2pm</option>
            <option value="2025-09-17T13:00:00">Wed 1pm–5pm</option>
            <option value="2025-09-16T09:00:00">Tue 9am–12pm</option>
            <option value="2025-09-19T14:00:00">Fri 2pm–6pm</option>
=======
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Select Time Slot</label>
          <select id="time" className="w-full p-2 border rounded mt-1">
            <option>Choose a time</option>
            <option>Mon 10am–2pm</option>
            <option>Wed 1pm–5pm</option>
            <option>Tue 9am–12pm</option>
            <option>Fri 2pm–6pm</option>
>>>>>>> 85c791e3ee0afe40bdf0c04b1c9583601f3a28dd
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Book Now
        </button>
      </form>
    </section>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 85c791e3ee0afe40bdf0c04b1c9583601f3a28dd
