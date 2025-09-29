import React from 'react';
import { Link } from 'react-router-dom';

export default function CosmetologyPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-pink-700">Cosmetology Services</h1>
      <p className="mt-4 text-gray-600">
        This page will highlight our beauty and wellness services, including booking options.
      </p>

      <Link
        to="/cosmetology/book"
        className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
      >
        Book Now
      </Link>
    </div>
  );
}
