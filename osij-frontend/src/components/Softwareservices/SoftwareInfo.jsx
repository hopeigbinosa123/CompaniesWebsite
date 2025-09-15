import React, { useState } from 'react';

/**
 * Softwareinfo Component
 * Displays a list of software services, details, FAQ, and contact info.
 */
function Softwareinfo() {
  // State to track which service's details are expanded
  const [activeService, setActiveService] = useState(null);

  // List of software services
  const services = [
    {
      id: 'custom-software',
      title: 'Custom Software Development',
      description: 'Building bespoke software solutions tailored to your unique business needs, from concept to deployment.',
      averageInfo: 'Average custom software projects can range from 3 to 12 months, with costs varying based on complexity, features, and team size. Common technologies include React, Node.js, Python, and various cloud platforms.',
      benefits: [
        'Tailored to specific requirements',
        'Scalability and flexibility',
        'Competitive advantage',
        'Improved efficiency',
      ],
      imageDesc: 'An image depicting a team collaborating on a software project, with code snippets and a blueprint overlay.',
      animationDesc: 'An animation showing a journey from an idea (lightbulb) to a finished product (app icon) with gears turning in between.',
      icon: '💡',
    },
    {
      id: 'web-development',
      title: 'Web Application Development',
      description: 'Creating robust, scalable, and user-friendly web applications for various industries and purposes.',
      averageInfo: 'Typical web development projects take 2-6 months for a standard business website or web app, with more complex platforms taking longer. Costs depend on features like e-commerce, user authentication, and third-party integrations.',
      benefits: [
        'Enhanced online presence',
        'Improved user engagement',
        'Accessibility across devices',
        'Scalable infrastructure',
      ],
      imageDesc: 'An image of a responsive website design across different devices (desktop, tablet, mobile), showcasing a clean UI.',
      animationDesc: 'An animation of a browser window loading a beautifully designed web page, with elements fading in smoothly.',
      icon: '🌐',
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'Designing and developing intuitive and high-performing mobile applications for iOS and Android platforms.',
      averageInfo: 'Mobile app development often takes 4-9 months for a basic app, and significantly longer for apps with complex features like real-time data, offline capabilities, or intricate UI/UX. Costs are influenced by platform (native vs. cross-platform) and feature set.',
      benefits: [
        'Reach a wider audience',
        'Direct customer engagement',
        'New revenue streams',
        'Brand visibility',
      ],
      imageDesc: 'An image of hands holding smartphones displaying different mobile app interfaces, perhaps with a focus on UI/UX.',
      animationDesc: 'An animation showing a finger interacting with a mobile app, demonstrating smooth transitions and interactive elements.',
      icon: '📱',
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions & DevOps',
      description: 'Leveraging cloud platforms (AWS, Azure, GCP) to build scalable, secure, and efficient infrastructure, along with DevOps practices.',
      averageInfo: 'Cloud migration and DevOps implementation projects vary greatly. A basic setup might take 1-3 months, while complex migrations and advanced CI/CD pipelines can extend to 6-12+ months. Costs involve platform usage fees and expert consultation.',
      benefits: [
        'Scalability and reliability',
        'Cost efficiency',
        'Enhanced security',
        'Faster deployment cycles',
      ],
      imageDesc: 'An abstract image representing cloud computing, with interconnected servers and data flowing, perhaps with subtle blue and white hues.',
      animationDesc: 'An animation depicting data packets flowing seamlessly between different cloud icons, illustrating continuous integration and deployment.',
      icon: '☁️',
    },
  ];

  // List of FAQs
  const faqs = [
    {
      question: 'How do you ensure the quality of your software?',
      answer:
        'We follow rigorous development methodologies, including agile practices, extensive testing (unit, integration, end-to-end), code reviews, and continuous feedback loops to ensure high-quality deliverables.',
    },
    {
      question: 'What is your typical development process?',
      answer:
        "Our process generally includes discovery & planning, design & prototyping, development & testing, deployment, and ongoing support & maintenance. We adapt our process to best fit your project's unique requirements.",
    },
    {
      question: 'How much does software development cost?',
      answer:
        'Costs vary significantly based on project complexity, scope, desired features, and technologies involved. We provide detailed estimates after a thorough discovery phase, offering transparent pricing models (fixed-price or time & materials).',
    },
    {
      question: 'Do you provide post-launch support and maintenance?',
      answer:
        'Yes, we offer comprehensive post-launch support and maintenance packages, including bug fixes, updates, performance monitoring, and feature enhancements to ensure your software remains robust and up-to-date.',
    },
  ];

  // Toggle the expanded/collapsed state for a service
  const toggleServiceDetails = (serviceId) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans text-gray-800">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            Software Services
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#services"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300 font-medium"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300 font-medium"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300 font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 text-center bg-indigo-700 text-white overflow-hidden">
        {/* Decorative background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1517694712202-14dd9538add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          }}
        ></div>
        <div className="relative z-10 container mx-auto">
          <h2 className="text-5xl font-extrabold mb-4">
            Innovate. Develop. Transform.
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your trusted partner for cutting-edge software solutions that drive
            business growth.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 md:px-8 container mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-800">
          Our Core Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-500 ease-in-out hover:shadow-xl transform hover:-translate-y-2
                ${
                  activeService === service.id
                    ? 'ring-4 ring-indigo-500 scale-105'
                    : ''
                }`}
            >
              {/* Service Icon */}
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-5xl text-indigo-600">
                  {service.icon}
                </span>
              </div>
              {/* Service Title */}
              <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                {service.title}
              </h3>
              {/* Service Description */}
              <p className="text-gray-600 mb-4 flex-grow">
                {service.description}
              </p>
              {/* Toggle Details Button */}
              <button
                onClick={() => toggleServiceDetails(service.id)}
                className="bg-indigo-600 text-white py-2 px-5 rounded-full hover:bg-indigo-700 transition duration-300 shadow-md"
              >
                {activeService === service.id ? 'Show Less' : 'Learn More'}
              </button>
              {/* Collapsible Service Details */}
              {activeService === service.id && (
                <div className="mt-6 pt-6 border-t border-gray-200 text-left w-full">
                  <h4 className="text-xl font-semibold text-indigo-700 mb-3">
                    Key Details:
                  </h4>
                  <p className="text-gray-700 mb-4">{service.averageInfo}</p>
                  <h4 className="text-xl font-semibold text-indigo-700 mb-3">
                    Benefits:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                    {service.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Visual Representation:
                    </h5>
                    <p className="text-sm text-gray-600 italic">
                      {service.imageDesc}
                    </p>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Animation Idea:
                    </h5>
                    <p className="text-sm text-gray-600 italic">
                      {service.animationDesc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Development Philosophy Section */}
      <section className="py-16 bg-blue-50 px-4 md:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6">
          Our Development Philosophy
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-blue-700 mb-8">
          We believe in a collaborative and agile approach, ensuring
          transparency and flexibility throughout the project lifecycle. Our
          goal is to not just build software, but to forge lasting
          partnerships.
        </p>
        <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-6">
            <p className="text-white text-xl font-semibold">
              "Teamwork makes the dream work."
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 md:px-8 container mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-indigo-800">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="mb-4 bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <summary className="flex justify-between items-center py-4 px-6 cursor-pointer font-semibold text-lg text-indigo-700 bg-gray-50 hover:bg-gray-100 transition duration-300">
                {faq.question}
                <span className="text-indigo-500 group-open:rotate-180 transform transition-transform duration-300">
                  {/* Down arrow icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <p className="px-6 py-4 text-gray-700 leading-relaxed bg-white">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 md:px-8 bg-indigo-700 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold mb-6">Get in Touch</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to start your next software project? Contact us today for a
            free consultation!
          </p>
          <a
            href="mailto:info@example.com"
            className="bg-white text-indigo-700 py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            Email Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-gray-800 text-white text-center">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Software Services. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Softwareinfo;