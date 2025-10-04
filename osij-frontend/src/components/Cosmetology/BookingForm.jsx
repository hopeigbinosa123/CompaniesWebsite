import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: '',
    stylist: '',
    appointment_date: '',
    notes: ''
  });

  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch services and stylists when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const servicesRes = await axios.get('/api/cosmetology/services/');
        setServices(servicesRes.data);
        
        // Fetch stylists
        const stylistsRes = await axios.get('/api/cosmetology/stylists/');
        setStylists(stylistsRes.data);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    
    try {
      const bookingData = {
        service: Number(formData.service),
        stylist: Number(formData.stylist),
        appointment_date: new Date(formData.appointment_date).toISOString(),
        notes: formData.notes || ''
      };
  
      console.log('Sending booking data:', bookingData);
  
      const response = await axios.post('/api/cosmetology/bookings/', bookingData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      console.log('Booking response:', response.data);
      navigate('/booking-success');
    } catch (err) {
      console.error('Booking error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.detail || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="service">
            Service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} (${service.price})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="stylist">
            Stylist
          </label>
          <select
            id="stylist"
            name="stylist"
            value={formData.stylist}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a stylist</option>
            {stylists.map(stylist => (
              <option key={stylist.id} value={stylist.id}>
                {stylist.name} - {stylist.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="appointment_date">
            Date & Time
          </label>
          <input
            type="datetime-local"
            id="appointment_date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="notes">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Any specific requests or information for the stylist?"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </section>
  );
};

export default BookingForm;