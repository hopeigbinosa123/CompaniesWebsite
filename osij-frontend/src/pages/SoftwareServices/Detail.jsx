import React, { useEffect, useState } from "react";
import { getSoftwareService } from "../../api/softwareServices";
import { useParams, useNavigate } from "react-router-dom";

export default function SoftwareServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSoftwareService(id)
      .then(res => setService(res.data))
      .catch(err => console.error("Error fetching software service:", err));
  }, [id]);

  if (!service) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{service.title}</h1>
      <p className="text-gray-600">{service.category}</p>
      <p className="mt-4">{service.description}</p>
      <button
        onClick={() => navigate(`/software-services/${id}/request`)}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Request Service
      </button>
    </div>
  );
}
