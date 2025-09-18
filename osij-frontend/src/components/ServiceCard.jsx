import React from "react";

export default function ServiceCard({ name, bio, specialties, onSelect }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-bold">{name}</h3>
      {specialties && <p className="text-sm text-gray-600">{specialties}</p>}
      {bio && <p className="mt-2 text-gray-700">{bio}</p>}
      <button
        onClick={onSelect}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </button>
    </div>
  );
}
