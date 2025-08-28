const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Osij Group</h1>
          <p className="text-xl mb-8">Your one-stop platform for premium services</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Explore Services
          </button>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service Cards will go here later */}
          <div className="p-6 border rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">IT Training</h3>
            <p>Learn cutting-edge technologies from experts</p>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Software Services</h3>
            <p>Custom software solutions for your business</p>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Graphic Design</h3>
            <p>Professional design services for your brand</p>
          </div>
          <div className="p-6 border rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Cosmetology</h3>
            <p>Beauty and wellness services by experts</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;