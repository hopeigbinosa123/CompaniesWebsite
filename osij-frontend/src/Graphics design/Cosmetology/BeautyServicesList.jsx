const services = [
  { name: 'Hair Styling', description: 'Cuts, colors, and treatments' },
  { name: 'Makeup', description: 'Event, bridal, and editorial looks' },
  { name: 'Nail Care', description: 'Manicures, pedicures, and nail art' },
];

export default function BeautyServicesList() {
  return (
    <section className="py-10 px-4 grid md:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service.name} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">{service.name}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </section>
  );
}
