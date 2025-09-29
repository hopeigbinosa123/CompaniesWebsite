import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { graphicDesignAPI } from '../api/graphicDesign';
import ServiceForm from '../components/ServiceForm';

export default function GraphicDesignOrderForm() {
  const { id } = useParams();
  const [designer, setDesigner] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fields = [
    { name: "title", type: "text", placeholder: "Order Title", required: true },
    { name: "brief", type: "textarea", placeholder: "Project Brief", required: true },
    { name: "budget", type: "number", placeholder: "Budget (optional)", required: false }
  ];

  useEffect(() => {
    const fetchDesigner = async () => {
      try {
        const data = await graphicDesignAPI.getDesigner(id);
        setDesigner(data);
      } catch (error) {
        console.error("Error fetching designer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigner();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await graphicDesignAPI.createDesignOrder({ ...data, designer: id });
      setSubmitted(true);
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {loading ? (
        <p className="text-gray-500">Loading designer info...</p>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">
            Place Design Order for <span className="text-blue-600">{designer?.name || "Designer"}</span>
          </h1>

          {submitted ? (
            <div className="bg-green-100 text-green-800 p-4 rounded shadow">
              ✅ Your order has been submitted successfully! We’ll notify {designer?.name} and follow up soon.
            </div>
          ) : (
            <ServiceForm fields={fields} onSubmit={handleSubmit} submitLabel="Submit Order" />
          )}
        </>
      )}
    </div>
  );
}
