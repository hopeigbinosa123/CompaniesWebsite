import React from 'react';

export default function OsijButton({ label, onClick, variant = 'primary' }) {
  const baseStyles = `
    px-4 py-2 rounded font-semibold transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    hover:scale-[1.02] active:scale-[0.98]
  `;

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary}`}
    >
      {label}
    </button>
  );
}


