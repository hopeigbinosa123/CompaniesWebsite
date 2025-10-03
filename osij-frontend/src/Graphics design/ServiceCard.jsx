export default function ServiceCard({ title, description, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition transform duration-300 cursor-pointer text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-purple-700">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
