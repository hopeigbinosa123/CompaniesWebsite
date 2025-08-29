import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DesignersList = () => {
  const [designers, setDesigners] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/designers/')
      .then(response => setDesigners(response.data))
      .catch(error => console.error('Error fetching designers:', error));
  }, []);

  return (
    <section className="py-10 px-6 bg-gradient-to-b from-blue-900 to-black text-white">
      <h2 className="text-3xl font-bold mb-6">Meet Our Designers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designers.map(designer => (
          <div key={designer.id} className="bg-white text-black rounded-lg shadow-lg p-4">
            <img src={designer.image} alt={designer.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{designer.name}</h3>
            <p className="text-sm text-gray-600">{designer.speciality}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DesignersList;
