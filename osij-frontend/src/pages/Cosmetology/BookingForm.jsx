
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cosmetologyAPIEndpoints } from "../../api/cosmetology";
import ServiceForm from "../../components/ServiceForm";

export default function CosmetologyBookingForm() {
  const { id: stylistIdFromUrl } = useParams();
  const [stylists, setStylists] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(stylistIdFromUrl || '');
  const [availability, setAvailability] = useState({ available: true, message: '' });
  const [formData, setFormData] = useState({
    service: '',
    notes: '',
    start_time: '',
    duration_minutes: '',
  });

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const data = await cosmetologyAPIEndpoints.getStylists();
        setStylists(data);
      } catch (err) {
        console.error("Error fetching stylists:", err);
      }
    };

    if (!stylistIdFromUrl) {
      fetchStylists();
    }
  }, [stylistIdFromUrl]);

  useEffect(() => {
    const checkAvailability = async () => {
      const stylistId = stylistIdFromUrl || selectedStylist;
      const { start_time, duration_minutes } = formData;

      if (stylistId && start_time && duration_minutes) {
        try {
          const response = await cosmetologyAPIEndpoints.checkAppointmentAvailability(
            stylistId,
            start_time,
            duration_minutes
          );
          setAvailability(response);
        } catch (err) {
          console.error("Error checking availability:", err);
          setAvailability({ available: false, message: 'Error checking availability.' });
        }
      } else {
        setAvailability({ available: true, message: '' });
      }
    };

    checkAvailability();
  }, [selectedStylist, formData.start_time, formData.duration_minutes, stylistIdFromUrl, formData]);

  const fields = [
    {
      name: "service",
      type: "text",
      placeholder: "Service (e.g., Haircut, Manicure)",
      required: true,
    },
    {
      name: "notes",
      type: "textarea",
      placeholder: "Notes (optional)",
      required: false,
    },
    {
      name: "start_time",
      type: "datetime-local",
      placeholder: "Start Time",
      required: true,
    },
    {
      name: "duration_minutes",
      type: "number",
      placeholder: "Duration (minutes)",
      required: true,
    },
  ];

  const handleSubmit = async (data) => {
    try {
      const stylistId = stylistIdFromUrl || selectedStylist;
      if (!stylistId) throw new Error("Please select a stylist.");
      if (!availability.available) throw new Error(availability.message || "Selected slot is unavailable.");

      const payload = { ...data, stylist: stylistId };
      await cosmetologyAPIEndpoints.createAppointment(payload);
      setSuccess(true);
      setError(null);
    } catch (err) {
      console.error("Booking failed:", err);
      setError(err.message || "Booking failed. Please try again.");
      setSuccess(false);
    }
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
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
    </div>
  );
}
