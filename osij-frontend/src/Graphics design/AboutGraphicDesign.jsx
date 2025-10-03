import React from 'react';

export default function AboutGraphicDesign() {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-osijPurple tracking-tight mb-4">
          🎨 About Our Design Module
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          The Osij Graphic Design module introduces learners to visual storytelling, layout principles, and digital creativity. We focus on real-world projects that build confidence and skill.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <h3 className="text-xl font-semibold text-osijPurple mb-2">Mission</h3>
          <p className="text-gray-600">
            Make design education accessible, practical, and emotionally engaging.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-osijPurple mb-2">Vision</h3>
          <p className="text-gray-600">
            Empower creativity as a tool for growth and expression.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-osijPurple mb-2">Core Values</h3>
          <ul className="list-disc ml-5 text-gray-600">
            <li>Empathy in design</li>
            <li>Clarity over complexity</li>
            <li>Real-world relevance</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-osijPurple mb-2">Team & Achievements</h3>
          <p className="text-gray-600">
            Meet our mentors and explore milestones that shaped Osij Studio.
          </p>
        </div>
      </div>
    </section>
  );
}
