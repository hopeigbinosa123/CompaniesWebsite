import CosmetologyHero from './CosmetologyHero';
import BeautyServicesList from './BeautyServicesList';
import StylistList from './StylistList';
import BookingForm from './BookingForm';

export default function Cosmetology() {
  return (
    <main className="space-y-16 px-4 md:px-12 lg:px-24 py-10 bg-pink-50">
      {/* 🌟 Hero Section */}
      <section>
        <CosmetologyHero />
        <div className="mt-6">
          <img
            src="/images/OIP1.jpg"
            alt="Confident beauty professional welcoming clients"
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* 💇‍♀️ Services Section */}
      <section>
        <h2 className="text-3xl font-bold text-pink-700 mb-6">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <img
              src="/images/depositphotos.jpg"
              alt="Hair styling tools and techniques"
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          </div>
          <div>
            <img
              src="/images/The-Perfect-Make-up-Infographic-FloridaAcademy.jpg"
              alt="Makeup artistry infographic"
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          </div>
          <div>
            <img
              src="/images/Cosmetologist's-Hiome-Study.jpg"
              alt="Clean nail care station"
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          </div>
        </div>
        <BeautyServicesList />
      </section>

      {/* 🎨 Stylists Section */}
      <section>
        <h2 className="text-3xl font-bold text-pink-700 mb-6">Meet Our Stylists</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <img
              src="/images/OIP1.jpg"
              alt="Zanele M. — Expert in Afro-textured hair"
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          </div>
          <div>
            <img
              src="/images/OIP2.jpg"
              alt="Thabo K. — Certified makeup artist"
              className="w-full h-48 object-cover rounded-lg shadow"
            />
          </div>
        </div>
        <StylistList />
      </section>

      {/* 📅 Booking Section */}
      <section>
        <h2 className="text-3xl font-bold text-pink-700 mb-6">Book Your Transformation</h2>
        <BookingForm />
      </section>
    </main>
  );
}

