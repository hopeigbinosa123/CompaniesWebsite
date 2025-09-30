
import React, { useEffect, useState } from "react";
import { cosmetologyAPIEndpoints } from "../../api/cosmetology";
import ServiceCard from "../../components/ServiceCard";
import { useNavigate } from "react-router-dom";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cosmetologyAPIEndpoints.getServices()
      .then(data => setServices(data))
      .catch(err => console.error("Error fetching services:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map(s => (
          <ServiceCard
            key={s.id}
            name={s.name}
            bio={s.description}
            specialties={`Price: $${s.price}`}
            onSelect={() => navigate(`/cosmetology/services/${s.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
