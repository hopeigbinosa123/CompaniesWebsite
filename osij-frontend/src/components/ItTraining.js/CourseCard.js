import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseCard = ({ course }) => {
  if (!course) return null;

  const {
    id,
    title,
    description,
    imageUrl,
    category,
    tags = [],
  } = course;

  return (
    <div className="course-card bg-white rounded shadow p-4 hover:shadow-lg transition">
      <img
        src={imageUrl || '/placeholder.jpg'}
        alt={title || 'Course image'}
        className="w-full h-40 object-cover rounded"
      />

      <h3 className="text-xl font-semibold mt-2">{title}</h3>

      <p className="text-gray-600 text-sm mt-1">
        {description || 'No description available.'}
      </p>

      {category && (
        <p className="text-xs text-gray-500 mt-1">Category: {category}</p>
      )}

      {Array.isArray(tags) && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/course/${id}`}
        className="text-blue-600 hover:underline mt-2 inline-block"
        aria-label={`View details for ${title}`}
      >
        View Course
      </Link>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default CourseCard;