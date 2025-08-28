const CourseCard = ({ course }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-semibold">${course.price}</span>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;