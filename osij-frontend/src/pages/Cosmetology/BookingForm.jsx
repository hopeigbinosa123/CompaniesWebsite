import React from "react";
import { useParams } from "react-router-dom";
import { createAppointment } from "../../api/cosmetology";
import ServiceForm from "../../components/ServiceForm";

export default function CosmetologyBookingForm() {
  const { id } = useParams();

  const fields = [
    { name: "service", type: "text", placeholder: "Service (e.g., Haircut, Manicure)", required: true },
    { name: "notes", type: "textarea", placeholder: "Notes (optional)", required: false },
    { name: "start_time", type: "datetime-local", placeholder: "Start Time", required: true },
    { name: "duration_minutes", type: "number", placeholder: "Duration (minutes)", required: true }
  ];

  const handleSubmit = (data) => {
    return createAppointment({ ...data, stylist: id });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Book Appointment</h1>
      <ServiceForm fields={fields} onSubmit={handleSubmit} submitLabel="Book Now" />
    </div>
  );
}