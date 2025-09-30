
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cosmetologyAPIEndpoints } from "../../api/cosmetology";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    cosmetologyAPIEndpoints.getService(id)
      .then(data => setService(data))
      .catch(err => console.error("Error fetching service:", err));
  }, [id]);

  if (!service) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{service.name}</h1>
      <p className="text-gray-600">Price: ${service.price}</p>
      <p className="mt-4">{service.description}</p>
    </div>
  );
}
