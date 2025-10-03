import React from 'react';

const services = [
  {
    title: "💼 Logo & Branding",
    description: "Craft unique brand identities with modern design.",
  },
  {
    title: "📰 Flyer & Poster Design",
    description: "Design eye-catching promotional materials.",
  },
  {
    title: "📸 Social Media Graphics",
    description: "Create scroll-stopping visuals for every platform.",
  },
  {
    title: "📱 UI Mockups",
    description: "Build sleek interfaces for web and mobile apps.",
  },
  {
    title: "🖨️ Print-Ready Layouts",
    description: "Prepare high-resolution designs for professional printing.",
  },
];

export default function GraphicDesignServices() {
  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-osijPurple tracking-tight mb-4">
          💼 Explore Our Design Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from a range of creative services tailored to your project needs — from logos to UI mockups.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-osijPurple/20 rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-osijPurple mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="#design-request"
          className="inline-block bg-osijPurple text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-osijPurple/90 transition"
        >
          Submit a Design Request
        </a>
      </div>
    </section>
  );
}
