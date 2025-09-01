import React from 'react';

export default function GraphicDesignCourses() {
  const courses = [
    { title: "Intro to Design Tools", level: "Beginner" },
    { title: "Typography & Layout", level: "Intermediate" },
    { title: "Brand Identity Projects", level: "Advanced" }
  ];

  return (
    <section className="bg-indigo-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Courses We Offer</h2>
      <div className="grid gap-6 max-w-3xl mx-auto">
        {courses.map((course, index) => (
          <div key={index} className="bg-white p-6 rounded shadow text-left">
            <h3 className="text-xl font-semibold text-indigo-600">{course.title}</h3>
            <p className="text-gray-600">Level: {course.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
