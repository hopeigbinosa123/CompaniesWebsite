export default function StudentDashboard() {
  const modules = [
    { title: "Start Here", desc: "Intro to Visual Storytelling" },
    { title: "Practice", desc: "Design a Logo with Feedback" },
    { title: "Submit", desc: "Upload Your First Portfolio Piece" },
  ];

  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Your Learning Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
            <h3 className="text-xl font-bold text-indigo-600">{mod.title}</h3>
            <p className="text-gray-700 mt-2">{mod.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
