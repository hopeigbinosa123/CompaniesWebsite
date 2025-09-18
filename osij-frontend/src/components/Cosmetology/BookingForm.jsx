import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';
import { useNavigate } from 'react-router-dom';

export default function BookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: '',
    stylist: '',
    appointment_date: '', // This will store the selected date and time
    notes: '',
  });
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, stylistsResponse] = await Promise.all([
          api.get('/cosmetology/services/'),
          api.get('/cosmetology/stylists/'),
        ]);
        setServices(servicesResponse.data);
        setStylists(stylistsResponse.data);

        // Set default values if data exists
        if (servicesResponse.data.length > 0) {
          setFormData((prevData) => ({ ...prevData, service: servicesResponse.data[0].id }));
        }
        if (stylistsResponse.data.length > 0) {
          setFormData((prevData) => ({ ...prevData, stylist: stylistsResponse.data[0].id }));
        }
      } catch (err) {
        setError('Something went wrong. Was unable to load services or stylists.');
        console.error('Error fetching data for booking form:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitSuccess(false);

    try {
      // Ensure appointment_date is in a format Django expects (e.g., ISO 8601)
      // For simplicity, assuming the input type="datetime-local" provides this format
      await api.post('/cosmetology/bookings/create/', formData);
      setSubmitSuccess(true);
      // Optionally, navigate to a success page or user's bookings page
      navigate('/bookings/me'); // Assuming this route exists for user's bookings
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to book appointment.');
      console.error('Appointment booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Book an Appointment</h2>
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-md mx-auto">
          Appointment booked successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        {/* Removed "Your Name" field as user is authenticated */}

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price} ({service.duration} min)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="stylist" className="block text-sm font-medium text-gray-700">Select Stylist</label>
          <select
            id="stylist"
            name="stylist"
            value={formData.stylist}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          >
            <option value="">Choose a stylist</option>
            {stylists.map((stylist) => (
              <option key={stylist.id} value={stylist.id}>
                {stylist.user.username} ({stylist.specialization})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700">Select Date and Time</label>
          <input
            id="appointment_date"
            name="appointment_date"
            type="datetime-local"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded mt-1"
            placeholder="Any specific requests or information for the stylist?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </section>
  );
}