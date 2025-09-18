import { useState, useEffect } from 'react';
import { cosmetologyAPIEndpoints, cosmetologyFormHelpers } from '../../api/cosmetology';

const CosmetologyBookingForm = () => {
  const [formData, setFormData] = useState({
    service: '',
    stylist: '',
    appointment_date: '',
    notes: ''
  });
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [issuccess, setIsSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [servicesResponse, stylistsResponse] = await Promise.all([
          cosmetologyAPIEndpoints.getServices(),
          cosmetologyAPIEndpoints.getStylists()
        ]);
        setServices(servicesResponse);
        setStylists(stylistsResponse);
      } catch (err) {
        setError('Something went wrong. unable to load services and stylists');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = cosmetologyFormHelpers.validateAppointmentForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await cosmetologyAPIEndpoints.createAppointment(formData);
      console.log('an Appointment was created:', response);
      setIsSuccess(true);
      // Reset form
      setFormData({
        service: '',
        stylist: '',
        appointment_date: '',
        notes: ''
      });
      setValidationErrors({});
    } catch (err) {
      setError('Something went wrong. unable to create appointment. Please check your connection.');
      console.error('Error creating appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {issuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Appointment booked successfully! We'll contact you soon to confirm.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Service *
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded ${validationErrors.service ? 'border-red-500' : ''}`}
        >
          <option value="">Select a service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} - ${service.price} ({cosmetologyFormHelpers.formatDuration(service.duration)})
            </option>
          ))}
        </select>
        {validationErrors.service && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.service}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Stylist *
        </label>
        <select
          name="stylist"
          value={formData.stylist}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded ${validationErrors.stylist ? 'border-red-500' : ''}`}
        >
          <option value="">Select a stylist</option>
          {stylists.map(stylist => (
            <option key={stylist.id} value={stylist.id}>
              {stylist.name} - {stylist.specialization}
            </option>
          ))}
        </select>
        {validationErrors.stylist && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.stylist}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Date & Time *
        </label>
        <input
          type="datetime-local"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded ${validationErrors.appointment_date ? 'border-red-500' : ''}`}
          min={new Date().toISOString().slice(0, 16)}
        />
        {validationErrors.appointment_date && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.appointment_date}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Any special requests or information..."
          className="w-full p-3 border rounded h-24 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={issubmitting}
        className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {issubmitting ? 'Booking Appointment...' : 'Book Appointment'}
      </button>
    </form>
  );
};

export default CosmetologyBookingForm;