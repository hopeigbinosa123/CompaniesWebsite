const ServicesPage = () => {
  const services = [
    {
      title: "IT Training",
      description: "Comprehensive training programs in modern technologies",
      link: "/education"
    },
    {
      title: "Software Services",
      description: "Custom software development and IT solutions",
      link: "/software-services"
    },
    {
      title: "Graphic Design",
      description: "Creative design solutions for your business needs",
      link: "/graphic-design"
    },
    {
      title: "Cosmetology",
      description: "Professional beauty and wellness services",
      link: "/cosmetology"
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a 
                href={service.link}
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

