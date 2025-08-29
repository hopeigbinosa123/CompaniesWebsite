import React, { useState } from 'react';
import OsijButton from './OsijButton';

export default function PortfolioGallery() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [rating, setRating] = useState(0);

  const designs = [
    {
      id: 1,
      title: 'Modern Logo',
      image: '/images/modern-logo.jpg',
      description: 'A sleek, minimalist logo for a tech brand.',
      tags: ['Logo', 'Minimalist', 'Tech'],
    },
    {
      id: 2,
      title: 'Creative Flyer',
      image: '/images/creative-flyer.jpg',
      description: 'Vibrant flyer for a creative workshop.',
      tags: ['Flyer', 'Colorful', 'Workshop'],
    },
  ];

  const openModal = (design) => {
    setSelectedDesign(design);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDesign(null);
    setFeedback('');
    setSubmittedFeedback(false);
    setRating(0);
  };

  const handleFeedbackSubmit = () => {
    console.log(`Feedback for ${selectedDesign.title}:`, feedback);
    console.log(`Rating: ${rating} star(s)`);
    setSubmittedFeedback(true);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Design Portfolio</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {designs.map((design) => (
          <div
            key={design.id}
            className="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="overflow-hidden rounded-md">
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-800 text-center">{design.title}</h3>
            <p className="text-sm text-gray-600 mt-2 text-center">{design.description}</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {design.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 text-center">
              <OsijButton label="View Details" onClick={() => openModal(design)} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedDesign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-2">{selectedDesign.title}</h3>
            <img
              src={selectedDesign.image}
              alt={selectedDesign.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-gray-700 mb-4">{selectedDesign.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedDesign.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Download Button */}
            <a
              href={selectedDesign.image}
              download
              className="block text-center mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Download Design
            </a>

            {/* Star Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate this design</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-500 transition`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Form */}
            {!submittedFeedback ? (
              <div className="mb-4">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="3"
                  placeholder="What did you think of this design?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
                <button
                  onClick={handleFeedbackSubmit}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Submit Feedback
                </button>
              </div>
            ) : (
              <div className="text-green-700 text-sm font-medium mb-4">
                ✅ Thanks for your feedback!
              </div>
            )}

            <OsijButton label="Close" variant="danger" onClick={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
}

