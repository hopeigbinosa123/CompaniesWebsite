const stylists = [
  {
    name: 'Zanele M.',
    specialty: 'Hair Styling & Braiding',
    bio: 'Zanele brings 8 years of experience in Afro-textured hair care and protective styling. Her braids are legendary.',
    availability: ['Mon 10am–2pm', 'Wed 1pm–5pm'],
  },
  {
    name: 'Thabo K.',
    specialty: 'Makeup & Skin Care',
    bio: 'Thabo is a certified makeup artist with a passion for natural looks and skin-positive routines.',
    availability: ['Tue 9am–12pm', 'Fri 2pm–6pm'],
  },
];

export default function StylistList() {
  return (
    <section className="py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Stylists</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {stylists.map((stylist, index) => (
          <div key={index} className="p-6 border rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-pink-600">{stylist.name}</h3>
            <p className="text-gray-700 italic">{stylist.specialty}</p>
            <p className="mt-2 text-sm text-gray-600">{stylist.bio}</p>
            <div className="mt-4">
              <h4 className="font-medium text-sm text-gray-800">Availability:</h4>
              <ul className="list-disc ml-5 text-sm text-gray-500">
                {stylist.availability.map((slot, i) => (
                  <li key={i}>{slot}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
