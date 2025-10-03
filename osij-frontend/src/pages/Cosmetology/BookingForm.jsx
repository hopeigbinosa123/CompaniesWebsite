import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cosmetologyAPIEndpoints } from "../../api/cosmetology";
import ServiceForm from "../../components/ServiceForm";

export default function CosmetologyBookingForm() {
  const { id: stylistIdFromUrl } = useParams();
  const Navigate= useNavigate();
  const [stylists, setStylists] = useState([]);
  const [services, setServices] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(stylistIdFromUrl || '');
  const [availability, setAvailability] = useState({ available: true, message: '' });
  const [formData, setFormData] = useState({
    service: '',
    notes: '',
    appointment_date: '',
  });

  // Check if user is authenticated
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const data = await cosmetologyAPIEndpoints.getStylists();
        setStylists(data);
        console.log("Fetched stylists:", data);
      } catch (err) {
        console.error("Error fetching stylists:", err);
        setError(err.message || "Error fetching stylists. Please try again.");
      }
    };

    const fetchServices = async () => {
      try {
        const data = await cosmetologyAPIEndpoints.getServices();
        setServices(data);
        console.log("Fetched services:", data);
      } catch (err) {
        console.error("Error while fetching services:", err);
        setError(err.message || "Error fetching services. Please try again.");
      }
    };

    if (!stylistIdFromUrl) {
      fetchStylists();
    }
    fetchServices();
  }, [stylistIdFromUrl]);

  useEffect(() => {
    const checkAvailability = async () => {
      const stylistId = stylistIdFromUrl || selectedStylist;
      const { appointment_date } = formData;

      if (stylistId && appointment_date) {
        try {
          // Use default 60 minutes for availability check
          const response = await cosmetologyAPIEndpoints.checkAppointmentAvailability(
            stylistId,
            appointment_date,
            60 // Default duration
          );
          setAvailability(response);
        } catch (err) {
          console.error("Error checking availability:", err);
          setAvailability({ available: false, message: 'Error checking availability.' });
          setError(err.message || "Error checking availability. Please try again.");
        }
      } else {
        setAvailability({ available: true, message: '' });
      }
    };

    checkAvailability();
  }, [selectedStylist, formData.appointment_date, stylistIdFromUrl]);

  const fields = [
    {
      name: "service",
      type: "select",
      placeholder: "Select a service",
      options: services.map(a => ({ value: a.id, label: a.name })),
      required: true,
    },
    {
      name: "notes",
      type: "textarea",
      placeholder: "Notes (optional)",
      required: false,
    },
    {
      name: "appointment_date",
      type: "datetime-local",
      placeholder: "Appointment Date",
      required: true,
    },
  ];

  const handleSubmit = async (data) => {
    try {
      const stylistId = stylistIdFromUrl || selectedStylist;
      if (!stylistId) throw new Error("Please select a stylist.");
      if (!availability.available) throw new Error(availability.message || "Selected slot is unavailable.");

      // Debug: Check if token exists
      console.log("Token exists:", !!token);
      console.log("Token value:", token ? token.substring(0, 20) + "..." : "null");

      // Create payload with expected fields for AppointmentBooking model
      const payload = {
        service: data.service,
        stylist: stylistId,
        appointment_date: data.appointment_date,
        notes: data.notes || ''
      };
      
      console.log("Sending payload:", payload);
      console.log("Payload values:", {
        service: payload.service,
        stylist: payload.stylist,
        appointment_date: payload.appointment_date,
        notes: payload.notes
      });
      console.log("Payload types:", {
        service: typeof payload.service,
        stylist: typeof payload.stylist,
        appointment_date: typeof payload.appointment_date,
        notes: typeof payload.notes
      });
      console.log("Available services:", services);
      console.log("Selected service data:", services.find(s => s.id == data.service));
      
      // Use createBooking instead of createAppointment
      await cosmetologyAPIEndpoints.createBooking(payload);
      setSuccess(true);
       Navigate('/dashboard/design-orders');

      setError(null);
    } catch (err) {
      console.error("Booking failed:", err);
      console.error("Error response:", err.response);
      console.error("Error status:", err.response?.status);
      console.error("Error data:", err.response?.data);
      console.error("Client error:", err.response?.data?.client);
      console.error("Service error:", err.response?.data?.service);
      // Log detailed validation errors
      if (err.response?.data) {
        console.error("Detailed validation errors:");
        Object.keys(err.response.data).forEach(key => {
          console.error(`${key}:`, err.response.data[key]);
        });
      }
      
      setError(err.message || "Booking failed. Please try again.");
      setSuccess(false);
    }
  };
     
  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {!token ? (
        <>
          <h1 className="text-xl font-bold mb-4">Authentication Required</h1>
          <div className="mb-4 text-red-600 font-semibold">
            ⚠️ Please log in to book an appointment.
          </div>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Login
          </button>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Book Appointment</h1>
          
          {success && (
            <div className="mb-4 text-green-600 font-semibold">
              ✅ Appointment booked successfully!
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-600 font-semibold">
              ⚠️ {error}
            </div>
          )}

          {!stylistIdFromUrl && (
            <div className="mb-4">
              <label htmlFor="stylist" className="block text-sm font-medium text-gray-700">Select a Stylist</label>
              <select
                name="stylist"
                id="stylist"
                value={selectedStylist}
                onChange={(e) => setSelectedStylist(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">-- Choose a Stylist --</option>
                {stylists.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          )}

          {availability.message && (
            <div className={`mb-4 font-semibold ${availability.available ? 'text-green-600' : 'text-red-600'}`}>
              {availability.message}
            </div>
          )}

          <ServiceForm
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Book Now"
            initialState={formData}
            onFormChange={handleFormChange}
            submitDisabled={!availability.available}
          />
        </>
      )}
    </div>
  );
}
