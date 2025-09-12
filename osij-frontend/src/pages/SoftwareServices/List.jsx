import React, { useEffect, useState } from "react";
import { getSoftwareServices } from "../../api/softwareServices";
import ServiceCard from "../../components/ServiceCard";
import { useNavigate } from "react-router-dom";

export default function SoftwareServicesList() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSoftwareServices()
      .then(res => setServices(res.data))
      .catch(err => console.error("Error fetching software services:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Software Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map(s => (
          <ServiceCard
            key={s.id}
            name={s.title}
            bio={s.description}
            specialties={s.category}
            onSelect={() => navigate(`/software-services/${s.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
