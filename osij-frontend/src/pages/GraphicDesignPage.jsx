import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

export default function GraphicDesignPage() {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState("");
  const designerRef = useRef(null); // ✅ Scroll target

  useEffect(() => {
    api.get('/graphic-design/public/designers/')
      .then(res => {
        console.log('Fetched designers:', res.data);
        setDesigners(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch designers:', err);
        setLoading(false);
      });
  }, []);

  const filteredDesigners = selectedService
    ? designers.filter(d => d.is_active && d.speciality === selectedService)
    : designers.filter(d => d.is_active);

  return (
    <div className="p-6 space-y-8">
      {/* 🔥 Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">Welcome to Osij Studio</h1>
        <p className="text-lg">
          Empowering students and creators through design, code, and collaboration. Choose your path, build your vision, and let your ideas shine.
        </p>
      </div>

      {/* 🎯 Filter Dropdown */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">Filter by Service Type:</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="border p-2 rounded w-full max-w-sm"
        >
          <option value="">All Services</option>
          <option value="LOGO">Logo Design</option>
          <option value="WEB_DESIGN">Web Design</option>
          <option value="THUMBNAIL">Thumbnail Design</option>
          <option value="BANNER">Banner Design</option>
        </select>
      </div>

      {/* 🧑‍🎨 Designer Cards */}
      {loading ? (
        <p>Loading designers...</p>
      ) : (
        <div ref={designerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDesigners.map(designer => (
            <div key={designer.id} className="border p-4 rounded shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold">{designer.name}</h2>
              <p className="text-gray-600">{designer.speciality}</p>
              <Link
                to={`/graphic-design/order/${designer.id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Order from {designer.name}
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* 💬 Testimonial Block */}
      <div className="bg-gray-100 p-4 rounded shadow">
        <p className="italic text-gray-700">
          “Osij helped me turn my ideas into real projects. The modules are easy to follow, and the designers are amazing!”
        </p>
        <span className="block mt-2 text-sm text-gray-500">— Thando M., Student Creator</span>
      </div>

      {/* 📣 Call to Action Footer */}
      <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to start your journey?</h2>
        <p className="mb-4">Choose a service, submit your brief, and let our team bring your vision to life.</p>
        <button
          onClick={() => designerRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-blue-600 px-6 py-2 rounded font-semibold"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
