// TODO: Connect this form to backend POST endpoint
// Fields: name, service, stylist, time slot

export default function BookingForm() {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Book an Appointment</h2>
      <form className="space-y-5 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Prince M."
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service</label>
          <select id="service" className="w-full p-2 border rounded mt-1">
            <option>Choose a service</option>
            <option>Hair Styling and Coloring Workshops</option>
            <option>Bridal Makeup Training</option>
            <option>Skin Care & Coloring Workshops</option>
            <option>Makeup</option>
          </select>
        </div>

        <div>
          <label htmlFor="stylist" className="block text-sm font-medium text-gray-700">Select Stylist</label>
          <select id="stylist" className="w-full p-2 border rounded mt-1">
            <option>Choose a stylist</option>
            <option>Zanele M.</option>
            <option>Thabo K.</option>
            <option>Nonhle Msimango</option>
          </select>
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Select Time Slot</label>
          <select id="time" className="w-full p-2 border rounded mt-1">
            <option>Choose a time</option>
            <option>Mon 10am–2pm</option>
            <option>Wed 1pm–5pm</option>
            <option>Tue 9am–12pm</option>
            <option>Fri 2pm–6pm</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Book Now
        </button>
      </form>
    </section>
  );
}
