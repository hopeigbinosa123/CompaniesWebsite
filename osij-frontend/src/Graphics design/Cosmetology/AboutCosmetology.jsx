import React from 'react';

export default function AboutCosmetology() {
  return (
    <section className="bg-pink-50 rounded-xl p-6 mt-10 shadow-md">
      <h2 className="text-2xl font-bold text-pink-700 mb-4">About Cosmetology</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        We combine theory with hands-on training in fully equipped beauty labs. Our instructors are experienced professionals who guide students every step of the way.
      </p>

      <h3 className="text-xl font-semibold text-pink-600 mb-2">Your Source for Beauty and Wellness Trends</h3>
      <p className="text-gray-700 mb-4">
        Dive into the world of cosmetology with our blog. From the latest makeup trends and skincare secrets to career tips for aspiring beauty professionals, we cover everything you need to stay inspired.
      </p>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>“The Ultimate Guide to Building a Professional Makeup Kit”</li>
        <li>“Top 5 Bridal Hair Trends for the Upcoming Wedding Season”</li>
        <li>“Understanding Skin Types: How to Recommend the Perfect Facial”</li>
      </ul>
      <button className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
        Discover More
      </button>

      <h3 className="text-xl font-semibold text-pink-600 mt-8 mb-2">Start Your Beauty Journey Today</h3>
      <p className="text-gray-700 mb-4">
        Questions about enrolment, course schedules, or certifications? Our friendly admissions team is here to help you take the first step toward a beautiful career.
      </p>
      <div className="mb-4 text-gray-700">
        <p><strong>Address:</strong> [Insert Address]</p>
        <p><strong>Phone:</strong> [Insert Phone]</p>
        <p><strong>Email:</strong> [Insert Email]</p>
      </div>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <textarea placeholder="Your Question" className="w-full p-2 border rounded h-24" />
        <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition">
          Ask a Question
        </button>
      </form>
    </section>
  );
}
