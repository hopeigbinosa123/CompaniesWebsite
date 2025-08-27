import React from 'react';

const CosmetologyPage = () => {
  const services = [
    { name: 'Hair Styling', description: 'Professional cuts and styling.' },
    { name: 'Nail Care', description: 'Manicures, pedicures, and nail art.' },
    { name: 'Skincare', description: 'Facials and treatments for all skin types.' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cosmetology Services</h2>
      <ul className="space-y-4">
        {services.map((service, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            <p className="text-gray-600">{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CosmetologyPage;