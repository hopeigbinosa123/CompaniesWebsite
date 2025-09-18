import React, { useEffect, useState } from "react";
import { getStylists } from "../../api/cosmetology";
import ServiceCard from "../../components/ServiceCard";
import { useNavigate } from "react-router-dom";

export default function CosmetologyList() {
  const [stylists, setStylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStylists()
      .then(res => setStylists(res.data))
      .catch(err => console.error("Error fetching stylists:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cosmetology Stylists</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stylists.map(s => (
          <ServiceCard
            key={s.id}
            name={s.name}
            bio={s.bio}
            specialties={s.specialties}
            onSelect={() => navigate(`/cosmetology/${s.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
