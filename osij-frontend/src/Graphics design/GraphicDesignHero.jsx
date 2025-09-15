import React from 'react';
import DesignersList from './DesignerList';

const GraphicDesignHero = () => {
  return (
    <>
      <section className="w-full h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Welcome to Osij Studio 🎨
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300">
          Your creative journey starts here. Learn visual storytelling, build real-world design projects, and showcase your portfolio in a space that feels alive.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="#design-request"
            className="bg-white text-black font-semibold py-3 px-6 rounded hover:bg-gray-200 transition"
          >
            Submit a Design
          </a>
          <a
            href="#dashboard"
            className="border border-white text-white font-semibold py-3 px-6 rounded hover:bg-white hover:text-black transition"
          >
            View Dashboard
          </a>
        </div>
      </section>

      {/* 👇 Add DesignersList below the hero */}
      <DesignersList />
    </>
  );
};

export default GraphicDesignHero;


