const AboutPage = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About Osij Group</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Osij Group is a comprehensive service platform dedicated to delivering excellence 
            across multiple domains. We bring together expertise in technology, design, and 
            wellness to provide our clients with exceptional service experiences.
          </p>
          <p className="text-lg mb-6">
            Our mission is to create a seamless platform where quality service meets 
            innovation and customer satisfaction is our top priority.
          </p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Expert professionals in every field</li>
              <li>Quality guaranteed services</li>
              <li>Customer-centric approach</li>
              <li>Innovative solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;