import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GraphicDesignPage() {
  const [designers, setDesigners] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/graphic-design/designers/")
      .then(res => setDesigners(res.data))
      .catch(err => console.error("Error fetching designers:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">Graphic Design Services</h1>
      <p className="mt-4 text-gray-600">This page showcases our design offerings and lets users request custom work.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designers.map(designer => (
          <div key={designer.id} className="border p-4 rounded shadow">
            <img src={designer.image} alt={designer.name} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 text-xl font-semibold text-gray-800">{designer.name}</h2>
            <p className="text-sm text-purple-600">{designer.speciality}</p>
            <p className="mt-2 text-gray-600">{designer.bio}</p>
            <a href={designer.portfolio_url} className="mt-2 inline-block text-blue-500 hover:underline">View Portfolio</a>
          </div>
        ))}
      </div>
    </div>
  );
}
