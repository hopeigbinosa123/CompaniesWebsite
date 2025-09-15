import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createAppointment } from "../../api/cosmetology";
import ServiceForm from "../../components/ServiceForm";

export default function CosmetologyBookingForm() {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Defensive check for stylist ID
  const stylistId = id ?? null;

  useEffect(() => {
    if (!stylistId) {
      setError("Stylist ID is missing from the URL.");
    }
  }, [stylistId]);

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
      if (!stylistId) throw new Error("Stylist ID is missing from URL");
      const payload = { ...data, stylist: stylistId };
      await createAppointment(payload);
      setSuccess(true);
      setError(null);
    } catch (err) {
      console.error("Booking failed:", err);
      setError(err.message || "Booking failed. Please try again.");
      setSuccess(false);
    }
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

      {!error && (
        <ServiceForm
          fields={fields}
          onSubmit={handleSubmit}
          submitLabel="Book Now"
        />
      )}
    </div>
  );
}
