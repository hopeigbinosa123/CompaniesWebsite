import React, { useEffect, useState } from "react";
import { cosmetologyAPIEndpoints } from "../../api/cosmetology";
import { useParams, useNavigate } from "react-router-dom";

export default function CosmetologyDetail() {
  const { id } = useParams();
  const [stylist, setStylist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cosmetologyAPIEndpoints.getStylist(id)
      .then(data => setStylist(data))
      .catch(err => console.error("Error fetching stylist:", err));
  }, [id]);

  if (!stylist) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{stylist.name}</h1>
      <p className="text-gray-600">{stylist.specialties}</p>
      <p className="mt-4">{stylist.bio}</p>
      <button
        onClick={() => navigate(`/cosmetology/${id}/book`)}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Book Appointment
      </button>
    </div>
  );
}