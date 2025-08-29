export default function CosmetologyHero() {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-6 tracking-tight drop-shadow">
        Welcome to Osij Cosmetology 💇‍♀️
      </h1>
      <p className="text-xl max-w-2xl mx-auto">
        Discover beauty services designed to uplift your confidence, celebrate your style, and connect you with expert stylists who care.
      </p>
      <div className="mt-8">
        <a
          href="#booking"
          className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-purple-100 transition"
        >
          Book Your Transformation
        </a>
      </div>
    </section>
  );
}
