import React from 'react';

const tools = [
  {
    title: "📤 Submit Work",
    description: "Upload designs and receive feedback from mentors.",
  },
  {
    title: "📊 Track Progress",
    description: "Monitor your learning journey and completed modules.",
  },
  {
    title: "🗂️ View Submissions",
    description: "Access your past work and submitted projects.",
  },
];

export default function ServicesSection() {
  return (
    <div>
      <h2 className="text-4xl font-extrabold text-osijPink text-center mb-6 tracking-tight">
        🧠 Platform Features & Tools
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Discover the tools that support your creative journey — from progress tracking to interactive submissions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white border border-osijPink/20 rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-osijPink mb-2">{tool.title}</h3>
            <p className="text-gray-700">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
