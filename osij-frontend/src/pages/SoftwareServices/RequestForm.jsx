import React from "react";
import { useParams } from "react-router-dom";
import { createServiceRequest } from "../../api/softwareServices";
import ServiceForm from "../../components/ServiceForm";

export default function SoftwareServiceRequestForm() {
  const { id } = useParams();

  const fields = [
    { name: "requirements", type: "textarea", placeholder: "Describe your requirements", required: true },
    { name: "budget", type: "number", placeholder: "Budget (optional)", required: false }
  ];

  const handleSubmit = (data) => {
    return createServiceRequest({ ...data, service: id });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Request Software Service</h1>
      <ServiceForm fields={fields} onSubmit={handleSubmit} submitLabel="Submit Request" />
    </div>
  );
}