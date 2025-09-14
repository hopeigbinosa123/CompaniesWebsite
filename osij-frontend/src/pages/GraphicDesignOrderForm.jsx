import React from "react";
import { useParams } from "react-router-dom";
import { graphicDesignAPI } from '../api/graphicDesign';
import ServiceForm from '../components/ServiceForm';

export default function GraphicDesignOrderForm() {
  const { id } = useParams();

  const fields = [
    { name: "title", type: "text", placeholder: "Order Title", required: true },
    { name: "brief", type: "textarea", placeholder: "Project Brief", required: true },
    { name: "budget", type: "number", placeholder: "Budget (optional)", required: false }
  ];

  const handleSubmit = (data) => {
    return graphicDesignAPI.createDesignOrder({ ...data, designer: id });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Place Design Order</h1>
      <ServiceForm fields={fields} onSubmit={handleSubmit} submitLabel="Submit Order" />
    </div>
  );
}
